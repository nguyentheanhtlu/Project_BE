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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = __importDefault(require("../database/data-source"));
const user_entity_1 = require("../models/user.entity");
const base_services_1 = __importDefault(require("./base.services"));
const user_services_1 = __importDefault(require("./user.services"));
const http_errors_1 = __importDefault(require("http-errors"));
require('dotenv').config();
let userRepo = data_source_1.default.getRepository(user_entity_1.User);
class AuthServices extends base_services_1.default {
    static checkAuthAndGenerateTokens(username, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield user_services_1.default.getUserByUserName(username);
            if (!user) {
                throw new Error("Wrong username or password");
            }
            let match = yield bcrypt_1.default.compare(passwordHash, user.passwordHash);
            if (!match) {
                throw new Error("Wrong username or password");
            }
            // if (!user.active) {
            //     throw new Error("Please verify your email to login");
            // }
            let accessToken = this.generateAccessToken(user);
            let refreshToken = this.generateRefreshToken(user);
            // user.refreshToken = refreshToken;
            userRepo.save(user);
            return [accessToken, refreshToken];
        });
    }
    static changePassword(user, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldPasswords = user.password;
            let confirmPasswordSuccess = yield bcrypt_1.default.compare(oldPassword, oldPasswords);
            console.log(confirmPasswordSuccess);
            if (confirmPasswordSuccess) {
                user.password = yield bcrypt_1.default.hash(newPassword, 10);
                yield userRepo.save(user);
            }
            else {
                throw new Error("Password Mismatch");
            }
        });
    }
    // static async verifyEmail({ token }): Promise<void> {
    //     jwt.verify(token, `${process.env.JWT_REFRESH_KEY}`, async (err, decoded) => {
    //         let user = await UserServices.getUserByUserName(decoded);
    //         user.active = true;
    //         await userRepo.save(user);
    //         return;
    //     })
    // }
    static signAccessToken(data) {
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
    signRefreshToken(idNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const payload = {
                    idNumber,
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
exports.default = AuthServices;
//# sourceMappingURL=auth.services.js.map