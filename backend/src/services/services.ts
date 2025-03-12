import { SearchService } from "./search.service";
import SyllabusService from "./syllabus.service";

class Services {
  public syllabusService: SyllabusService;
  public searchService: SearchService;

  constructor() {
    this.syllabusService = new SyllabusService();
    this.searchService = new SearchService();
  }
}

export default Services;