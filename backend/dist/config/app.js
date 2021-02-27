"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const express_1 = require("express");
const helmet_1 = require("helmet");
const cors_1 = require("cors");
const auth_routes_1 = require("../routes/auth.routes");
const error_middleware_1 = require("../middleware/error.middleware");
const typeorm_1 = require("typeorm");
const cookie_parser_1 = require("cookie-parser");
const category_routes_1 = require("../routes/category.routes");
const event_routes_1 = require("../routes/event.routes");
const order_routes_1 = require("../routes/order.routes");
class App {
    constructor() {
        dotenv.config();
        this.app = express_1.default();
        this.config();
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.initOrm();
            this.initializeRoutes([
                new auth_routes_1.default(),
                new category_routes_1.default(),
                new event_routes_1.default(),
                new order_routes_1.default(),
            ]);
        }))();
    }
    config() {
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(error_middleware_1.errorHandler);
        this.app.use(cookie_parser_1.default());
    }
    initOrm() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.createConnection();
        });
    }
    initializeRoutes(routes) {
        this.app.get("/api", (_, res) => {
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
        this.app.all("*", function (req, res) {
            res
                .status(404)
                .send({ success: false, message: "Check your URL please" });
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map