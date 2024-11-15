import dataSource from "../database/data-source";
import contractService from "../services/contract.services";
import { User } from "../models/user.entity";
let userRepo = dataSource.getRepository(User)
class contractController {
    async createContract(req, res) {
        try{
        const customerUser =  await userRepo.findOneBy({id : req.body.customer})
        let id = req.body.id;
        let contractNumber = req.body.contractNumber;
        let customer = customerUser
        let contractType = req.body.contractType
        let createdBy = req.user.id
        let signersCount = req.body.signersCount
        let status = req.body.status
        let note = req.body.note
        
        let contract = await contractService.addContract(id, contractNumber, customer, contractType, createdBy, signersCount, status,note)
        res.status(200).json(contract);
        }
        catch(e){
            res.status(404).json({ message: e.message });
        }


    }

}

export default contractController;