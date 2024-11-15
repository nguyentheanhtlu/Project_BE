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
exports.default = ContractRouter;
//# sourceMappingURL=contract.router.js.map