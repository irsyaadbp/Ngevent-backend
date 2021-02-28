import express from "express";
import IRouter from "../interfaces/router.interface";
import { AuthController } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import CategoryController from "../controllers/category.controller";

export default class CategoryRouter implements IRouter {
  path: string = "categories";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const controller = new CategoryController();
    this.router.get("/", controller.getAll);
    this.router.get("/:id", controller.getById);
    this.router.post("/create", authMiddleware, controller.createNew);
    this.router.put("/update", authMiddleware, controller.update);
    this.router.delete("/delete", authMiddleware, controller.delete);
  }
}
