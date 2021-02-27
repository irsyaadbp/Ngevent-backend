"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
class OrderRouter {
    constructor() {
        this.path = "orders";
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const controller = new order_controller_1.default();
        this.router.get("/", auth_middleware_1.default, controller.getAll);
        this.router.get("/:id", auth_middleware_1.default, controller.getById);
        this.router.post("/create", auth_middleware_1.default, controller.createNew);
        this.router.put("/update", auth_middleware_1.default, controller.update);
    }
}
exports.default = OrderRouter;
//# sourceMappingURL=order.routes.js.map