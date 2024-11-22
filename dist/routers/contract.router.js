"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contract_controller_1 = __importDefault(require("../controller/contract.controller"));
const express_1 = __importDefault(require("express"));
const ContractRouter = express_1.default.Router();
const contractController = new contract_controller_1.default();
ContractRouter.post("/addContract", contractController.createContract);
ContractRouter.post("/", contractController.allContract);
ContractRouter.post("/detail", contractController.getDetails);
ContractRouter.post("/update", contractController.updateContract);
ContractRouter.post("/success", contractController.successContract);
ContractRouter.post("/bulk-delete", contractController.deleteMultipleContracts);
ContractRouter.post("/rejected-contract", contractController.rejectMultipleContracts);
ContractRouter.get("/search", contractController.searchContracts);
ContractRouter.post("/count", contractController.countContractsByStatus);
exports.default = ContractRouter;
//# sourceMappingURL=contract.router.js.map