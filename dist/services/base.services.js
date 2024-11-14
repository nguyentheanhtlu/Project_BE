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
const user_entity_1 = require("../models/user.entity");
const data_source_1 = __importDefault(require("../database/data-source"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let userRepo = data_source_1.default.getRepository(user_entity_1.User);
class BaseServices {
    // static async validateEmail(email: string): Promise<void> {
    //     if (!email) {
    //         throw new Error("Email is required");
    //     }
    //     let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     let isValidEmail = regEmail.test(email);
    //     if (!isValidEmail) {
    //         throw new Error("Invalid email");
    //     }
    //     let user = await User.getUserByEmail(email);
    //     if (user) {
    //         throw new Error("Email already exists");
    //     }
    // }
    static validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password) {
                throw new Error("Password is required");
            }
        });
    }
    static getRandomString() {
        let randomString = '';
        for (let i = 0; i < 10; i++) {
            randomString += Math.floor(Math.random() * 10).toString();
        }
        return randomString;
    }
    static generateAccessToken(user) {
        let { id, email, username } = user;
        let payload = { id, email, username };
        return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "15m" });
    }
    static generateRefreshToken(user) {
        let { id, email, username } = user;
        let payload = { id, email, username };
        return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_REFRESH_KEY}`);
    }
    ;
    static generateTokenFromString(email) {
        return jsonwebtoken_1.default.sign(email, `${process.env.JWT_REFRESH_KEY}`);
    }
}
exports.default = BaseServices;
//# sourceMappingURL=base.services.js.map