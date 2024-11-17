import dataSource from "../database/data-source";
import ContractAttachmentService from "../services/contractAttachment.services"
const path = require('path');
import { Multer } from 'multer';
import { ContractAttachment } from "../models/contract_attachment.entity";
let contractAttachmentRepo = dataSource.getRepository(ContractAttachment)


class contractAttachmentController {
    async addContractAttachment(req, res) {
        try {
            const addContractAttachment = {
                id : req.body.id,
                filePath :req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null,
                contract : req.body.contract,
                fileName :req.body.fileName,
                fileType : req.body.fileType,
                uploadedBy : req.body.uploadedBy,
                attachmentPurpose : req.body.attachmentPurpose
            }
            const contractAttachment = await contractAttachmentRepo.save(addContractAttachment)
            res.status(200).json({
                success: true,
                contractAttachment
            });
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    }
    async listContractAttachment() {

    }



}

export default contractAttachmentController;