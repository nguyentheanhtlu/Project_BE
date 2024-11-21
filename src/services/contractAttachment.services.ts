import { Contract } from "../models/contract.entity";
import dataSource from "../database/data-source";
import { ContractAttachment } from "../models/contract_attachment.entity";
import { User } from "../models/user.entity";

let contractAttachmentRepo = dataSource.getRepository(ContractAttachment)

class ContractAttachmentService {

    static async addContractAttachment (id , contract : Contract , fileName , filePath , fileType , uploadedBy: User , attachmentPurpose) {

        let contractAttachment = new ContractAttachment()
        contractAttachment.id = id
        contractAttachment.contract = contract
        contractAttachment.fileName = fileName
        contractAttachment.filePath = filePath
        contractAttachment.fileType = fileType
        contractAttachment.uploadedBy = uploadedBy
        contractAttachment.attachmentPurpose = attachmentPurpose
        await contractAttachmentRepo.save(contractAttachment)
        return contractAttachment;
    }
    static async updateContractAttachment(id , contract : Contract , fileName , filePath , fileType , uploadedBy: User , attachmentPurpose) {
        const contractAttachment = await contractAttachmentRepo.findOneBy({id : id})
        contractAttachment.contract = contract
        contractAttachment.fileName = fileName
        contractAttachment.filePath = filePath
        contractAttachment.fileType = fileType
        contractAttachment.uploadedBy = uploadedBy
        contractAttachment.attachmentPurpose = attachmentPurpose
        await contractAttachmentRepo.save(contractAttachment)
    }
    static async listContractAttachment () {
        const contractAttachment = await contractAttachmentRepo.find(
            {
                relations: ["contract", "uploadedBy"]
            }
        )
        return contractAttachment;
    }
    static async detailContractAttachment (id)  {
        const contractAttachment = await contractAttachmentRepo.findOne ({
            relations: ["contract", "uploadedBy"] ,
            where : {id : id}

        })
        return contractAttachment;

    }
    
}

export default ContractAttachmentService;
