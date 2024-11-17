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
const userSignature_services_1 = __importDefault(require("../services/userSignature.services"));
const path = require('path');
class userSignatureController {
    addUserSignature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.id;
                let user = req.body.user;
                let signatureImagePath = req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null;
                let userSignature = yield userSignature_services_1.default.addUserSignature(id, user, signatureImagePath);
                res.status(200).json(userSignature);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            let userSignature = yield userSignature_services_1.default.listUserSignature();
            return userSignature;
        });
    }
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.id;
                let userSignature = yield userSignature_services_1.default.detail(id);
                res.status(200).json(userSignature);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
}
exports.default = userSignatureController;
//# sourceMappingURL=userSignature.controller.js.map