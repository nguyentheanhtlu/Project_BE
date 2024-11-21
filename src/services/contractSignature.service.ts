import { ContractSignature } from './../models/contract_signature.entity';
import { Contract } from "../models/contract.entity";
import { User } from "../models/user.entity";
import dataSource from '../database/data-source';

let contractSignatureRepo = dataSource.getRepository(ContractSignature)

class  ContractSignatureService {

    static async addContractSignature (id, contract : Contract, signer : User , signedAt , status , signatureImagePath ) {
        let contractSignature = new ContractSignature()
        contractSignature.id = id
        contractSignature.contract = contract
        contractSignature.signer = signer
        contractSignature.signedAt = signedAt
        contractSignature.status = status
        contractSignature.signatureImagePath = signatureImagePath
        await contractSignatureRepo.save(contractSignature)
        return contractSignature;
    }

    static async updateContractSignature(id, contract : Contract, signer : User , signedAt , status , signatureImagePath) {
        const contractSignature = await contractSignatureRepo.findOneBy({id : id})
        contractSignature.contract = contract
        contractSignature.signer = signer
        contractSignature.status = status
        contractSignature.signedAt = signedAt
        contractSignature.signatureImagePath = signatureImagePath
        await contractSignatureRepo.save(contractSignature)
        return contractSignature;
    }

    static async listContractSignature () {
        const contractSignature = await contractSignatureRepo.find(
            {
                relations: ["contract", "signer"]
            }
        )
        return contractSignature;
    }
    static async detail (id) {
        const contractSignature = await contractSignatureRepo.findOne(
            {
                relations: ["contract", "signer"],
                where : {id : id}
            }
        )
        return contractSignature;
    }
    static async findByContract(contractId) {
        const contractSignatures = await contractSignatureRepo.find({
            where: {
                contract: {
                    id: contractId
                }
            },
            relations: ['contract', 'signer'] 
        });
        
        return contractSignatures;
    }
}

export default ContractSignatureService;