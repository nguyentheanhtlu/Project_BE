import dataSource from "../database/data-source";
import contractService from "../services/contract.services";
import { User } from "../models/user.entity";
import { ApprovalFlow } from "../models/approval_flow.entity";
import { ContractSignature } from "../models/contract_signature.entity";
import { Contract } from "../models/contract.entity";
let approvalFlowRepo = dataSource.getRepository(ApprovalFlow)
let contractSignatureRepo = dataSource.getRepository(ContractSignature)
let contractRepo = dataSource.getRepository(Contract)
let userRepo = dataSource.getRepository(User)

class contractController {
    async createContract(req, res) {
        try {
            let { id, contractNumber, customer, contractType, signersCount, status, note } = req.body;
            let createdBy = req.user.id;

            // Validate customer
            const customerUser = await userRepo.findOne({
                where: { id: customer, role: 'customer' }
            });

            if (!customerUser) {
                return res.status(400).json({ 
                    message: "Invalid customer ID. User must exist and have 'customer' role" 
                });
            }
            
            let contract = await contractService.addContract(
                id, 
                contractNumber, 
                customer, 
                contractType, 
                createdBy, 
                signersCount, 
                status,
                note
            );
            res.status(200).json(contract);
        }
        catch(e) {
            res.status(404).json({ message: e.message });
        }
    }
    async updateContract ( req, res) {
        try {
            const { id, contractNumber, customer, contractType, signersCount, status, note } = req.body;
            const createdBy = req.user.id;
            const contract = await contractService.updateContract(
                id, 
                contractNumber, 
                customer, 
                contractType, 
                createdBy, 
                signersCount, 
                status,
                note
            );
    
            res.status(200).json(contract);
        } catch(e) {
            res.status(404).json({ message: e.message });
        }
    }

    async allContract(req, res) {
        try {
            const contracts = await contractService.allContracts();
            res.status(200).json(contracts);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }

    }

    async getDetails(req , res) {
        try {
            let idContract = req.body.id
            const contracts = await contractService.getDetail(idContract);
            res.status(200).json(contracts);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    }
    async successContract (req, res) {
        const { id, status } = req.body;
        if (status === 'signed') {
            const approvalFlow = await approvalFlowRepo.find({
                where: { contract: { id }, approvalStatus: 'approved' }
            });

            const contractSignatures = await contractSignatureRepo.find({
                where: { contract: { id } , status : "signed" }
            });

            if (!approvalFlow && !contractSignatures) {
                return res.status(400).json({ 
                    message: "Cannot update contract status to signed. All approvals and signatures must be completed first." 
                });
            }
        }
        await contractRepo.update(id, { status: 'signed' });
            
        return res.status(200).json({ 
            message: "Contract status updated to signed successfully" 
        });
    }
    async deleteMultipleContracts(req, res) {
        try {
            const { ids } = req.body; // Nhận một mảng các id cần xóa

            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({
                    message: "Please provide an array of contract IDs to delete"
                });
            }

            await contractRepo.delete(ids);

            return res.status(200).json({
                message: `Successfully deleted ${ids.length} contracts`
            });
        } catch (e) {
            return res.status(500).json({
                message: e.message
            });
        }
    }
    async rejectMultipleContracts(req, res) {
        try {
            const { ids, note } = req.body;

            // Kiểm tra đầu vào
            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({
                    message: "Please provide an array of contract IDs to reject"
                });
            }

            if (!note || note.trim() === '') {
                return res.status(400).json({
                    message: "Note is required when rejecting contracts"
                });
            }

            // Cập nhật nhiều contracts
            await contractRepo.update(ids, {
                status: 'rejected',
                note: note
            });

            return res.status(200).json({
                message: `Successfully rejected ${ids.length} contracts`
            });
        } catch (e) {
            return res.status(500).json({
                message: e.message
            });
        }
    }
    async searchContracts(req, res) {
        try {
            const { 
                contractNumber, 
                customerInfo,    // Thông tin khách hàng (tên hoặc số điện thoại)
                creator,        // Người tạo
                status,         // Trạng thái hợp đồng
                fromDate,       // Từ ngày
                toDate         // Đến ngày
            } = req.query;
    
            const queryBuilder = contractRepo.createQueryBuilder('contract')
                .leftJoinAndSelect('contract.customer', 'customer')
                .leftJoinAndSelect('contract.createdBy', 'user');
    
            // Tìm theo số hợp đồng
            if (contractNumber) {
                queryBuilder.andWhere('contract.contractNumber LIKE :contractNumber', {
                    contractNumber: `%${contractNumber}%`
                });
            }
    
            // Tìm theo thông tin khách hàng
            if (customerInfo) {
                queryBuilder.andWhere(
                    '(customer.name LIKE :customerInfo OR customer.phone LIKE :customerInfo)', 
                    { customerInfo: `%${customerInfo}%` }
                );
            }
    
            // Tìm theo người tạo
            if (creator) {
                queryBuilder.andWhere('user.name LIKE :creator', {
                    creator: `%${creator}%`
                });
            }
    
            // Tìm theo trạng thái
            if (status) {
                queryBuilder.andWhere('contract.status = :status', { status });
            }
    
            // Tìm theo khoảng thời gian
            if (fromDate) {
                queryBuilder.andWhere('contract.createdAt >= :fromDate', {
                    fromDate: new Date(fromDate)
                });
            }
    
            if (toDate) {
                queryBuilder.andWhere('contract.createdAt <= :toDate', {
                    toDate: new Date(toDate)
                });
            }
    
            const contracts = await queryBuilder.getMany();
    
            return res.status(200).json(contracts);
        } catch (e) {
            return res.status(500).json({
                message: e.message
            });
        }
    }
    async countContractsByStatus(req, res) {
        try {
            const counts = await contractRepo
                .createQueryBuilder('contract')
                .select('contract.status', 'status')
                .addSelect('COUNT(contract.id)', 'count')
                .groupBy('contract.status')
                .getRawMany();
    
            const result = {
                new: 0,
                pending: 0,
                signed: 0,
                rejected: 0
            };
    
            counts.forEach(item => {
                result[item.status] = parseInt(item.count);
            });
    
            return res.status(200).json({
                total: Object.values(result).reduce((a, b) => a + b, 0),
                statusCounts: result
            });
        } catch (e) {
            return res.status(500).json({
                message: e.message
            });
        }
    }


}

export default contractController;