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
const user_signature_entity_1 = require("../models/user_signature.entity");
const data_source_1 = __importDefault(require("../database/data-source"));
let userSignatureRepo = data_source_1.default.getRepository(user_signature_entity_1.UserSignature);
class UserSignatureService {
    static addUserSignature(id, user, signatureImagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let userSignature = new user_signature_entity_1.UserSignature();
            userSignature.id = id;
            userSignature.user = user;
            userSignature.signatureImagePath = signatureImagePath;
            yield userSignatureRepo.save(userSignature);
            return userSignature;
        });
    }
    static updateUserSignature(id, user, signatureImagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSignature = yield userSignatureRepo.findOneBy({ id: id });
            userSignature.id = id;
            userSignature.user = user;
            userSignature.signatureImagePath = signatureImagePath;
            yield userSignatureRepo.save(userSignature);
        });
    }
    static listUserSignature() {
        return __awaiter(this, void 0, void 0, function* () {
            const userSignature = yield userSignatureRepo.find({
                relations: ["user"]
            });
            return userSignature;
        });
    }
    static detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSignature = yield userSignatureRepo.findOne({
                relations: ["user"],
                where: { id: id }
            });
            return userSignature;
        });
    }
}
exports.default = UserSignatureService;
//# sourceMappingURL=userSignature.services.js.map