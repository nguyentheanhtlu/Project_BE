"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const UserRouter = express_1.default.Router();
const userController = new user_controller_1.default();
UserRouter.post("/details", userController.getDetails);
UserRouter.post("/update", userController.update);
UserRouter.post("/listUsers", userController.getListUser);
UserRouter.post("/addUsers", userController.createUser);
UserRouter.post("/delete", userController.deleteUser);
// UserRouter.get("/searchDepartment", userController.searchDepartment)
UserRouter.get("/searchUser", userController.searchNameOrId);
UserRouter.get("/search", userController.searchUsers);
exports.default = UserRouter;
//# sourceMappingURL=user.router.js.map