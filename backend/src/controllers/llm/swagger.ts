// src/controllers/LLM/LLM.swagger.ts
import zodToOpenAPI from "../../utils/zodUtilitary";
import { searchBody, searchLogRes } from "./schema";

class LLMSwagger {
  private route = "/llm";

  public schemas = {
    searchBody: zodToOpenAPI(searchBody),
    searchLogRes: zodToOpenAPI(searchLogRes),
  };

  public swagger = {
    groqSearchV1: {
      summary: "Recuperação de geração utilizando o modelo 'Groq' e o modelo de embbeding 'nomic-embed-text-v1'",
      operationId: "groqSearchV1",
      tags: ["Groq"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody
          },
        },
      },
      responses: {
        "200": {
          description: "Pergunta respondida com sucesso",
          content: {
            "application/json": {
              schema: this.schemas.searchLogRes,
            },
          },
        },
        "400": { description: "Parâmetros inválidos" },
        "500": { description: "Erro interno do servidor" },
      },
    },
    groqSearchV2: {
      summary: "Recuperação de geração utilizando o modelo 'Groq' e o modelo de embbeding 'nomic-embed-text-v1.5'",
      operationId: "groqSearchV2",
      tags: ["Groq"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody
          },
        },
      },
      responses: {
        "200": {
          description: "Pergunta respondida com sucesso",
          content: {
            "application/json": {
              schema: this.schemas.searchLogRes,
            },
          },
        },
        "400": { description: "Parâmetros inválidos" },
        "500": { description: "Erro interno do servidor" },
      },
    },
  };

  public swaggerController = {
    [`${this.route}/groqv1`]: {
      post: this.swagger.groqSearchV1,
    },
    [`${this.route}/groqv2`]: {
      post: this.swagger.groqSearchV2,
    },

  };
}

export default LLMSwagger;
