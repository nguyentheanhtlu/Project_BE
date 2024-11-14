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
const http_errors_1 = __importDefault(require("http-errors"));
const user_entity_1 = require("../models/user.entity");
const data_source_1 = __importDefault(require("../database/data-source"));
const userRepo = data_source_1.default.getRepository(user_entity_1.User);
class Token {
    signAccessToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const payload = {
                    data,
                };
                const secret = process.env.JWT_SECRET_KEY;
                const options = {
                    expiresIn: "1y",
                };
                jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(token);
                    }
                });
            });
        });
    }
    signRefreshToken(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const payload = {
                    userID,
                };
                const secret = process.env.JWT_REFRESH_KEY;
                const options = {
                    expiresIn: "1y",
                };
                jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(token);
                    }
                });
            });
        });
    }
    veryfyAccessToken(req, res, next) {
        if (!req.headers.authorization) {
            return next(http_errors_1.default.Unauthorized());
        }
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return next(http_errors_1.default.Unauthorized());
            }
            req.user = payload;
            next();
        });
    }
}
exports.default = new Token();
//# sourceMappingURL=jwt.middlewares.js.map