// src/utils/callLLM.ts
import { llmModel } from "../types/allTypes";
import { messageInterface } from "../types/allTypes";
import { HfInference } from "@huggingface/inference";
import Groq from "groq-sdk";

/**
 * Chama o modelo de linguagem configurado (groq ou hf) e retorna a string de resposta.
 * @param prompt Texto a ser enviado ao modelo como se fosse a última mensagem do usuário.
 * @param llm Qual LLM/endpoint será usado ('groq' ou 'hf').
 * @returns Resposta do modelo em formato de string
 */
export async function callLLM(prompt: string | messageInterface[], llm: llmModel): Promise<string> {
  let messages: messageInterface[] = [];
  if (typeof prompt === "string") {
    messages = [{ role: "user", content: prompt }];
  } else if (Array.isArray(prompt)) {
    messages = prompt;
  }
  if (llm === "hf") {
    // ==============================
    // 1. Hugging Face Chat Completion
    // ==============================

    const hf = new HfInference(process.env.HUGGING_FACE_ACCESS_TOKEN);

    // Ajuste conforme o modelo que você quer usar
    // Observação: nem todos os modelos na Hugging Face suportam chatCompletion
    const model = hf.endpoint(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
    );

    try {
      // O método chatCompletion no @huggingface/inference precisa de:
      //  - model: string
      //  - messages: Mensagens do chat
      //  - max_tokens, temperature (opcionais, se suportado pelo modelo)
      const response = await hf.chatCompletion({
        model,
        messages: messages,
        max_tokens: 200,
        temperature: 0.7,
      });

      // O retorno normalmente é: { choices: [ { message: { content: '...' } } ] }
      return `${response.choices[0].message.content}`;
    } catch (error) {
      console.error("Erro na chamada HF ChatCompletion:", error);
      return "Desculpe, ocorreu um erro ao gerar a resposta (HF).";
    }
  } else if (llm === "groq") {
    // ======================
    // 2. Groq Chat Completion
    // ======================

    // Usa a biblioteca groq-sdk
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });
    // Ajuste o model conforme necessário
    const model = process.env.GROQ_MODEL_NAME || "llama-3.3-70b-versatile";

    try {
      const completion = await groq.chat.completions.create({
        messages: messages as any,
        model,
        // se quiser: temperature, max_tokens, etc.
      });
      return `${completion.choices[0].message.content}`;
    } catch (error) {
      console.error("Erro na chamada Groq ChatCompletion:", error);
      return "Desculpe, ocorreu um erro ao gerar a resposta (Groq).";
    }
  }

  // Caso não seja 'hf' nem 'groq', retorne algo default
  return "Modelo de LLM não suportado.";
}
