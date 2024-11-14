"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
class BaseController {
    static getRandomString() {
        let randomString = '';
        for (let i = 0; i < 10; i++) {
            randomString += Math.floor(Math.random() * 10).toString();
        }
        return randomString;
    }
    static generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "1y" });
    }
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_REFRESH_KEY}`);
    }
    ;
}
BaseController.defaultErrorMessage = "Something is wrong!";
exports.default = BaseController;
//# sourceMappingURL=base.controller.js.map