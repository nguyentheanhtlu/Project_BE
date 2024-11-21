import { ApprovalFlow } from './../models/approval_flow.entity';
import dataSource from "../database/data-source";
import { Contract } from "../models/contract.entity";
import { User } from "../models/user.entity";

let approvalFlowRepo = dataSource.getRepository(ApprovalFlow)

class ApprovalFlowServices {

    static async findByContract(contract) {
        const flows = await approvalFlowRepo.find({
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
    }
    
    static async addApprovalFlow(id, contract, stepNumber, approver, action, actionSource, approvalStatus, comments) {
        const existingFlowWithStep = await approvalFlowRepo.findOne({
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
    
        const approvalFlow = new ApprovalFlow();
        approvalFlow.id = id;
        approvalFlow.contract = contract;
        approvalFlow.stepNumber = stepNumber;
        approvalFlow.approver = approver;
        approvalFlow.action = action;
        approvalFlow.actionSource = actionSource;
        approvalFlow.approvalStatus = approvalStatus;
        approvalFlow.comments = comments;
    
        await approvalFlowRepo.save(approvalFlow);
        return approvalFlow;
    }

    static async updateApprovalFlow (id ,contract : Contract ,stepNumber ,approver : User ,action ,actionSource , approvalStatus , comments) {
        const approvalFlow = await approvalFlowRepo.findOneBy( {id : id})
        approvalFlow.contract = contract 
        approvalFlow.stepNumber = stepNumber
        approvalFlow.approver = approver
        approvalFlow.action = action
        approvalFlow.actionSource = actionSource
        approvalFlow.approvalStatus = approvalStatus
        approvalFlow.comments = comments
        await approvalFlowRepo.save(approvalFlow)
        return approvalFlow;
    }

    static async listApprovalFlow () {
        const approvalFlow = await approvalFlowRepo.find(
            {
                relations: ["contract", "approver"]
            }
        )
        return approvalFlow;
    }

    static async detailApprovalFlow (id) {
        const approvalFlow = await approvalFlowRepo.findOne(
            {
                relations: ["contract", "approver"],
                where : {id : id}
            }
        )
        return approvalFlow;


    }


}

export default ApprovalFlowServices;