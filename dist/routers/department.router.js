"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = __importDefault(require("../controller/department.controller"));
const DepartmentRouter = express_1.default.Router();
const departmentController = new department_controller_1.default();
DepartmentRouter.post("/", departmentController.listDepartments);
DepartmentRouter.post("/addDepartment", departmentController.addDepartment);
exports.default = DepartmentRouter;
//# sourceMappingURL=department.router.js.map