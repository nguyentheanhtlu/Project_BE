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
const department_services_1 = __importDefault(require("../services/department.services"));
class departmentController {
    addDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body.id;
                let description = req.body.description;
                let departmentName = req.body.departmentName;
                let department = yield department_services_1.default.addDepartment(id, description, departmentName);
                res.status(200).json(department);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    listDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            let department = yield department_services_1.default.listDepartment();
            return department;
        });
    }
}
exports.default = departmentController;
//# sourceMappingURL=department.controller.js.map