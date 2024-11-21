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
const contract_attachment_entity_1 = require("../models/contract_attachment.entity");
let contractAttachmentRepo = data_source_1.default.getRepository(contract_attachment_entity_1.ContractAttachment);
class ContractAttachmentService {
    static addContractAttachment(id, contract, fileName, filePath, fileType, uploadedBy, attachmentPurpose) {
        return __awaiter(this, void 0, void 0, function* () {
            let contractAttachment = new contract_attachment_entity_1.ContractAttachment();
            contractAttachment.id = id;
            contractAttachment.contract = contract;
            contractAttachment.fileName = fileName;
            contractAttachment.filePath = filePath;
            contractAttachment.fileType = fileType;
            contractAttachment.uploadedBy = uploadedBy;
            contractAttachment.attachmentPurpose = attachmentPurpose;
            yield contractAttachmentRepo.save(contractAttachment);
            return contractAttachment;
        });
    }
    static updateContractAttachment(id, contract, fileName, filePath, fileType, uploadedBy, attachmentPurpose) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractAttachment = yield contractAttachmentRepo.findOneBy({ id: id });
            contractAttachment.contract = contract;
            contractAttachment.fileName = fileName;
            contractAttachment.filePath = filePath;
            contractAttachment.fileType = fileType;
            contractAttachment.uploadedBy = uploadedBy;
            contractAttachment.attachmentPurpose = attachmentPurpose;
            yield contractAttachmentRepo.save(contractAttachment);
        });
    }
    static listContractAttachment() {
        return __awaiter(this, void 0, void 0, function* () {
            const contractAttachment = yield contractAttachmentRepo.find({
                relations: ["contract", "uploadedBy"]
            });
            return contractAttachment;
        });
    }
    static detailContractAttachment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractAttachment = yield contractAttachmentRepo.findOne({
                relations: ["contract", "uploadedBy"],
                where: { id: id }
            });
            return contractAttachment;
        });
    }
}
exports.default = ContractAttachmentService;
//# sourceMappingURL=contractAttachment.services.js.map