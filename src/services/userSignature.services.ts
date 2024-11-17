import { UserSignature } from '../models/user_signature.entity';
import dataSource from '../database/data-source';
import { User } from '../models/user.entity';

let userSignatureRepo = dataSource.getRepository(UserSignature)

class UserSignatureService {


    static async addUserSignature (id, user : User, signatureImagePath) {

        let userSignature = new UserSignature()
        userSignature.id = id
        userSignature.user = user
        userSignature.signatureImagePath = signatureImagePath
        await userSignatureRepo.save(userSignature)
        return userSignature;
    }
    static async updateUserSignature(id, user : User, signatureImagePath) {
        const userSignature = await userSignatureRepo.findOneBy({id : id})
        userSignature.id = id
        userSignature.user = user
        userSignature.signatureImagePath = signatureImagePath
        
        await userSignatureRepo.save(userSignature)
    }
    static async listUserSignature () {
        const userSignature = await userSignatureRepo.find({
             
                relations: ["user"]
            
        })
        return userSignature;
    }
    static async detail (id) {
        const userSignature = await userSignatureRepo.findOne({             
            relations: ["user"],
            where : {id : id}
        
    })
    return userSignature;

    }
    
}

export default UserSignatureService;