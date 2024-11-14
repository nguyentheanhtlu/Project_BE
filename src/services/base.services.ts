import { User } from "../models/user.entity";
import dataSource from "../database/data-source";


import jwt from 'jsonwebtoken';

let userRepo = dataSource.getRepository(User);

class BaseServices {
    // static async validateEmail(email: string): Promise<void> {

    //     if (!email) {
    //         throw new Error("Email is required");
    //     }
    //     let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     let isValidEmail = regEmail.test(email);
    //     if (!isValidEmail) {
    //         throw new Error("Invalid email");
    //     }
    //     let user = await User.getUserByEmail(email);
    //     if (user) {
    //         throw new Error("Email already exists");
    //     }
    // }
    static async validatePassword(password: string): Promise<void> {
        if (!password) {
            throw new Error("Password is required");
        }
    }

    static getRandomString(): string {
        let randomString = '';
        for (let i = 0; i < 10; i++) {
            randomString += Math.floor(Math.random() * 10).toString();
        }
        return randomString;
    }

    static generateAccessToken(user: User): string {
        let { id, email, username } = user;
        let payload = { id, email, username };
        return jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "15m" }
        );
    }

    static generateRefreshToken(user: User): string {
        let { id, email, username } = user;
        let payload = { id, email, username };
        return jwt.sign(payload, `${process.env.JWT_REFRESH_KEY}`);
    };

    static generateTokenFromString(email: string): string {
        return jwt.sign(email, `${process.env.JWT_REFRESH_KEY}`);
    }
}

export default BaseServices;

