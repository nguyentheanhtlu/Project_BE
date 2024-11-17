import dataSource from "../database/data-source";
import contractService from "../services/contract.services";
import { User } from "../models/user.entity";
let userRepo = dataSource.getRepository(User)
class contractController {
    async createContract(req, res) {
        try{
        let id = req.body.id;
        let contractNumber = req.body.contractNumber;
        let customer = req.body.customer;
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
    async updateContract ( req, res) {
        try{
            let id = req.body.id;
            let contractNumber = req.body.contractNumber;
            let customer = req.body.customer;
            let contractType = req.body.contractType
            let createdBy = req.user.id
            let signersCount = req.body.signersCount
            let status = req.body.status
            let note = req.body.note
            let contract = await contractService.updateContract(id, contractNumber, customer, contractType, createdBy, signersCount, status,note)
            res.status(200).json(contract);
            }
            catch(e){
                res.status(404).json({ message: e.message });
            }
    }

    async allContract(req, res) {
        try {
            const contracts = await contractService.allContracts();
            res.status(200).json(contracts);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }

    }

    async getDetails(req , res) {
        try {
            let idContract = req.body.id
            const contracts = await contractService.getDetail(idContract);
            res.status(200).json(contracts);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    } 

}

export default contractController;