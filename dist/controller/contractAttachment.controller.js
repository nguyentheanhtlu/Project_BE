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
const path = require('path');
const contract_attachment_entity_1 = require("../models/contract_attachment.entity");
let contractAttachmentRepo = data_source_1.default.getRepository(contract_attachment_entity_1.ContractAttachment);
class contractAttachmentController {
    addContractAttachment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addContractAttachment = {
                    id: req.body.id,
                    filePath: req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null,
                    contract: req.body.contract,
                    fileName: req.body.fileName,
                    fileType: req.body.fileType,
                    uploadedBy: req.body.uploadedBy,
                    attachmentPurpose: req.body.attachmentPurpose
                };
                const contractAttachment = yield contractAttachmentRepo.save(addContractAttachment);
                res.status(200).json({
                    success: true,
                    contractAttachment
                });
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    listContractAttachment() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = contractAttachmentController;
//# sourceMappingURL=contractAttachment.controller.js.map