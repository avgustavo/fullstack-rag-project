// src/prompts/filterSearch.prompt.ts
// src/utils/parseFilterLLM.ts
import { callLLM } from "./callLLM";
import { FilterSearchSchema, FilterSearchType } from "../controllers/llm/schema";

export const filterSearchPrompt = `
Você é um sistema de análise de consultas para disciplinas de Engenharia de Computação.
A partir da pergunta do usuário, identifique se ele especificou um nome de disciplina (courseName),
um código de disciplina (universityCode), um semestre (semester) e se ele quer o link completo do PDF (wantFileUrl).
Se sobrar alguma pergunta sobre o conteúdo da ementa (por exemplo, bibliografia, tópicos abordados), coloque isso em "questionForContent".

Responda estritamente em JSON, no seguinte formato:

{
  "courseName": string[] (opcional),
  "universityCode": string[] (opcional),
  "semester": string[] (opcional),
  "wantFileUrl": boolean (opcional),
  "questionForContent": string (opcional)
}
Se não tiver um campo, omita-o.
Não escreva nada além do JSON.
`;

export async function parseFilterLLM(
  userQuestion: string,
  llm: "hf" | "groq" | "gemma",
): Promise<FilterSearchType> {
  const messages = [
    {
      role: "system" as const,
      content: filterSearchPrompt,
    },
    {
      role: "user" as const,
      content: userQuestion,
    },
  ];

  const rawResponse = await callLLM(messages, llm);

  let parsedData: any;
  try {
    parsedData = JSON.parse(rawResponse.trim());
  } catch (err) {
    console.error("Erro ao fazer parse do JSON:", err);
    // fallback
    parsedData = {};
  }

  const validated = FilterSearchSchema.parse(parsedData);
  console.log("Query analyzer: ");
  console.log(validated);
  return validated;
}
