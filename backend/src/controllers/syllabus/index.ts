// src/controllers/syllabus/syllabus.controller.ts
import { Request, Response, Router } from "express";
import { IngestSyllabusDTO, ResponseSyllabusDTO } from "./schema";
import SyllabusService from "../../services/syllabus.service";

class SyllabusController {
  public router: Router;
  
  constructor(private readonly syllabusService: SyllabusService) {
    this.router = Router();
    this.routes();
  }

  // Método para ingestão da ementa utilizando a URL do arquivo
  public ingest = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const data = IngestSyllabusDTO.parse(req.body);
      console.log(data);

      // Extrai a URL do arquivo do corpo da requisição
      const { fileUrl } = data;

      // Chama o service para realizar a ingestão da ementa
      const result = await this.syllabusService.ingestSyllabus(fileUrl, data);
      
      // Valida a resposta usando o schema de saída
      const parsedResult = ResponseSyllabusDTO.parse(result);
      return res.status(201).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public ingestCompare = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const data = IngestSyllabusDTO.parse(req.body);
      console.log(data);

      // Extrai a URL do arquivo do corpo da requisição
      const { fileUrl } = data;

      // Chama o service para realizar a ingestão da ementa
      const result = await this.syllabusService.ingestSyllabusCompare(fileUrl, data);
      
      // Valida a resposta usando o schema de saída
      const parsedResult = ResponseSyllabusDTO.parse(result);
      return res.status(201).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public routes() {
    // Define a rota POST para ingestão das ementas
    this.router.post("/syllabus/ingest", async (req, res) => {
      await this.ingest(req, res);
    });
    this.router.post("/syllabus/ingest-compare", async (req, res) => {
      await this.ingestCompare(req, res);
    });
  }
}

export default SyllabusController;
