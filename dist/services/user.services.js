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
const user_entity_1 = require("../models/user.entity");
const typeorm_1 = require("typeorm");
let userRepo = data_source_1.default.getRepository(user_entity_1.User);
class UserServices {
    static addUser(id, username, email, password, code, fullName, gender, dateOfBirth, placeOfBirth, address, idNumber, idIssueDate, idIssuePlace, phoneNumber, department, position, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_entity_1.User;
            newUser.id = id;
            newUser.code = code;
            newUser.fullName = fullName;
            newUser.gender = gender;
            newUser.dateOfBirth = dateOfBirth;
            newUser.placeOfBirth = placeOfBirth;
            newUser.address = address;
            newUser.idNumber = idNumber;
            newUser.idIssueDate = idIssueDate;
            newUser.idIssuePlace = idIssuePlace;
            newUser.phoneNumber = phoneNumber;
            newUser.department = department;
            newUser.position = position;
            newUser.role = role;
            newUser.username = username;
            newUser.email = email;
            newUser.passwordHash = password;
            yield userRepo.save(newUser);
            return newUser;
        });
    }
    static updateUser(userId, code, fullName, gender, dateOfBirth, placeOfBirth, address, idNumber, idIssueDate, idIssuePlace, phoneNumber, department, position, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepo.findOneBy({ id: userId });
            user.code = code;
            user.fullName = fullName;
            user.gender = gender;
            user.dateOfBirth = dateOfBirth;
            user.placeOfBirth = placeOfBirth;
            user.address = address;
            user.idNumber = idNumber;
            user.idIssueDate = idIssueDate;
            user.idIssuePlace = idIssuePlace;
            user.phoneNumber = phoneNumber;
            user.department = department;
            user.position = position;
            user.role = role;
            yield userRepo.save(user);
        });
    }
    static getUserByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepo.findOneBy({ username: username });
        });
    }
    static getUserByDepartMent(department) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepo.find({
                where: {
                    department: (0, typeorm_1.Like)(`%${department}`)
                }
            });
        });
    }
    static getUserDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield userRepo.findOneBy({ id: id });
            return user;
        });
    }
    static getListUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let listUser = yield userRepo.find();
            return listUser;
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield userRepo.delete({ id: id });
            return user;
        });
    }
}
exports.default = UserServices;
//# sourceMappingURL=user.services.js.map