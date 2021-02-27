"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
class AuthRouter {
    constructor() {
        this.path = "auth";
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const controller = new auth_controller_1.AuthController();
        this.router.post("/register", controller.register);
        this.router.post("/login", controller.login);
        this.router.post("/logout", auth_middleware_1.default, controller.logout);
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=auth.routes.js.map