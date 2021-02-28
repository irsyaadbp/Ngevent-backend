import IRouter from "../interfaces/router.interface";
import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import OrderController from "../controllers/order.controller";

export default class OrderRouter implements IRouter {
  path: string = "orders";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const controller = new OrderController();
    this.router.get("/", authMiddleware, controller.getAll);
    this.router.get("/:id", authMiddleware, controller.getById);
    this.router.post("/create", authMiddleware, controller.createNew);
    this.router.put("/update", authMiddleware, controller.update);
  }
}
