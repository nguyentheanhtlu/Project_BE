"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalFlow = void 0;
const typeorm_1 = require("typeorm");
const contract_entity_1 = require("./contract.entity");
const user_entity_1 = require("./user.entity");
let ApprovalFlow = class ApprovalFlow {
};
exports.ApprovalFlow = ApprovalFlow;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ApprovalFlow.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contract_entity_1.Contract, { nullable: false }),
    __metadata("design:type", contract_entity_1.Contract)
], ApprovalFlow.prototype, "contract", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ApprovalFlow.prototype, "stepNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    __metadata("design:type", user_entity_1.User)
], ApprovalFlow.prototype, "approver", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], ApprovalFlow.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['internal', 'customer'] }),
    __metadata("design:type", String)
], ApprovalFlow.prototype, "actionSource", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['pending', 'approved', 'rejected'], default: 'pending' }),
    __metadata("design:type", String)
], ApprovalFlow.prototype, "approvalStatus", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ApprovalFlow.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ApprovalFlow.prototype, "comments", void 0);
exports.ApprovalFlow = ApprovalFlow = __decorate([
    (0, typeorm_1.Entity)()
], ApprovalFlow);
//# sourceMappingURL=approval_flow.entity.js.map