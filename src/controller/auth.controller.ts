import BaseController from "./base.controller";
import AuthServices from "../services/auth.services";
import { User } from "../models/user.entity";
import dataSource from "../database/data-source";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwtToken from "../middlewares/jwt.middlewares"
let userRepo = dataSource.getRepository(User);


class AuthController extends BaseController {

    static async register(req, res, next): Promise<User> {
        try {
            const {  username , passwordHash , email, code, fullName, idNumber  } = req.body;
            const user = await userRepo.findOne({
              where: [{ email }, { username }],
            });
            if (user) {
                if (user.username === username) {
                    return next(createError(401, "Username already exists"));
                }
                return next(createError(401, "Email already exists"));
            }
            let password = await bcrypt.hash(passwordHash, 10);
            const newUser = await userRepo.save({
                code: code,
                idNumber: idNumber,
                fullName:fullName,
                 email: email,
                 username: username,
              passwordHash: password,
            });
      
            const accessToken = await jwtToken.signAccessToken(newUser);
            res.status(200).json({
              message: "created successfully",
              newUser,
              accessToken,
            });
          } catch (error) {
            next(error);
          }
        
    }
    static async login (req , res, next) {
      try {
          let { username, passwordHash } = req.body;
          let [accessToken, refreshToken] = await AuthServices.checkAuthAndGenerateTokens(username, passwordHash);
          res.status(200).json({
              accessToken: accessToken,
              refreshToken: refreshToken,
          });
      }
      catch (err: any) {
          res.status(500).json({ message: err.message || this.defaultErrorMessage });
      }
  }
}

export default AuthController;
