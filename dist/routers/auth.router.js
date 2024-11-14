"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import AuthMiddleware from "../middlewares/auth.middlewares";
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
require('dotenv').config();
const AuthRouter = express_1.default.Router();
AuthRouter.post('/register', auth_controller_1.default.register);
AuthRouter.post('/login', auth_controller_1.default.login);
// AuthRouter.post('/refresh', AuthMiddleware.refreshToken);
// AuthRouter.get('/logout', AuthMiddleware.checkAuthentication, AuthController.logout);
// AuthRouter.post('/change-password', AuthMiddleware.checkAuthentication, AuthController.changePassword);
// AuthRouter.post('/login/google', AuthController.loginWithGoogle);
// AuthRouter.post('/verify', AuthController.verifyEmail);
// AuthRouter.post('/forgot-password', AuthController.forgotPassword);
// AuthRouter.post('/reset-password', AuthController.resetPassword);
exports.default = AuthRouter;
//# sourceMappingURL=auth.router.js.map