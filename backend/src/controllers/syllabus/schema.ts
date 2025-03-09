// src/controllers/syllabus/syllabus.schema.ts
import { z } from "zod";

// Schema para os dados de entrada da ingestão da ementa
export const IngestSyllabusDTO = z.object({
  universityCode: z.string().nonempty("Código da universidade é obrigatório"),
  semester: z.string().nonempty("Semestre letivo é obrigatório"),
  courseName: z.string().nonempty("Nome da disciplina é obrigatório"),
  fileUrl: z.string().url("Deve ser uma URL válida"),
});

// Schema para a resposta após a ingestão
export const ResponseSyllabusDTO = z.object({
  insertedCount: z.number().int(),
  message: z.string(),
});

// Exporta os tipos para facilitar o uso
export type IngestSyllabusDTOType = z.infer<typeof IngestSyllabusDTO>;
export type ResponseSyllabusDTOType = z.infer<typeof ResponseSyllabusDTO>;
