import express from "express";
import IRouter from "../interfaces/router.interface.ts";
import { AuthController } from "../controllers/auth.controller.ts";
import authMiddleware from "../middleware/auth.middleware.ts";

export default class AuthRouter implements IRouter {
  path: string = "auth";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const controller = new AuthController();
    this.router.post("/register", controller.register);
    this.router.post("/login", controller.login);
    this.router.post("/logout", authMiddleware, controller.logout);
  }
}
