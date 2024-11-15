import ContractController from '../controller/contract.controller';
import express, {Router} from 'express';

const ContractRouter: Router = express.Router();

const contractController = new ContractController();

ContractRouter.post("/addContract", contractController.createContract);


export default ContractRouter;