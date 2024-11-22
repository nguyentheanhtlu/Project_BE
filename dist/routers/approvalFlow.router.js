"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const approvalFlow_controller_1 = __importDefault(require("../controller/approvalFlow.controller"));
const ApprovalFlowRouter = express_1.default.Router();
const approvalFlowController = new approvalFlow_controller_1.default();
ApprovalFlowRouter.post("/add", approvalFlowController.addApprovalFlow);
ApprovalFlowRouter.post("/", approvalFlowController.listApprovalFlow);
ApprovalFlowRouter.post("/detail", approvalFlowController.detailApprovalFlow);
ApprovalFlowRouter.post("/update", approvalFlowController.updateApprovalFlow);
exports.default = ApprovalFlowRouter;
//# sourceMappingURL=approvalFlow.router.js.map