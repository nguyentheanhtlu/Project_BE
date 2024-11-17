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
exports.ContractAttachment = void 0;
const typeorm_1 = require("typeorm");
const contract_entity_1 = require("./contract.entity");
const user_entity_1 = require("./user.entity");
let ContractAttachment = class ContractAttachment {
};
exports.ContractAttachment = ContractAttachment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContractAttachment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contract_entity_1.Contract, { nullable: false }),
    __metadata("design:type", contract_entity_1.Contract)
], ContractAttachment.prototype, "contract", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], ContractAttachment.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], ContractAttachment.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], ContractAttachment.prototype, "fileType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ContractAttachment.prototype, "uploadedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], ContractAttachment.prototype, "uploadedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['contract_display', 'note'] }),
    __metadata("design:type", String)
], ContractAttachment.prototype, "attachmentPurpose", void 0);
exports.ContractAttachment = ContractAttachment = __decorate([
    (0, typeorm_1.Entity)()
], ContractAttachment);
//# sourceMappingURL=contract_attachment.entity.js.map