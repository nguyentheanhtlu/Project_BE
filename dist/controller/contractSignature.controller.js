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
const contractSignature_service_1 = __importDefault(require("../services/contractSignature.service"));
const user_entity_1 = require("../models/user.entity");
const path = require('path');
let userRepo = data_source_1.default.getRepository(user_entity_1.User);
class contractSignatureController {
    addContractSignature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.id;
                let contract = req.body.contract;
                let signer = req.body.signer;
                let signedAt = req.body.signedAt;
                let status = req.body.status;
                const user = yield userRepo.findOne({
                    where: { id: signer }
                });
                if (!user) {
                    return res.status(400).json({
                        message: "Invalid signer ID. User does not exist"
                    });
                }
                let signatureImagePath = req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null;
                const contractSignature = yield contractSignature_service_1.default.addContractSignature(id, contract, signer, signedAt, status, signatureImagePath);
                res.status(200).json(contractSignature);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    updateContractSignature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.id;
                let contract = req.body.contract;
                let signer = req.body.signer;
                let signedAt = req.body.signedAt;
                let status = req.body.status;
                let signatureImagePath = req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null;
                const contractSignature = yield contractSignature_service_1.default.updateContractSignature(id, contract, signer, signedAt, status, signatureImagePath);
                res.status(200).json(contractSignature);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    listContractSignature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractSignature = yield contractSignature_service_1.default.listContractSignature();
            res.status(200).json(contractSignature);
        });
    }
    getDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.id;
                const contracts = yield contractSignature_service_1.default.detail(id);
                res.status(200).json(contracts);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    findByContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let contractId = req.body.contractId;
                const contractSignatures = yield contractSignature_service_1.default.findByContract(contractId);
                if (!contractSignatures || contractSignatures.length === 0) {
                    return res.status(404).json({
                        message: "No contract signatures found for this contract"
                    });
                }
                res.status(200).json(contractSignatures);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
}
exports.default = contractSignatureController;
//# sourceMappingURL=contractSignature.controller.js.map