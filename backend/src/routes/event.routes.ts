import express from "express";
import EventController from "../controllers/event.controller";
import IRouter from "../interfaces/router.interface";
import authMiddleware from "../middleware/auth.middleware";
import { formMiddleware } from "../middleware/form.middleware";

export default class EventRouter implements IRouter {
  path: string = "events";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const controller = new EventController();
    this.router.get("/", controller.getAll);
    this.router.get("/:id", controller.getById);
    this.router.post(
      "/create",
      [authMiddleware, formMiddleware],
      controller.createNew
    );
    this.router.put(
      "/update",
      [authMiddleware, formMiddleware],
      controller.update
    );
    this.router.delete("/delete", authMiddleware, controller.delete);
  }
}
