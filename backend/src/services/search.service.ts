// src/services/search.service.ts
import { MongoClient } from "mongodb";
import { embbedingModel, getEmbedding } from "../utils/getEmbeddings";
import { callLLM } from "../utils/callLLM";
// Aqui podemos usar o ObjectId do MongoDB ou outra forma de gerar id
import { ObjectId } from "mongodb";

interface SearchLog {
  id: string;
  question: string;
  mode: string;            // "search"
  embbedModel: string;     // ex: "Mistral7B"
  llmModel: string;        // ex: "Groq"
  answer: string;
  retrievedDocs: any[];
  time_ms: number;
  createdAt: string;
}

export type llmModel = 'groq' | 'hf';

export class SearchService {
  constructor(
    private readonly mongoUri: string = `${process.env.ATLAS_CONNECTION_STRING}`
  ) {}

  /**
   * Executa a busca baseada em embeddings (Vector Search) e gera uma resposta final via LLM.
   * Em seguida, registra o log no db syllabus, collection logs.
   *
   * @param question Pergunta do usuário
   * @returns Registro completo da busca e da resposta (SearchLog)
   */
  public async searchRAG(question: string, llm: llmModel, emb: embbedingModel): Promise<SearchLog> {

    // 2) Conecta ao MongoDB
    const client = new MongoClient(this.mongoUri);
    await client.connect();
    const startTime = Date.now();

    // 1) Gera embedding da pergunta
    const questionEmbedding = await getEmbedding(question,emb);    // Marca o início (para medir tempo)
    console.log(questionEmbedding.length)
    try {
        
        let flag = "";
        if (emb === "nomic-embed-text-v1.5") {
            flag = "2";
        }
      // 3) Executa Vector Search na coleção de ementas
      const db = client.db("syllabus");
      const collection = db.collection(`syllabi${flag}`);
      console.log(`syllabi${flag}`+'G');


      const pipeline = [
        {
          $vectorSearch: {
            index: "vector_index",       
            queryVector: questionEmbedding,
            path: "embedding",           
            exact: true,
            limit: 5,
            // numCandidates: 5,
          }
        },
        {
          $project: {
            _id: 0,
            courseName: 1,
            code: 1,
            semester: 1,
            document: 1 
          }
        }
      ];

      const cursor = collection.aggregate(pipeline);
      const retrievedDocs = [];
      for await (const doc of cursor) {
        retrievedDocs.push(doc);
      }

      console.log(retrievedDocs.length)

      // 4) Monta o prompt e chama o LLM para gerar a resposta
    //   const context = retrievedDocs.map(d => d.document.pageContent).join("\n");
      let context = "";
      retrievedDocs.forEach(doc => {
            context += doc.document.pageContent;
        });
    
      console.log(context);
      const prompt = `
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
      const logEntry: SearchLog = {
        id: new ObjectId().toString(),   // ou crypto.randomUUID()
        question,
        mode: "search",
        embbedModel: emb,       // Ajuste conforme sua lógica/variáveis
        llmModel: llm,               // Ajuste conforme sua lógica/variáveis
        answer,
        retrievedDocs,
        time_ms: timeMs,
        createdAt: `${new Date()}`
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
}