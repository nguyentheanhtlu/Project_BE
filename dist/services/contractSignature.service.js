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
const contract_signature_entity_1 = require("./../models/contract_signature.entity");
const data_source_1 = __importDefault(require("../database/data-source"));
let contractSignatureRepo = data_source_1.default.getRepository(contract_signature_entity_1.ContractSignature);
class ContractSignatureService {
    static addContractSignature(id, contract, signer, signedAt, status, signatureImagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let contractSignature = new contract_signature_entity_1.ContractSignature();
            contractSignature.id = id;
            contractSignature.contract = contract;
            contractSignature.signer = signer;
            contractSignature.signedAt = signedAt;
            contractSignature.signatureImagePath = signatureImagePath;
            yield contractSignatureRepo.save(contractSignature);
            return contractSignature;
        });
    }
}
exports.default = ContractSignatureService;
//# sourceMappingURL=contractSignature.service.js.map