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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor() {
        this.repository = typeorm_1.getRepository(user_entity_1.User);
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const isEmailExist = yield this.isExist("email", data.email);
            if (isEmailExist) {
                res.json({
                    success: false,
                    message: "Email already taken",
                }).end;
                return;
            }
            const isUsernameExist = yield this.isExist("username", data.email);
            if (isUsernameExist) {
                res.json({
                    success: false,
                    message: "Username already taken",
                }).end;
                return;
            }
            const encryptPassword = yield this.encrypt(data.password);
            const newData = Object.assign(Object.assign({}, data), { password: encryptPassword });
            const newUser = yield this.repository.save(newData);
            const { password } = newUser, dataUser = __rest(newUser, ["password"]);
            const tokenData = this.createToken(newUser);
            res.cookie("token", tokenData.token, {
                httpOnly: true,
                path: "/api",
            });
            res.json({
                success: true,
                data: dataUser,
            });
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const getUser = yield this.repository.findOne({ username: data.username });
            if (getUser === null || getUser === void 0 ? void 0 : getUser.username) {
                const isPasswordMatching = yield this.compare(data.password, getUser.password);
                if (isPasswordMatching) {
                    const { password } = getUser, dataUser = __rest(getUser, ["password"]);
                    const tokenData = this.createToken(getUser);
                    res.cookie("token", tokenData.token, {
                        httpOnly: true,
                        path: "/api",
                    });
                    res.json({
                        success: true,
                        data: dataUser,
                    });
                }
                else {
                    res.json({
                        success: false,
                        message: "Password not match",
                    });
                }
            }
            else {
                res.json({
                    success: false,
                    message: "Username not found",
                });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res
                .clearCookie("token", {
                httpOnly: true,
                path: "/api",
            })
                .json({
                success: true,
                message: "Logout success",
            });
        });
        this.isExist = (column, value) => __awaiter(this, void 0, void 0, function* () {
            return (yield this.repository.count({ where: { [column]: value } })) !== 0;
        });
        this.encrypt = (plainText) => __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hash = yield bcrypt_1.default.hash(plainText, salt);
            return hash;
        });
        this.compare = (input, hash) => __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(input, hash);
        });
    }
    createToken(user) {
        const expiresIn = 24 * 60 * 60;
        const secret = process.env.JWT_SECRET_KEY || "SECRET_KEY";
        const dataStoredInToken = {
            id: user.id,
            email: user.email,
            role: user.role,
            username: user.username,
        };
        return {
            expiresIn,
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map