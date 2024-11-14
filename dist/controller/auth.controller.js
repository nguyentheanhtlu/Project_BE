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
const base_controller_1 = __importDefault(require("./base.controller"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
const user_entity_1 = require("../models/user.entity");
const data_source_1 = __importDefault(require("../database/data-source"));
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_middlewares_1 = __importDefault(require("../middlewares/jwt.middlewares"));
let userRepo = data_source_1.default.getRepository(user_entity_1.User);
class AuthController extends base_controller_1.default {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, passwordHash, email, code, fullName, idNumber } = req.body;
                const user = yield userRepo.findOne({
                    where: [{ email }, { username }],
                });
                if (user) {
                    if (user.username === username) {
                        return next((0, http_errors_1.default)(401, "Username already exists"));
                    }
                    return next((0, http_errors_1.default)(401, "Email already exists"));
                }
                let password = yield bcrypt_1.default.hash(passwordHash, 10);
                const newUser = yield userRepo.save({
                    code: code,
                    idNumber: idNumber,
                    fullName: fullName,
                    email: email,
                    username: username,
                    passwordHash: password,
                });
                const accessToken = yield jwt_middlewares_1.default.signAccessToken(newUser);
                res.status(200).json({
                    message: "created successfully",
                    newUser,
                    accessToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { username, passwordHash } = req.body;
                let [accessToken, refreshToken] = yield auth_services_1.default.checkAuthAndGenerateTokens(username, passwordHash);
                res.status(200).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                });
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map