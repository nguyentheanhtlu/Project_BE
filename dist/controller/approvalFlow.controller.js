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
const approvalFlow_services_1 = __importDefault(require("../services/approvalFlow.services"));
class ApprovalFlowController {
    addApprovalFlow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let contract = req.body.contract;
                const existingFlows = yield approvalFlow_services_1.default.findByContract(contract);
                let nextStepNumber = 1; // Mặc định là 1 nếu chưa có flow nào
                if (existingFlows && existingFlows.length > 0) {
                    const maxStep = Math.max(...existingFlows.map(flow => flow.stepNumber));
                    nextStepNumber = maxStep + 1;
                }
                let id = req.body.id;
                let stepNumber = nextStepNumber;
                let approver = req.body.approver;
                let action = req.body.action;
                let actionSource = req.body.actionSource;
                let approvalStatus = req.body.approvalStatus;
                let comments = req.body.comments;
                const approvalFlow = yield approvalFlow_services_1.default.addApprovalFlow(id, contract, stepNumber, approver, action, actionSource, approvalStatus, comments);
                res.status(200).json(approvalFlow);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    updateApprovalFlow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.id;
                let contract = req.body.contract;
                let stepNumber = req.body.stepNumber;
                let approver = req.body.approver;
                let action = req.body.action;
                let actionSource = req.body.actionSource;
                let approvalStatus = req.body.approvalStatus;
                let comments = req.body.comments;
                const approvalFlow = yield approvalFlow_services_1.default.updateApprovalFlow(id, contract, stepNumber, approver, action, actionSource, approvalStatus, comments);
                res.status(200).json(approvalFlow);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    detailApprovalFlow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.id;
                const approvalFlow = yield approvalFlow_services_1.default.detailApprovalFlow(id);
                res.status(200).json(approvalFlow);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    listApprovalFlow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const approvalFlow = yield approvalFlow_services_1.default.listApprovalFlow();
            res.status(200).json(approvalFlow);
        });
    }
}
exports.default = ApprovalFlowController;
//# sourceMappingURL=approvalFlow.controller.js.map