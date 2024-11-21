import ContractSignatureService from "../services/contractSignature.service";

const path = require('path');

class contractSignatureController {
    async addContractSignature(req, res) {
       try{
        let id = req.body.id
        let contract = req.body.contract
        let signer = req.body.signer
        let signedAt = req.body.signedAt
        let status = req.body.status
        let signatureImagePath = req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null
        const contractSignature = await ContractSignatureService.addContractSignature(id, contract , signer  , signedAt , status , signatureImagePath)
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
            const contractSignature = await ContractSignatureService.addContractSignature(id, contract , signer  , signedAt , status , signatureImagePath)
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



}

export default contractSignatureController;