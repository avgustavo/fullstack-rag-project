import SyllabusController from "./syllabus";
import Services from "../services/services";
import LLMController from "./llm";

class Controllers {
  constructor(private readonly services: Services) {}
  public syllabusController = new SyllabusController(
    this.services.syllabusService,
  );
  public llmController = new LLMController(this.services.searchService);
}

export default Controllers;
