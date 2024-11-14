import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import dataSource from "../database/data-source";
import { User } from "../models/user.entity";
import BaseServices from "./base.services";
import UserServices from "./user.services";
import createError from "http-errors";

require('dotenv').config();

let userRepo = dataSource.getRepository(User);

class AuthServices extends BaseServices {



    static async checkAuthAndGenerateTokens(username, passwordHash): Promise<string[]> {
        let user = await UserServices.getUserByUserName(username);
        if (!user) {
            throw new Error("Wrong username or password");
        }
        let match = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!match) {
            throw new Error("Wrong username or password");
        }
        // if (!user.active) {
        //     throw new Error("Please verify your email to login");
        // }
        let accessToken = this.generateAccessToken(user);
        let refreshToken = this.generateRefreshToken(user);
        // user.refreshToken = refreshToken;
        userRepo.save(user);
        return [accessToken, refreshToken];
    }

    static async changePassword(user, oldPassword, newPassword) {
        let oldPasswords = user.password;
        let confirmPasswordSuccess = await bcrypt.compare(oldPassword, oldPasswords);
        console.log(confirmPasswordSuccess)
        if (confirmPasswordSuccess) {
            user.password = await bcrypt.hash(newPassword, 10);
            await userRepo.save(user);
        }
        else {
            throw new Error("Password Mismatch");
        }
    }



    // static async verifyEmail({ token }): Promise<void> {
    //     jwt.verify(token, `${process.env.JWT_REFRESH_KEY}`, async (err, decoded) => {
    //         let user = await UserServices.getUserByUserName(decoded);
    //         user.active = true;
    //         await userRepo.save(user);
    //         return;
    //     })
    // }

    static async signAccessToken(data) {
        return new Promise((resolve, reject) => {
          const payload = {
            data,
          };
          const secret = process.env.JWT_SECRET_KEY;
          const options = {
            expiresIn: "1y",
          };
          jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
              reject(err);
            } else {
              resolve(token);
            }
          });
        });
      }
      async signRefreshToken(idNumber) {
        return new Promise((resolve, reject) => {
          const payload = {
            idNumber,
          };
          const secret = process.env.JWT_REFRESH_KEY;
          const options = {
            expiresIn: "1y",
          };
          jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
              reject(err);
            } else {
              resolve(token);
            }
          });
        });
      }
      veryfyAccessToken(req, res, next) {
        if (!req.headers.authorization) {
          return next(createError.Unauthorized());
        }
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
          if (err) {
            return next(createError.Unauthorized());
          }
          req.user = payload;
          next();
        });
      }



}

export default AuthServices;