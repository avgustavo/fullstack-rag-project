// src/services/syllabus.service.ts
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoClient } from "mongodb";
import { getEmbedding } from "../utils/getEmbeddings";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

interface SyllabusMetadata {
  universityCode: string;
  semester: string;
  courseName: string;
}

class SyllabusService {

  public async ingestSyllabus(fileUrl: string, metadata: SyllabusMetadata): Promise<{ insertedCount: number; message: string }> {
    console.log(`${process.env.ATLAS_CONNECTION_STRING}`);
    const client = new MongoClient(`${process.env.ATLAS_CONNECTION_STRING}`);
    // Gera um caminho temporário para armazenar o PDF baixado
    const tempFilePath = path.join(os.tmpdir(), `syllabus-${Date.now()}.pdf`);

    try {
      // Realiza o download do arquivo PDF a partir da URL
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Falha ao baixar o arquivo: ${response.statusText}`);
      }
      const pdfBuffer = await response.arrayBuffer();
      const pdfData = Buffer.from(pdfBuffer);
      
      // Salva o arquivo PDF em um caminho temporário
      fs.writeFileSync(tempFilePath, pdfData);
      console.log(`Arquivo baixado para ${tempFilePath}`);

      // Carrega o PDF usando o PDFLoader
      const loader = new PDFLoader(tempFilePath);
      const data = await loader.load();

      // Realiza o chunking do texto extraído do PDF
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 400,
        chunkOverlap: 20,
      });
      const docs = await textSplitter.splitDocuments(data);
      console.log(`PDF dividido em ${docs.length} documentos.`);

      // Processa cada chunk para gerar embedding e adicionar os metadados
      const insertDocuments = [];
      for (const doc of docs) {
        const embedding = await getEmbedding(doc.pageContent, "nomic-embed-text-v1");
        insertDocuments.push({
          universityCode: metadata.universityCode,
          semester: metadata.semester,
          courseName: metadata.courseName,
          fileUrl: fileUrl,
          document: doc,
          embedding: embedding,
          ingestedAt: new Date(),
        });
      }

      // Conecta ao MongoDB e insere os documentos
      await client.connect();
      const db = client.db("syllabus");
      const collection = db.collection("syllabi");
      const result = await collection.insertMany(insertDocuments);

      return { insertedCount: result.insertedCount, message: "Ementa ingerida com sucesso" };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      // Remove o arquivo temporário baixado
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
        console.log(`Arquivo temporário ${tempFilePath} removido.`);
      }
      await client.close();
    }
  }

  public async ingestSyllabusCompare(fileUrl: string, metadata: SyllabusMetadata): Promise<{ insertedCount: number; message: string }> {
    console.log(`${process.env.ATLAS_CONNECTION_STRING}`);
    const client = new MongoClient(`${process.env.ATLAS_CONNECTION_STRING}`);
    // Gera um caminho temporário para armazenar o PDF baixado
    const tempFilePath = path.join(os.tmpdir(), `syllabus-${Date.now()}.pdf`);

    try {
      // Realiza o download do arquivo PDF a partir da URL
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Falha ao baixar o arquivo: ${response.statusText}`);
      }
      const pdfBuffer = await response.arrayBuffer();
      const pdfData = Buffer.from(pdfBuffer);
      
      // Salva o arquivo PDF em um caminho temporário
      fs.writeFileSync(tempFilePath, pdfData);
      console.log(`Arquivo baixado para ${tempFilePath}`);

      // Carrega o PDF usando o PDFLoader
      const loader = new PDFLoader(tempFilePath);
      const data = await loader.load();

      // Realiza o chunking do texto extraído do PDF
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 400,
        chunkOverlap: 20,
      });
      const docs = await textSplitter.splitDocuments(data);
      console.log(`PDF dividido em ${docs.length} documentos.`);

      // Processa cada chunk para gerar embedding e adicionar os metadados
      const insertDocuments = [];
      for (const doc of docs) {
        const embedding = await getEmbedding(doc.pageContent, "nomic-embed-text-v1.5");
        insertDocuments.push({
          universityCode: metadata.universityCode,
          semester: metadata.semester,
          courseName: metadata.courseName,
          fileUrl: fileUrl,
          document: doc,
          embedding: embedding,
          ingestedAt: new Date(),
        });
      }

      // Conecta ao MongoDB e insere os documentos
      await client.connect();
      const db = client.db("syllabus");
      const collection = db.collection("syllabi2");
      const result = await collection.insertMany(insertDocuments);

      return { insertedCount: result.insertedCount, message: "Ementa ingerida com sucesso" };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      // Remove o arquivo temporário baixado
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
        console.log(`Arquivo temporário ${tempFilePath} removido.`);
      }
      await client.close();
    }
  }
}

export default SyllabusService;
