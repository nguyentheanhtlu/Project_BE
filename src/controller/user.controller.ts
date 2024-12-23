import UserServices from "../services/user.services";
import BaseController from "./base.controller";
import bcrypt from "bcrypt";
import { User } from '../models/user.entity';
import dataSource from '../database/data-source';
import { Like } from "typeorm";

let userRepo = dataSource.getRepository(User)

class UserController extends BaseController{

    async createUser(req, res) {
        try{
            let username = req.body.username
            let id = req.body.id
            let email = req.body.email
            let code = req.body.code
            let fullName = req.body.fullName
            let gender = req.body.gender
            let dateOfBirth = req.body.dateOfBirth
            let placeOfBirth = req.body.placeOfBirth
            let address = req.body.address
            let idNumber = req.body.idNumber
            let idIssuePlace = req.body.idIssuePlace
            let idIssueDate = req.body.idIssueDate
            let phoneNumber = req.body.phoneNumber
            let department = req.body.department
            let position = req.body.position
            let role = req.body.role
            let passwordHash = req.body.passwordHash
            let password = await bcrypt.hash(passwordHash, 10);
            const user = await UserServices.addUser(id, username, email, password, code , fullName, gender, dateOfBirth, placeOfBirth, address , idNumber , idIssueDate ,
                idIssuePlace, phoneNumber , department, position , role)            
            res.status(200).json(user);
        }
        catch(e){
            res.status(404).json({ message: e.message });
        }
    }

    async update(req, res) {
         try{
            let userId = req.body.id
            let code = req.body.code
            let fullName = req.body.fullName
            let gender = req.body.gender
            let dateOfBirth = req.body.dateOfBirth
            let placeOfBirth = req.body.placeOfBirth
            let address = req.body.address
            let idNumber = req.body.idNumber
            let idIssuePlace = req.body.idIssuePlace
            let idIssueDate = req.body.idIssueDate
            let phoneNumber = req.body.phoneNumber
            let department = req.body.department
            let position = req.body.position
            let role = req.body.role
            const user = await UserServices.updateUser(userId, code , fullName, gender, dateOfBirth, placeOfBirth, address , idNumber , idIssueDate ,
                idIssuePlace, phoneNumber , department, position , role)            
            res.status(200).json(user);
        }
        catch(e) {
            res.status(404).json({ message: e.message });
        }
        }
    async getDetails (req, res) {

        try{
            let userId = req.body.id
            const user = await UserServices.getUserDetails(userId)
            res.status(200).json(user);
        }
        catch(e) {
            res.status(404).json({ message: e.message });
        }
        }
    async getListUser (req, res) {
            try{
                const user = await UserServices.getListUser()
                res.status(200).json(user);
            }
            catch(e){
                res.status(404).json({ message: e.message });
            }
        
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

    async searchNameOrId (req, res) {
        try {
            if (req.query.keyword) {
              const users = await userRepo.find({
                where: [
                  { fullName: Like(`%${req.query.keyword}%`) },
                  { code : Like(`%${req.query.keyword}%`) },
                ],
              });
              res.status(200).json({
                success: true,
                users,
              });
            }
          } catch (e) {
            res.status(404).json({ message: e.message });          }

    }

    async deleteUser (req, res) {
        try{
            let userId = req.body.id
            const user = await UserServices.deleteUser(userId)
            res.status("delete success").json(user);
        }
        catch(e) {
            res.status(404).json({ message: e.message });
        }
    }
    // ... existing code ...

    async searchUsers(req, res) {
    try {
        const {
            keyword,        // Tìm theo tên/số điện thoại
            department,     // Phòng ban
            status,        // Trạng thái
            fromDate,      // Từ ngày
            toDate         // Đến ngày
        } = req.query;

        const queryBuilder = userRepo.createQueryBuilder('user');

        if (keyword) {
            queryBuilder.andWhere(
                '(user.fullName LIKE :keyword OR user.phoneNumber LIKE :keyword OR user.code LIKE :keyword)', 
                { keyword: `%${keyword}%` }
            );
        }

        if (department) {
            queryBuilder.andWhere('user.department = :department', { department });
        }

        if (status) {
            queryBuilder.andWhere('user.status = :status', { status });
        }

        if (fromDate) {
            queryBuilder.andWhere('user.createdAt >= :fromDate', {
                fromDate: new Date(fromDate)
            });
        }

        if (toDate) {
            queryBuilder.andWhere('user.createdAt <= :toDate', {
                toDate: new Date(toDate)
            });
        }

        queryBuilder.orderBy('user.createdAt', 'DESC');

        const users = await queryBuilder.getMany();

        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
    }
}


export default UserController;