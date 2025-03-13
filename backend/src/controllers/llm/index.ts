// src/controllers/syllabus/syllabus.controller.ts
import { Request, Response, Router } from "express";
import { searchBody, searchLogRes } from "./schema";
import { SearchService } from "../../services/search.service";

class LLMController {
  public router: Router;

  constructor(private readonly searchService: SearchService) {
    this.router = Router();
    this.routes();
  }

  // Método para fazer a pesquisa normal, sem query analyser
  public groqSearchV1 = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const { prompt } = searchBody.parse(req.body);
      console.log("recebido o prompt");

      // Chama o service para realizar a ingestão da ementa
      const logs = await this.searchService.searchRAG(prompt, "groq", "nomic-embed-text-v1");

      // Valida a resposta usando o schema de saída
      const parsedResult = searchLogRes.parse(logs);
      return res.status(200).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public groqSearchV2 = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const { prompt } = searchBody.parse(req.body);

      // Chama o service para realizar a ingestão da ementa
      const logs = await this.searchService.searchRAG(prompt, "groq", "nomic-embed-text-v1.5");

      // Valida a resposta usando o schema de saída
      const parsedResult = searchLogRes.parse(logs);
      return res.status(200).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public groqFilterSearchV1 = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const { prompt } = searchBody.parse(req.body);
      console.log("recebido o prompt");

      // Chama o service para realizar a ingestão da ementa
      const logs = await this.searchService.filterSearch(prompt, "groq", "nomic-embed-text-v1");

      // Valida a resposta usando o schema de saída
      const parsedResult = searchLogRes.parse(logs);
      return res.status(200).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public groqFilterSearchV2 = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const { prompt } = searchBody.parse(req.body);

      // Chama o service para realizar a ingestão da ementa
      const logs = await this.searchService.filterSearch(prompt, "groq", "nomic-embed-text-v1.5");

      // Valida a resposta usando o schema de saída
      const parsedResult = searchLogRes.parse(logs);
      return res.status(200).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public gemmaSearchV1 = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const { prompt } = searchBody.parse(req.body);
      console.log("recebido o prompt");

      // Chama o service para realizar a ingestão da ementa
      const logs = await this.searchService.searchRAG(prompt, "gemma", "nomic-embed-text-v1");

      // Valida a resposta usando o schema de saída
      const parsedResult = searchLogRes.parse(logs);
      return res.status(200).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public gemmaSearchV2 = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const { prompt } = searchBody.parse(req.body);

      // Chama o service para realizar a ingestão da ementa
      const logs = await this.searchService.searchRAG(prompt, "gemma", "nomic-embed-text-v1.5");

      // Valida a resposta usando o schema de saída
      const parsedResult = searchLogRes.parse(logs);
      return res.status(200).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public gemmaFilterSearchV1 = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const { prompt } = searchBody.parse(req.body);
      console.log("recebido o prompt");

      // Chama o service para realizar a ingestão da ementa
      const logs = await this.searchService.filterSearch(prompt, "gemma", "nomic-embed-text-v1");

      // Valida a resposta usando o schema de saída
      const parsedResult = searchLogRes.parse(logs);
      return res.status(200).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public gemmaFilterSearchV2 = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validação dos dados enviados (incluindo fileUrl)
      const { prompt } = searchBody.parse(req.body);

      // Chama o service para realizar a ingestão da ementa
      const logs = await this.searchService.filterSearch(prompt, "gemma", "nomic-embed-text-v1.5");

      // Valida a resposta usando o schema de saída
      const parsedResult = searchLogRes.parse(logs);
      return res.status(200).json(parsedResult);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  public routes() {
    // Define a rota POST para ingestão das ementas
    this.router.post("/llm/groqv1", async (req, res) => {
      await this.groqSearchV1(req, res);
    });
    this.router.post("/llm/groqv2", async (req, res) => {
      await this.groqSearchV2(req, res);
    });
    // Define a rota POST para ingestão das ementas
    this.router.post("/llm/groqv1-filter", async (req, res) => {
      await this.groqFilterSearchV1(req, res);
    });
    this.router.post("/llm/groqv2-filter", async (req, res) => {
      await this.groqFilterSearchV2(req, res);
    });
    this.router.post("/llm/gemmav1", async (req, res) => {
      await this.gemmaSearchV1(req, res);
    });
    this.router.post("/llm/gemmav2", async (req, res) => {
      await this.gemmaSearchV2(req, res);
    });
    // Define a rota POST para ingestão das ementas
    this.router.post("/llm/gemmav1-filter", async (req, res) => {
      await this.gemmaFilterSearchV1(req, res);
    });
    this.router.post("/llm/gemmav2-filter", async (req, res) => {
      await this.gemmaFilterSearchV2(req, res);
    });
  }
}

export default LLMController;
