import SyllabusService from "./syllabus.service";

class Services {
  public syllabusService: SyllabusService;

  constructor() {
    this.syllabusService = new SyllabusService();
  }
}

export default Services;