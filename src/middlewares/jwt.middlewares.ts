import JWT from "jsonwebtoken";
import createError from "http-errors";
import { User } from "../models/user.entity";
import dataSource from "../database/data-source";
const userRepo = dataSource.getRepository(User);

class Token {
  async signAccessToken(data) {
    return new Promise((resolve, reject) => {
      const payload = {
        data,
      };
      const secret = process.env.JWT_SECRET_KEY;
      const options = {
        expiresIn: "1y",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
  async signRefreshToken(userID) {
    return new Promise((resolve, reject) => {
      const payload = {
        userID,
      };
      const secret = process.env.JWT_REFRESH_KEY;
      const options = {
        expiresIn: "1y",
      };
      JWT.sign(payload, secret, options, (err, token) => {
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
    JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return next(createError.Unauthorized());
      }
      req.user = payload;
      next();
    });
  }
}

export default new Token();
