import express from "express";
import EventController from "../controllers/event.controller.ts";
import IRouter from "../interfaces/router.interface.ts";
import authMiddleware from "../middleware/auth.middleware.ts";
import { formMiddleware } from "../middleware/form.middleware.ts";

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
