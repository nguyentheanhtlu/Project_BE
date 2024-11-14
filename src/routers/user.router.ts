import express, {Router} from 'express';
import UserController from '../controller/user.controller';

const UserRouter: Router = express.Router();

const userController = new UserController();

UserRouter.post("/details", userController.getDetails)
UserRouter.post("/update", userController.update)
UserRouter.post("/listUsers", userController.getListUser)
UserRouter.post("/addUsers", userController.createUser)
UserRouter.post("/delete", userController.deleteUser)
export default UserRouter;