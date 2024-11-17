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
const user_services_1 = __importDefault(require("../services/user.services"));
const base_controller_1 = __importDefault(require("./base.controller"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_entity_1 = require("../models/user.entity");
const data_source_1 = __importDefault(require("../database/data-source"));
const typeorm_1 = require("typeorm");
let userRepo = data_source_1.default.getRepository(user_entity_1.User);
class UserController extends base_controller_1.default {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let username = req.body.username;
                let id = req.body.id;
                let email = req.body.email;
                let code = req.body.code;
                let fullName = req.body.fullName;
                let gender = req.body.gender;
                let dateOfBirth = req.body.dateOfBirth;
                let placeOfBirth = req.body.placeOfBirth;
                let address = req.body.address;
                let idNumber = req.body.idNumber;
                let idIssuePlace = req.body.idIssuePlace;
                let idIssueDate = req.body.idIssueDate;
                let phoneNumber = req.body.phoneNumber;
                let department = req.body.department;
                let position = req.body.position;
                let role = req.body.role;
                let passwordHash = req.body.passwordHash;
                let password = yield bcrypt_1.default.hash(passwordHash, 10);
                const user = yield user_services_1.default.addUser(id, username, email, password, code, fullName, gender, dateOfBirth, placeOfBirth, address, idNumber, idIssueDate, idIssuePlace, phoneNumber, department, position, role);
                res.status(200).json(user);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.body.id;
                let code = req.body.code;
                let fullName = req.body.fullName;
                let gender = req.body.gender;
                let dateOfBirth = req.body.dateOfBirth;
                let placeOfBirth = req.body.placeOfBirth;
                let address = req.body.address;
                let idNumber = req.body.idNumber;
                let idIssuePlace = req.body.idIssuePlace;
                let idIssueDate = req.body.idIssueDate;
                let phoneNumber = req.body.phoneNumber;
                let department = req.body.department;
                let position = req.body.position;
                let role = req.body.role;
                const user = yield user_services_1.default.updateUser(userId, code, fullName, gender, dateOfBirth, placeOfBirth, address, idNumber, idIssueDate, idIssuePlace, phoneNumber, department, position, role);
                res.status(200).json(user);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    getDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.body.id;
                const user = yield user_services_1.default.getUserDetails(userId);
                res.status(200).json(user);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    getListUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_services_1.default.getListUser();
                res.status(200).json(user);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    // async searchDepartment (req, res ) {
    //     try {
    //         if (req.query.keyword) {
    //           const users = await userRepo.find({
    //             where: [
    //               { department: Like(`%${req.query.keyword}%`) },
    //             ],
    //           });
    //           res.status(200).json({
    //             success: true,
    //             users,
    //           });
    //         }
    //       } catch (e) {
    //         res.status(404).json({ message: e.message });          }
    // }
    searchNameOrId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.keyword) {
                    const users = yield userRepo.find({
                        where: [
                            { fullName: (0, typeorm_1.Like)(`%${req.query.keyword}%`) },
                            { code: (0, typeorm_1.Like)(`%${req.query.keyword}%`) },
                        ],
                    });
                    res.status(200).json({
                        success: true,
                        users,
                    });
                }
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.body.id;
                const user = yield user_services_1.default.deleteUser(userId);
                res.status("delete success").json(user);
            }
            catch (e) {
                res.status(404).json({ message: e.message });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map