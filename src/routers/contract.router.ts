import ContractController from '../controller/contract.controller';
import express, {Router} from 'express';

const ContractRouter: Router = express.Router();

const contractController = new ContractController();

ContractRouter.post("/addContract", contractController.createContract);
ContractRouter.post("/", contractController.allContract);
ContractRouter.post("/detail", contractController.getDetails);
ContractRouter.post("/update", contractController.updateContract);
ContractRouter.post("/success", contractController.successContract);
ContractRouter.post("/bulk-delete", contractController.deleteMultipleContracts);
ContractRouter.post("/rejected-contract", contractController.rejectMultipleContracts);
ContractRouter.get("/search", contractController.searchContracts)
ContractRouter.post("/count", contractController.countContractsByStatus);


export default ContractRouter;