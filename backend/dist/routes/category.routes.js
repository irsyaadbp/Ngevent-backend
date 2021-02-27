"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const category_controller_1 = require("../controllers/category.controller");
class CategoryRouter {
    constructor() {
        this.path = "categories";
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const controller = new category_controller_1.default();
        this.router.get("/", controller.getAll);
        this.router.get("/:id", controller.getById);
        this.router.post("/create", auth_middleware_1.default, controller.createNew);
        this.router.put("/update", auth_middleware_1.default, controller.update);
        this.router.delete("/delete", auth_middleware_1.default, controller.delete);
    }
}
exports.default = CategoryRouter;
//# sourceMappingURL=category.routes.js.map