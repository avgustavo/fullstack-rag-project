// src/utils/getEmbeddings.ts
import { NomicEmbeddings } from "@langchain/nomic";

export async function getEmbedding(data: string): Promise<number[]> {
  console.log("Iniciando embedding com Nomic...");
  const nomicEmbeddings = new NomicEmbeddings({
    apiKey: process.env.NOMIC_API_KEY, // Certifique-se de definir essa variável no .env
    modelName: "nomic-embed-text-v1", // ou "nomic-embed-text-v1.5", se preferir
  });
  
  // Gera o embedding para a query (texto)
  const result = await nomicEmbeddings.embedQuery(data);
  console.log("Embedding finalizado.");
  return result;
}
