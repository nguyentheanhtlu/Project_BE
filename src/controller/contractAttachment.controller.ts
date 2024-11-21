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
    async updateContractAttachment (req, res) {
        try {
           let id = req.body.id
            let filePath = req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null
            let contract = req.body.contract
            let fileName =req.body.fileName
            let fileType = req.body.fileType
            let uploadedBy = req.body.uploadedBy
            let attachmentPurpose = req.body.attachmentPurpose
            const contractAttachment = await ContractAttachmentService.updateContractAttachment(id , contract  , fileName , filePath , fileType , uploadedBy, attachmentPurpose)
            res.status(200).json({
                success: true,
                contractAttachment
            });
        } catch (e) {
            res.status(404).json({ message: e.message });
        }

    }
    async listContractAttachment(req, res) {
        const contractAttachment = await ContractAttachmentService.listContractAttachment()
        res.status(200).json(contractAttachment);
    }

    async getDetails (req, res) {
        try {
            let id = req.body.id
            const contracts = await ContractAttachmentService.detailContractAttachment(id);
            res.status(200).json(contracts);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    }



}

export default contractAttachmentController;