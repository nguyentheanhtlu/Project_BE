import { Department } from './../models/department.entity';
import express, {Router} from 'express';
import DepartmentController from '../controller/department.controller';

const DepartmentRouter: Router = express.Router();

const departmentController = new DepartmentController();

DepartmentRouter.post("/", departmentController.listDepartments)
DepartmentRouter.post("/addDepartment", departmentController.addDepartment)


export default DepartmentRouter;