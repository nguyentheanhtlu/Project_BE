import ApprovalFlowServices from "../services/approvalFlow.services"

class ApprovalFlowController {


    async addApprovalFlow(req, res) {
        try {
            let contract = req.body.contract;
            
            const existingFlows = await ApprovalFlowServices.findByContract(contract);
            
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
    
            const approvalFlow = await ApprovalFlowServices.addApprovalFlow(
                id,
                contract,
                stepNumber,
                approver,
                action,
                actionSource,
                approvalStatus,
                comments
            );
            
            res.status(200).json(approvalFlow);
        } catch(e) {
            res.status(404).json({ message: e.message });
        }
    }
    async updateApprovalFlow(req, res) {
        try{
            let id = req.body.id
            let contract = req.body.contract
            let stepNumber = req.body.stepNumber
            let approver = req.body.approver
            let action = req.body.action
            let actionSource = req.body.actionSource
            let approvalStatus = req.body.approvalStatus
            let comments = req.body.comments
            const approvalFlow = await ApprovalFlowServices.updateApprovalFlow(id ,contract  ,stepNumber ,approver ,action ,actionSource , approvalStatus , comments )
            res.status(200).json(approvalFlow)
           }
           catch(e) {
            res.status(404).json({ message: e.message });
           }
    }

    async detailApprovalFlow (req, res) {
        try {
            let id = req.body.id
            const approvalFlow = await ApprovalFlowServices.detailApprovalFlow(id);
            res.status(200).json(approvalFlow);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }

    }
    async listApprovalFlow (req, res) {
        const approvalFlow = await ApprovalFlowServices.listApprovalFlow()
        res.status(200).json(approvalFlow);
    }


}

export default ApprovalFlowController