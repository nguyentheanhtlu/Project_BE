"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../database/data-source"));
const contract_services_1 = __importDefault(require("../services/contract.services"));
const user_entity_1 = require("../models/user.entity");
let userRepo = data_source_1.default.getRepository(user_entity_1.User);
class contractController {
    createContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerUser = yield userRepo.findOneBy({ id: req.body.customer });
                let id = req.body.id;
                let contractNumber = req.body.contractNumber;
                let customer = customerUser;
                let contractType = req.body.contractType;
                let createdBy = req.user.id;
                let signersCount = req.body.signersCount;
                let status = req.body.status;
                let note = req.body.note;
                let contract = yield contract_services_1.default.addContract(id, contractNumber, customer, contractType, createdBy, signersCount, status, note);
                res.status(200).json(contract);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
}
exports.default = contractController;
//# sourceMappingURL=contract.controller.js.map