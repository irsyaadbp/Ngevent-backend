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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = req.cookies;
        if (cookies && cookies.token) {
            const secret = process.env.JWT_SECRET_KEY || "SECRET_KEY";
            try {
                const verificationResponse = jsonwebtoken_1.default.verify(cookies.token, secret);
                const id = verificationResponse.id;
                const repository = typeorm_1.getRepository(user_entity_1.User);
                const user = yield repository.findOne({ id });
                if (user) {
                    req.user = user;
                    next();
                }
                else {
                    res
                        .status(401)
                        .json({
                        status: false,
                        message: "User not found",
                    })
                        .end();
                }
            }
            catch (error) {
                res
                    .status(401)
                    .json({
                    status: false,
                    message: error.message,
                })
                    .end();
            }
        }
        else {
            res
                .status(401)
                .json({
                status: false,
                message: "You must send token",
            })
                .end();
        }
    });
}
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map