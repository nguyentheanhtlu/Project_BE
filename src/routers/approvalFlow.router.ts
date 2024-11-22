import express, {Router} from 'express';
import ApprovalFlowController from '../controller/approvalFlow.controller';

const ApprovalFlowRouter: Router = express.Router();

const approvalFlowController = new ApprovalFlowController();

ApprovalFlowRouter.post("/add", approvalFlowController.addApprovalFlow);
ApprovalFlowRouter.post("/", approvalFlowController.listApprovalFlow);
ApprovalFlowRouter.post("/detail", approvalFlowController.detailApprovalFlow);
ApprovalFlowRouter.post("/update" , approvalFlowController.updateApprovalFlow )


export default ApprovalFlowRouter;