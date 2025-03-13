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
      summary:
        "Recuperação de geração utilizando o modelo 'Groq' e o modelo de embbeding 'nomic-embed-text-v1'",
      operationId: "groqSearchV1",
      tags: ["Groq"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody,
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
      summary:
        "Recuperação de geração utilizando o modelo 'Groq' e o modelo de embbeding 'nomic-embed-text-v1.5'",
      operationId: "groqSearchV2",
      tags: ["Groq"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody,
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
    groqFilterSearchV1: {
      summary:
        "Recuperação de geração com FILTROS utilizando o modelo 'Groq' e o modelo de embbeding 'nomic-embed-text-v1'",
      operationId: "groqFilterSearchV1",
      tags: ["Groq-Filtrado"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody,
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
    groqFilterSearchV2: {
      summary:
        "Recuperação de geração com FILTROS o modelo 'Groq' e o modelo de embbeding 'nomic-embed-text-v1.5'",
      operationId: "groqFilterSearchV2",
      tags: ["Groq-Filtrado"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody,
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
    gemmaSearchV1: {
      summary:
        "Recuperação de geração utilizando o modelo 'gemma' e o modelo de embbeding 'nomic-embed-text-v1'",
      operationId: "gemmaSearchV1",
      tags: ["Gemma"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody,
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
    gemmaSearchV2: {
      summary:
        "Recuperação de geração utilizando o modelo 'gemma' e o modelo de embbeding 'nomic-embed-text-v1.5'",
      operationId: "gemmaSearchV2",
      tags: ["Gemma"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody,
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
    gemmaFilterSearchV1: {
      summary:
        "Recuperação de geração com FILTROS utilizando o modelo 'gemma' e o modelo de embbeding 'nomic-embed-text-v1'",
      operationId: "gemmaFilterSearchV1",
      tags: ["gemma-Filtrado"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody,
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
    gemmaFilterSearchV2: {
      summary:
        "Recuperação de geração com FILTROS o modelo 'gemma' e o modelo de embbeding 'nomic-embed-text-v1.5'",
      operationId: "gemmaFilterSearchV2",
      tags: ["gemma-Filtrado"],
      requestBody: {
        description: "Recebe a pergunta do usuário",
        required: true,
        content: {
          "application/json": {
            schema: this.schemas.searchBody,
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
    [`${this.route}/groqv1-filter`]: {
      post: this.swagger.groqFilterSearchV1,
    },
    [`${this.route}/groqv2-filter`]: {
      post: this.swagger.groqFilterSearchV2,
    },
    [`${this.route}/gemmav1`]: {
      post: this.swagger.gemmaSearchV1,
    },
    [`${this.route}/gemmav2`]: {
      post: this.swagger.gemmaSearchV2,
    },
    [`${this.route}/gemmav1-filter`]: {
      post: this.swagger.gemmaFilterSearchV1,
    },
    [`${this.route}/gemmav2-filter`]: {
      post: this.swagger.gemmaFilterSearchV2,
    },
  };
}

export default LLMSwagger;
