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
const contract_entity_1 = require("../models/contract.entity");
let contractRepo = data_source_1.default.getRepository(contract_entity_1.Contract);
class contractService {
    static addContract(id, contractNumber, customer, contractType, createdBy, signersCount, status, note) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = new contract_entity_1.Contract();
            contract.id = id;
            contract.contractNumber = contractNumber;
            contract.customer = customer;
            contract.contractType = contractType;
            contract.createdBy = createdBy;
            contract.signersCount = signersCount;
            contract.status = status;
            contract.note = note;
            yield contractRepo.save(contract);
            return contract;
        });
    }
    static updateContract(id, contractNumber, customer, contractType, createdBy, signersCount, status, note) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = yield contractRepo.findOneBy({ id: id });
            contract.contractNumber = contractNumber;
            contract.customer = customer;
            contract.contractType = contractType;
            contract.createdBy = createdBy;
            contract.signersCount = signersCount;
            contract.status = status;
            contract.note = note;
            yield contractRepo.save(contract);
        });
    }
    static allContracts() {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = yield contractRepo.find({
                relations: ["customer", "createdBy"]
            });
            return contract;
        });
    }
    static getDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = yield contractRepo.findOne({
                relations: ["customer", "createdBy"],
                where: { id: id }
            });
            return contract;
        });
    }
}
exports.default = contractService;
//# sourceMappingURL=contract.services.js.map