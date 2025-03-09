// src/swaggerOptions.ts
import SyllabusSwagger from "../controllers/syllabus/swagger";

const syllabusSwagger = new SyllabusSwagger();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "Syllabus API",
      description: "API para ingestão e consulta das ementas das disciplinas",
      version: "1.0.0",
    },
    paths: {
      ...syllabusSwagger.swaggerController,
    },
    components: {
      schemas: {
        ...syllabusSwagger.schemas,
      },
    },
  },
  apis: ["./src/controllers/syllabus/*.ts"],
};

export default swaggerOptions;
