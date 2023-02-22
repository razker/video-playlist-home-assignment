import * as bodyParser from "body-parser";
import * as cors from "cors";
const path = require("path");
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import swaggerUi = require("swagger-ui-express");
import fs = require("fs");
import { TempController } from "./controller/temp.controller";
import { corsOption } from "./server.config";

class App {
  public express: express.Application;
  public logger: APILogger;
  public tempController: TempController;

  /* Swagger files start */
  // private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
  // private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
  // private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
  // private swaggerDocument = JSON.parse(this.swaggerData);
  /* Swagger files end */

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new APILogger();
    //   this.tempController = new TempController();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(path.join(__dirname, "../ui/build")));
    this.express.use(cors(corsOption));
  }

  private routes(): void {
    this.express.get("/api/temp", async (req, res) => {
      this.logger.info("GET /api/temp ");

      try {
        //TODO: fix any type
        const response: any = [{ "1234-5678": "raz" }, { "1324-5675": "dan" }];
        res.json(response);
      } catch (error) {
        this.logger.error(error);
        res.status(500).json(error);
      }
    });

    this.express.post("/api/temp", async (req, res) => {
      try {
        this.logger.info("POST /api/event | body: ", req.body);
        //TODO: fix any type
        const response: any = [];
        if (response?.error) {
          res.status(409).json(response?.error);
        } else {
          res.json(response);
        }
      } catch (error) {
        this.logger.error(error);
        res.status(500).json(error);
      }
    });

    this.express.get("/api/health-check", (req, res) => {
      this.logger.info(`GET /api/health-check`);
      res.status(200).send();
    });

    // swagger docs
    //this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.status(404).send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
