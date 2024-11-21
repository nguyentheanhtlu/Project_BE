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
            contractSignature.status = status;
            contractSignature.signatureImagePath = signatureImagePath;
            yield contractSignatureRepo.save(contractSignature);
            return contractSignature;
        });
    }
    static updateContractSignature(id, contract, signer, signedAt, status, signatureImagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractSignature = yield contractSignatureRepo.findOneBy({ id: id });
            contractSignature.contract = contract;
            contractSignature.signer = signer;
            contractSignature.status = status;
            contractSignature.signedAt = signedAt;
            contractSignature.signatureImagePath = signatureImagePath;
            yield contractSignatureRepo.save(contractSignature);
            return contractSignature;
        });
    }
    static listContractSignature() {
        return __awaiter(this, void 0, void 0, function* () {
            const contractSignature = yield contractSignatureRepo.find({
                relations: ["contract", "signer"]
            });
            return contractSignature;
        });
    }
    static detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractSignature = yield contractSignatureRepo.findOne({
                relations: ["contract", "signer"],
                where: { id: id }
            });
            return contractSignature;
        });
    }
    static findByContract(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractSignatures = yield contractSignatureRepo.find({
                where: {
                    contract: {
                        id: contractId
                    }
                },
                relations: ['contract', 'signer']
            });
            return contractSignatures;
        });
    }
}
exports.default = ContractSignatureService;
//# sourceMappingURL=contractSignature.service.js.map