import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import { User } from "../models/user.entity";
import { Like } from "typeorm";

let userRepo = dataSource.getRepository(User)

class UserServices {

    static async addUser(id, username, email, password, code , fullName, gender, dateOfBirth, placeOfBirth, address , idNumber , idIssueDate ,
        idIssuePlace, phoneNumber , department, position , role) {
            const newUser = new User
            newUser.id = id
            newUser.code = code
            newUser.fullName = fullName
            newUser.gender = gender
            newUser.dateOfBirth = dateOfBirth
            newUser.placeOfBirth = placeOfBirth
            newUser.address = address
            newUser.idNumber = idNumber
            newUser.idIssueDate = idIssueDate
            newUser.idIssuePlace = idIssuePlace
            newUser.phoneNumber = phoneNumber
            newUser.department = department
            newUser.position = position
            newUser.role = role
            newUser.username = username
            newUser.email = email
            newUser.passwordHash = password
        await userRepo.save(newUser)
        return newUser
    }

    static async updateUser(userId: number, code , fullName, gender, dateOfBirth, placeOfBirth, address , idNumber , idIssueDate ,
        idIssuePlace, phoneNumber , department, position , role): Promise<void> {
        const user = await userRepo.findOneBy({ id: userId })
        user.code = code
        user.fullName = fullName
        user.gender = gender
        user.dateOfBirth = dateOfBirth
        user.placeOfBirth = placeOfBirth
        user.address = address
        user.idNumber = idNumber
        user.idIssueDate = idIssueDate
        user.idIssuePlace = idIssuePlace
        user.phoneNumber = phoneNumber
        user.department = department
        user.position = position
        user.role = role
        await userRepo.save(user)
    }
    static async getUserByUserName(username: string) {
        return await userRepo.findOneBy({username: username});
    }

    static async getUserByDepartMent(department : string) {
        return await userRepo.find({
            where : {
                department : Like(`%${department}`)
            }
        });
    }

    static async getUserDetails (id : any) {
        let user = await userRepo.findOneBy({ id: id})
        return user;
    }

    static async getListUser ()  {
        let listUser = await userRepo.find()
        return listUser;
    }
    static async deleteUser (id : any) {
        let user = await userRepo.delete( {id : id})
        return user
    }
}

export default UserServices;