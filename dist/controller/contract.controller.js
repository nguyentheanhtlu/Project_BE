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
const approval_flow_entity_1 = require("../models/approval_flow.entity");
const contract_signature_entity_1 = require("../models/contract_signature.entity");
const contract_entity_1 = require("../models/contract.entity");
let approvalFlowRepo = data_source_1.default.getRepository(approval_flow_entity_1.ApprovalFlow);
let contractSignatureRepo = data_source_1.default.getRepository(contract_signature_entity_1.ContractSignature);
let contractRepo = data_source_1.default.getRepository(contract_entity_1.Contract);
let userRepo = data_source_1.default.getRepository(user_entity_1.User);
class contractController {
    createContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id, contractNumber, customer, contractType, signersCount, status, note } = req.body;
                let createdBy = req.user.id;
                // Validate customer
                const customerUser = yield userRepo.findOne({
                    where: { id: customer, role: 'customer' }
                });
                if (!customerUser) {
                    return res.status(400).json({
                        message: "Invalid customer ID. User must exist and have 'customer' role"
                    });
                }
                let contract = yield contract_services_1.default.addContract(id, contractNumber, customer, contractType, createdBy, signersCount, status, note);
                res.status(200).json(contract);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    updateContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, contractNumber, customer, contractType, signersCount, status, note } = req.body;
                const createdBy = req.user.id;
                const contract = yield contract_services_1.default.updateContract(id, contractNumber, customer, contractType, createdBy, signersCount, status, note);
                res.status(200).json(contract);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    allContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contracts = yield contract_services_1.default.allContracts();
                res.status(200).json(contracts);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    getDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idContract = req.body.id;
                const contracts = yield contract_services_1.default.getDetail(idContract);
                res.status(200).json(contracts);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    successContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, status } = req.body;
            if (status === 'signed') {
                const approvalFlow = yield approvalFlowRepo.find({
                    where: { contract: { id }, approvalStatus: 'approved' }
                });
                const contractSignatures = yield contractSignatureRepo.find({
                    where: { contract: { id }, status: "signed" }
                });
                if (!approvalFlow && !contractSignatures) {
                    return res.status(400).json({
                        message: "Cannot update contract status to signed. All approvals and signatures must be completed first."
                    });
                }
            }
            yield contractRepo.update(id, { status: 'signed' });
            return res.status(200).json({
                message: "Contract status updated to signed successfully"
            });
        });
    }
    deleteMultipleContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ids } = req.body; // Nhận một mảng các id cần xóa
                if (!Array.isArray(ids) || ids.length === 0) {
                    return res.status(400).json({
                        message: "Please provide an array of contract IDs to delete"
                    });
                }
                yield contractRepo.delete(ids);
                return res.status(200).json({
                    message: `Successfully deleted ${ids.length} contracts`
                });
            }
            catch (e) {
                return res.status(500).json({
                    message: e.message
                });
            }
        });
    }
    rejectMultipleContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield contractRepo.update(ids, {
                    status: 'rejected',
                    note: note
                });
                return res.status(200).json({
                    message: `Successfully rejected ${ids.length} contracts`
                });
            }
            catch (e) {
                return res.status(500).json({
                    message: e.message
                });
            }
        });
    }
    searchContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { contractNumber, customerInfo, // Thông tin khách hàng (tên hoặc số điện thoại)
                creator, // Người tạo
                status, // Trạng thái hợp đồng
                fromDate, // Từ ngày
                toDate // Đến ngày
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
                    queryBuilder.andWhere('(customer.name LIKE :customerInfo OR customer.phone LIKE :customerInfo)', { customerInfo: `%${customerInfo}%` });
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
                const contracts = yield queryBuilder.getMany();
                return res.status(200).json(contracts);
            }
            catch (e) {
                return res.status(500).json({
                    message: e.message
                });
            }
        });
    }
    countContractsByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const counts = yield contractRepo
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
            }
            catch (e) {
                return res.status(500).json({
                    message: e.message
                });
            }
        });
    }
}
exports.default = contractController;
//# sourceMappingURL=contract.controller.js.map