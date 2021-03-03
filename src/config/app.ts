import dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import AuthRouter from "../routes/auth.routes";
import { errorHandler } from "../middleware/error.middleware";
import IRouter from "../interfaces/router.interface";
import { Connection, createConnection } from "typeorm";
import CategoryRouter from "../routes/category.routes";
import EventRouter from "../routes/event.routes";
import OrderRouter from "../routes/order.routes";
import { config } from "./ormconfig";

class App {
  public app: express.Application;

  constructor() {
    dotenv.config();
    this.app = express();
    this.config();

    (async () => {
      await this.initOrm();
      this.initializeRoutes([
        new AuthRouter(),
        new CategoryRouter(),
        new EventRouter(),
        new OrderRouter(),
      ]);
    })();
  }

  private config(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(errorHandler);
  }

  private async initOrm(): Promise<Connection> {
    return await createConnection(config);
  }

  private initializeRoutes(routes: IRouter[]): void {
    this.app.get("/api", (_, res: Response) => {
      res
        .status(200)
        .json({ success: true, message: "This is api for Ngevent apps" });
    });

    routes.forEach((route) => {
      const env = process.env.NODE_ENV || "development";

      if (env === "development") {
        console.log(`/api/${route.path}`);
      }

      this.app.use(`/api/${route.path}`, route.router);
    });

    this.app.all("*", function (req: Request, res: Response) {
      res
        .status(404)
        .send({ success: false, message: "Check your URL please" });
    });
  }
}

export default new App().app;
