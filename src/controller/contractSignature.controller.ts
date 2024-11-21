import dataSource from "../database/data-source";
import ContractSignatureService from "../services/contractSignature.service";
import { User } from "../models/user.entity";

const path = require('path');

let userRepo = dataSource.getRepository(User)

class contractSignatureController {
    async addContractSignature(req, res) {
        try{
         let id = req.body.id
         let contract = req.body.contract
         let signer = req.body.signer
         let signedAt = req.body.signedAt
         let status = req.body.status
 
         const user = await userRepo.findOne({
             where: { id: signer }
         });
 
         if (!user) {
             return res.status(400).json({ 
                 message: "Invalid signer ID. User does not exist" 
             });
         }

         let signatureImagePath = req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null
         const contractSignature = await ContractSignatureService.addContractSignature(
             id, 
             contract, 
             signer,  
             signedAt, 
             status, 
             signatureImagePath
         )
         res.status(200).json(contractSignature);
        }
        catch(e) {
             res.status(404).json({ message: e.message });
        }
     }

    async updateContractSignature (req, res) {
        try{
            let id = req.body.id
            let contract = req.body.contract
            let signer = req.body.signer
            let signedAt = req.body.signedAt
            let status = req.body.status
            let signatureImagePath = req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null
            const contractSignature = await ContractSignatureService.updateContractSignature(id, contract , signer  , signedAt , status , signatureImagePath)
            res.status(200).json(contractSignature);            
           }
           catch(e) {
                res.status(404).json({ message: e.message });
           }
    }
    async listContractSignature (req, res) {  
        const contractSignature = await ContractSignatureService.listContractSignature()
        res.status(200).json(contractSignature);
    }

    async getDetail (req, res) {
        try {
            let id = req.body.id
            const contracts = await ContractSignatureService.detail(id);
            res.status(200).json(contracts);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    }
    async findByContract(req, res) {
        try {
            let contractId = req.body.contractId 
            
            const contractSignatures = await ContractSignatureService.findByContract(contractId);
            
            if (!contractSignatures || contractSignatures.length === 0) {
                return res.status(404).json({ 
                    message: "No contract signatures found for this contract" 
                });
            }
            
            res.status(200).json(contractSignatures);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    }



}

export default contractSignatureController;