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
  timeMs: z.number(),
  totalTime: z.number().optional(),
  createdAt: z.string(),
});

export const FilterSearchSchema = z.object({
  courseName: z.array(z.string()).optional(),
  universityCode: z.array(z.string()).optional(),
  semester: z.array(z.union([z.number(), z.string()])).optional(),
  wantFileUrl: z.boolean().optional(),
  questionForContent: z.string().optional(),
});

// Exporta os tipos para facilitar o uso
export type searchBodyType = z.infer<typeof searchBody>;
export type searchLogResType = z.infer<typeof searchLogRes>;
export type FilterSearchType = z.infer<typeof FilterSearchSchema>;
