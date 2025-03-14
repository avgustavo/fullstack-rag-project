// src/controllers/syllabus/syllabus.swagger.ts
import zodToOpenAPI from "../../utils/zodUtilitary";
import { IngestSyllabusDTO, ResponseSyllabusDTO } from "./schema";

class SyllabusSwagger {
  private route = "/syllabus";

  public schemas = {
    IngestSyllabusDTO: zodToOpenAPI(IngestSyllabusDTO),
    ResponseSyllabusDTO: zodToOpenAPI(ResponseSyllabusDTO),
  };

  public swagger = {
    ingest: {
      summary: "Ingestão de ementa de disciplina utilizando o modelo de embbeding nomic-embed-text-v1",
      operationId: "ingestSyllabus",
      tags: ["Syllabus"],
      requestBody: {
        description: "Recebe um arquivo PDF da ementa e metadados (código da universidade, semestre, nome da disciplina)",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.IngestSyllabusDTO
          },
        },
      },
      responses: {
        "201": {
          description: "Ementa ingerida com sucesso",
          content: {
            "application/json": {
              schema: this.schemas.ResponseSyllabusDTO,
            },
          },
        },
        "400": { description: "Parâmetros inválidos" },
        "500": { description: "Erro interno do servidor" },
      },
    },
    ingestCompare: {
      summary: "Ingestão de ementa de disciplina utilizando o modelo nomic-embed-text-v1.5",
      operationId: "ingestSyllabusCompare",
      tags: ["Syllabus"],
      requestBody: {
        description: "Recebe um arquivo PDF da ementa e metadados (código da universidade, semestre, nome da disciplina)",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.IngestSyllabusDTO
          },
        },
      },
      responses: {
        "201": {
          description: "Ementa ingerida com sucesso",
          content: {
            "application/json": {
              schema: this.schemas.ResponseSyllabusDTO,
            },
          },
        },
        "400": { description: "Parâmetros inválidos" },
        "500": { description: "Erro interno do servidor" },
      },
    },
  };

  public swaggerController = {
    [`${this.route}/ingest`]: {
      post: this.swagger.ingest,
    },
    [`${this.route}/ingest-compare`]: {
      post: this.swagger.ingest,
    },
  };
}

export default SyllabusSwagger;
