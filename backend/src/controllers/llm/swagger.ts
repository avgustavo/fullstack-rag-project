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
    hfSearchV1: {
      summary:
        "Recuperação de geração utilizando o modelo 'hf' e o modelo de embbeding 'nomic-embed-text-v1'",
      operationId: "hfSearchV1",
      tags: ["Hugging Face"],
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
    hfSearchV2: {
      summary:
        "Recuperação de geração utilizando o modelo 'hf' e o modelo de embbeding 'nomic-embed-text-v1.5'",
      operationId: "hfSearchV2",
      tags: ["Hugging Face"],
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
    hfFilterSearchV1: {
      summary:
        "Recuperação de geração com FILTROS utilizando o modelo 'hf' e o modelo de embbeding 'nomic-embed-text-v1'",
      operationId: "hfFilterSearchV1",
      tags: ["HF-Filtrado"],
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
    hfFilterSearchV2: {
      summary:
        "Recuperação de geração com FILTROS o modelo 'hf' e o modelo de embbeding 'nomic-embed-text-v1.5'",
      operationId: "hfFilterSearchV2",
      tags: ["HF-Filtrado"],
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
    [`${this.route}/hfv1`]: {
      post: this.swagger.hfSearchV1,
    },
    [`${this.route}/hfv2`]: {
      post: this.swagger.hfSearchV2,
    },
    [`${this.route}/hfv1-filter`]: {
      post: this.swagger.hfFilterSearchV1,
    },
    [`${this.route}/hfv2-filter`]: {
      post: this.swagger.hfFilterSearchV2,
    },
  };
}

export default LLMSwagger;
