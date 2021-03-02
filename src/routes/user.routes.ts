import IRouter from "../interfaces/router.interface";
import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import UserController from "../controllers/user.controller";
import { formMiddleware } from "../middleware/form.middleware";

export default class EventRouter implements IRouter {
  path: string = "users";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const controller = new UserController();
    this.router.get("/", authMiddleware, controller.getAll);
    this.router.get("/:id", authMiddleware, controller.getById);
    this.router.post("/create", authMiddleware, controller.createNew);
    this.router.put("/update", authMiddleware, controller.update);
    this.router.put(
      "/change-password",
      authMiddleware,
      controller.changePassword
    );
    this.router.put(
      "/change-avatar",
      [authMiddleware, formMiddleware],
      controller.changeAvatar
    );
    this.router.delete("/delete", authMiddleware, controller.delete);
  }
}
