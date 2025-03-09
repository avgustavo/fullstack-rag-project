import express from "express";
import swaggerOptions from "./config/swagger.def";
import swaggerUI from "swagger-ui-express";
import Controllers from "./controllers/controllers";
import Services from "./services/services";
import cors from "cors";

require('dotenv').config()

class HttpServer {
  public app: express.Application;
  constructor() {
    this.app = express();
  }

  setup() {
    const services = new Services();
    const controllers = new Controllers(services);
    this.setupMiddlewares();
    this.setupSwagger();
    this.setupRoutes(controllers);
  }



  setupMiddlewares() {
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      }),
    );

    this.app.use(express.json());
  }

  setupSwagger() {
    this.app.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerOptions.swaggerDefinition),
    );
  }

  setupRoutes(controllers: Controllers) {
    this.app.use(controllers.syllabusController.router);
  }

  getExpressApp(): express.Application {
    return this.app;
  }
}

const httpServer = new HttpServer();
httpServer.setup();
const app = httpServer.getExpressApp();
app.listen(8500, "0.0.0.0", () => {
  console.log("Server is running on port 8500");
});
