import { User } from "../models/user.entity";
import dataSource from "../database/data-source";
import { Contract } from "../models/contract.entity";

let contractRepo = dataSource.getRepository(Contract)

class contractService {
 

    static async addContract(id : any, contractNumber : any,customer : any,contractType: any, createdBy : User,signersCount : any,status : any,note : any) : Promise<any> {
        let contract = new Contract()
        contract.id = id
        contract.contractNumber = contractNumber
        contract.customer = customer
        contract.contractType = contractType
        contract.createdBy = createdBy
        contract.signersCount = signersCount
        contract.status = status
        contract.note = note
        await contractRepo.save(contract)
        return contract
    }




}

export default contractService;