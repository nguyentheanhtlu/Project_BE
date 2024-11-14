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
const data_source_1 = __importDefault(require("../database/data-source"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../models/user.entity");
const base_controller_1 = __importDefault(require("../controller/base.controller"));
require('dotenv').config();
let userRepo = data_source_1.default.getRepository(user_entity_1.User);
class AuthMiddleware {
    // static checkAuthentication(req, res, next) {
    //     if (authHeader) {
    //         const authHeader = req.headers.authorization;
    //         const token = authHeader.split(" ")[1];
    //         jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, async (err, decoded) => {
    //             if (err) {
    //                 return res.status(403).json("Token is not valid!");
    //             }
    //             let user = await userRepo.findOneBy({id: decoded.id});
    //             if (!user) {
    //                 return res.status(401).json({message: 'Unauthorized!'});
    //             }
    //             req.user = user;
    //             next();
    //         });
    //     } else {
    //         res.status(401).json("You are not authenticated!");
    //     }
    // }
    static refreshToken(req, res) {
        const refreshToken = req.body.token;
        if (!refreshToken)
            return res.status(401).json("You are not authenticated!");
        jsonwebtoken_1.default.verify(refreshToken, `${process.env.JWT_REFRESH_KEY}`, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json("Refresh token is not valid!");
            }
            let user = yield userRepo.findOneBy({ id: decoded.id });
            if (user.refreshToken === refreshToken) {
                let payload = {
                    id: user.id,
                    username: user.username,
                };
                const newAccessToken = base_controller_1.default.generateAccessToken(payload);
                const newRefreshToken = base_controller_1.default.generateRefreshToken(payload);
                user.refreshToken = newRefreshToken;
                yield userRepo.save(user);
                res.status(200).json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                });
            }
            else {
                return res.status(403).json("Refresh token is not valid!");
            }
        }));
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middlewares.js.map