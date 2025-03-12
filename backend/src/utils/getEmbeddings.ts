// src/utils/getEmbeddings.ts
import axios from "axios";

type EmbedRequestPayload = {
  texts: string[];
  model: "nomic-embed-text-v1" | "nomic-embed-text-v1.5";
  task_type: "search_document" | "search_query" | "classification" | "clustering";
  // Você pode incluir outros parâmetros opcionais se necessário, por exemplo:
  // long_text_mode?: "truncate" | "mean";
  // max_tokens_per_text?: number;
  // dimensionality?: number;
};

export type embbedingModel = "nomic-embed-text-v1" | "nomic-embed-text-v1.5"

export async function getEmbedding(data: string, model: string): Promise<number[]> {
  console.log("Iniciando embedding com Nomic (via axios)...");
  
  const apiKey = process.env.NOMIC_API_KEY;
  if (!apiKey) {
    throw new Error("NOMIC_API_KEY não está definida.");
  }
  
  const url = "https://api-atlas.nomic.ai/v1/embedding/text";
  
  const payload: EmbedRequestPayload = {
    texts: [data],
    model: model as embbedingModel, // ou "nomic-embed-text-v1.5"
    task_type: "search_document",   // Usado para indexação de documentos
  };
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.post(url, payload, { headers });
    // A resposta deve conter a propriedade "embeddings", que é um array de arrays de números
    if (response.data && response.data.embeddings) {
      console.log("Embedding finalizado.");
      return response.data.embeddings[0];
    } else {
      throw new Error("Resposta inválida da API de embeddings da Nomic.");
    }
  } catch (error) {
    console.error("Erro ao chamar a API de embeddings da Nomic:", error);
    throw error;
  }
}
