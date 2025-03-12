// src/controllers/syllabus/syllabus.schema.ts
import { z } from "zod";

// Schema para os dados de entrada da ingestão da ementa
export const searchBody = z.object({
  prompt: z.string().nonempty(),
});

// Schema para a resposta após a ingestão
export const searchLogRes = z.object({
  id: z.string(),
  question: z.string(),
  mode: z.string(),
  embbedModel: z.string(),
  llmModel: z.string(),
  answer: z.string(),
  retrievedDocs: z.array(z.object({})),
  time_ms: z.number(),
  createdAt: z.string(),
});

// Exporta os tipos para facilitar o uso
export type searchBodyType = z.infer<typeof searchBody>;
export type searchLogResType = z.infer<typeof searchLogRes>;
