"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const error_middleware_1 = require("../middleware/error.middleware");
const typeorm_1 = require("typeorm");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const category_routes_1 = __importDefault(require("../routes/category.routes"));
const event_routes_1 = __importDefault(require("../routes/event.routes"));
const order_routes_1 = __importDefault(require("../routes/order.routes"));
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