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
const department_entity_1 = require("./../models/department.entity");
let departmentRepo = data_source_1.default.getRepository(department_entity_1.Department);
class DepartmentService {
    static addDepartment(id, departmentName, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let department = new department_entity_1.Department();
            department.id = id;
            department.description = description;
            department.departmentName = departmentName;
            yield departmentRepo.save(department);
            return department;
        });
    }
    static updateDepartment(id, departmentName, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield departmentRepo.findOneBy({ id: id });
            department.id = id;
            department.description = description;
            department.departmentName = departmentName;
            yield departmentRepo.save(department);
        });
    }
    static listDepartment() {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield departmentRepo.find();
            return department;
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.services.js.map