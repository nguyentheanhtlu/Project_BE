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
const approval_flow_entity_1 = require("./../models/approval_flow.entity");
const data_source_1 = __importDefault(require("../database/data-source"));
let approvalFlowRepo = data_source_1.default.getRepository(approval_flow_entity_1.ApprovalFlow);
class ApprovalFlowServices {
    static findByContract(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const flows = yield approvalFlowRepo.find({
                where: {
                    contract: {
                        id: contract.id
                    }
                },
                order: {
                    stepNumber: 'ASC'
                }
            });
            return flows;
        });
    }
    static addApprovalFlow(id, contract, stepNumber, approver, action, actionSource, approvalStatus, comments) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingFlowWithStep = yield approvalFlowRepo.findOne({
                where: {
                    contract: {
                        id: contract.id
                    },
                    stepNumber: stepNumber
                }
            });
            if (existingFlowWithStep) {
                throw new Error(`Approval flow with step number ${stepNumber} already exists for this contract`);
            }
            const approvalFlow = new approval_flow_entity_1.ApprovalFlow();
            approvalFlow.id = id;
            approvalFlow.contract = contract;
            approvalFlow.stepNumber = stepNumber;
            approvalFlow.approver = approver;
            approvalFlow.action = action;
            approvalFlow.actionSource = actionSource;
            approvalFlow.approvalStatus = approvalStatus;
            approvalFlow.comments = comments;
            yield approvalFlowRepo.save(approvalFlow);
            return approvalFlow;
        });
    }
    static updateApprovalFlow(id, contract, stepNumber, approver, action, actionSource, approvalStatus, comments) {
        return __awaiter(this, void 0, void 0, function* () {
            const approvalFlow = yield approvalFlowRepo.findOneBy({ id: id });
            approvalFlow.contract = contract;
            approvalFlow.stepNumber = stepNumber;
            approvalFlow.approver = approver;
            approvalFlow.action = action;
            approvalFlow.actionSource = actionSource;
            approvalFlow.approvalStatus = approvalStatus;
            approvalFlow.comments = comments;
            yield approvalFlowRepo.save(approvalFlow);
            return approvalFlow;
        });
    }
    static listApprovalFlow() {
        return __awaiter(this, void 0, void 0, function* () {
            const approvalFlow = yield approvalFlowRepo.find({
                relations: ["contract", "approver"]
            });
            return approvalFlow;
        });
    }
    static detailApprovalFlow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const approvalFlow = yield approvalFlowRepo.findOne({
                relations: ["contract", "approver"],
                where: { id: id }
            });
            return approvalFlow;
        });
    }
}
exports.default = ApprovalFlowServices;
//# sourceMappingURL=approvalFlow.services.js.map