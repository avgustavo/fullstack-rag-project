// src/services/search.service.ts
import { MongoClient, ObjectId } from "mongodb";
import { parseFilterLLM } from "../utils/parseFilterLLM";
import { embbedingModel, getEmbedding } from "../utils/getEmbeddings";
import { callLLM } from "../utils/callLLM";
import { llmModel } from "../types/allTypes";
import { searchLogResType } from "../controllers/llm/schema";

export class SearchService {
  constructor(private readonly mongoUri: string = `${process.env.ATLAS_CONNECTION_STRING}`) {}

  /**
   * Executa a busca baseada em embeddings (Vector Search) e gera uma resposta final via LLM.
   * Em seguida, registra o log no db syllabus, collection logs.
   *
   * @param question Pergunta do usuário
   * @returns Registro completo da busca e da resposta (SearchLog)
   */
  public async searchRAG(
    question: string,
    llm: llmModel,
    emb: embbedingModel,
  ): Promise<searchLogResType> {
    // 2) Conecta ao MongoDB
    const client = new MongoClient(this.mongoUri);
    await client.connect();
    const startTime = Date.now();

    // 1) Gera embedding da pergunta
    const questionEmbedding = await getEmbedding(question, emb, "search_query"); // Marca o início (para medir tempo)
    console.log(questionEmbedding.length);
    try {
      let flag = "";
      if (emb === "nomic-embed-text-v1.5") {
        flag = "2";
      }
      // 3) Executa Vector Search na coleção de ementas
      const db = client.db("syllabus");
      const collection = db.collection(`syllabi${flag}`);
      console.log(`syllabi${flag}` + "G");

      const pipeline = [
        {
          $vectorSearch: {
            index: "vector_index",
            queryVector: questionEmbedding,
            path: "embedding",
            exact: true,
            limit: 5,
            // numCandidates: 5,
          },
        },
        {
          $project: {
            _id: 0,
            courseName: 1,
            code: 1,
            semester: 1,
            document: 1,
          },
        },
      ];

      const cursor = collection.aggregate(pipeline);
      const retrievedDocs = [];
      for await (const doc of cursor) {
        retrievedDocs.push(doc);
      }

      console.log(retrievedDocs.length);

      // 4) Monta o prompt e chama o LLM para gerar a resposta
      //   const context = retrievedDocs.map(d => d.document.pageContent).join("\n");
      let context = "";
      retrievedDocs.forEach((doc) => {
        context += doc.document.pageContent;
      });

      console.log(context);
      const prompt = `
      Você é um sistema de análise de consultas para disciplinas de Engenharia de Computação.
      Use o seguinte contexto para responder à pergunta de forma breve. 
      Se não souber, diga que não sabe.

      CONTEXTO:
      ${context}

      PERGUNTA:
      ${question}
      
      RESPOSTA:
      `;

      const answer = await callLLM(prompt, llm);

      // Marca o final para cálculo de tempo
      const endTime = Date.now();
      const timeMs = endTime - startTime;

      // 5) Monta o objeto de log no formato desejado
      const logEntry: searchLogResType = {
        id: new ObjectId().toString(),
        question,
        mode: "search",
        embbedModel: emb,
        llmModel: llm,
        answer,
        retrievedDocs,
        timeMs: timeMs,
        createdAt: `${new Date()}`,
      };

      // 6) Insere o log na coleção "logs" do db "syllabus"
      const logsCollection = db.collection("logs");
      await logsCollection.insertOne(logEntry);

      return logEntry;
    } catch (error) {
      console.error("Erro ao realizar busca RAG:", error);
      throw error;
    } finally {
      await client.close();
    }
  }

  public async filterSearch(
    question: string,
    llm: llmModel,
    emb: embbedingModel,
  ): Promise<searchLogResType> {
    // 2. Conectar ao MongoDB
    const client = new MongoClient(this.mongoUri);
    await client.connect();
    const db = client.db("syllabus");

    const startTime = Date.now();
    // 1. Extrai metadados (courseName, universityCode, semester, etc.) com LLM
    const filterData = await parseFilterLLM(question, llm);

    try {
      // 4. Monta pipeline para filtrar (match) e depois (opcional) vectorSearch
      const pipeline: any[] = [];

      const universityCode = filterData.universityCode
        ? filterData.universityCode.map((word) =>
            word.replace(/[a-zA-Z]+/g, (match) => match.toUpperCase()),
          )
        : [];
      const courseName = filterData.courseName
        ? filterData.courseName.map((word) =>
            word
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
          )
        : [];
      const semester = filterData.semester ? filterData.semester : [];

      // Gera embedding pro questionForContent
      const searchStartTime = Date.now();
      const questionEmbedding = await getEmbedding(question, emb, "search_query");

      // Adiciona etapa de busca vetorial
      pipeline.push({
        $vectorSearch: {
          index: "vector_index",
          queryVector: questionEmbedding,
          path: "embedding",
          filter: {
            ...(filterData.universityCode && filterData.universityCode.length > 0
              ? { universityCode: { $in: universityCode } }
              : {}),
            ...(filterData.courseName && filterData.courseName.length > 0
              ? { courseName: { $in: courseName } }
              : {}),
            ...(filterData.semester && filterData.semester.length > 0
              ? { semester: { $in: semester } }
              : {}),
          },
          exact: true,
          limit: 5,
        },
      });

      // Projeta campos de interesse
      pipeline.push({
        $project: {
          _id: 0,
          courseName: 1,
          code: 1,
          semester: 1,
          fileUrl: 1,
          document: 1,
        },
      });

      const collectionName = emb === "nomic-embed-text-v1.5" ? "syllabi2" : "syllabi";
      const collection = db.collection(collectionName);

      const retrievedDocs = await collection.aggregate(pipeline).toArray();

      console.log(retrievedDocs.length);

      // 5. Monta resposta final, se desejar

      // Se há questionForContent, e encontramos docs, podemos consolidar com outro prompt
      let context = "";
      retrievedDocs.forEach((doc) => {
        context += doc.document.pageContent;
      });
      console.log(context);

      const prompt = `
      Você é um sistema de análise de consultas para disciplinas de Engenharia de Computação.
      Use o seguinte contexto para responder à pergunta de forma breve. 
      Se não souber, diga que não sabe.

      CONTEXTO:
      ${context}

      PERGUNTA:
      ${question}
      
      RESPOSTA:
      `;
      // Chamada do LLM no modo chat
      const answer = await callLLM(prompt, llm);

      // Marca o final para cálculo de tempo
      const searchEndTime = Date.now();
      const searchTime = searchEndTime - searchStartTime;

      const logEntry: searchLogResType = {
        id: new ObjectId().toString(), // ou crypto.randomUUID()
        question,
        mode: "searchFilter",
        embbedModel: emb, // Ajuste conforme sua lógica/variáveis
        llmModel: llm, // Ajuste conforme sua lógica/variáveis
        answer,
        retrievedDocs,
        timeMs: searchTime,
        totalTime: searchEndTime - startTime,
        createdAt: `${new Date()}`,
      };

      const logsCollection = db.collection("logs");
      await logsCollection.insertOne(logEntry);

      return logEntry;
    } catch (error) {
      console.error("Erro ao realizar busca RAG:", error);
      throw error;
    } finally {
      await client.close();
    }
  }
}
