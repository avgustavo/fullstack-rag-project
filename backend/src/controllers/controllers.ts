import SyllabusController from "./syllabus";
import Services from "../services/services";

class Controllers {
  constructor(private readonly services: Services) {}
  public syllabusController = new SyllabusController(
    this.services.syllabusService,
  );
}

export default Controllers;
