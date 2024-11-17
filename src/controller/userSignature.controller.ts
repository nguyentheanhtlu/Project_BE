import UserSignatureService from "../services/userSignature.services";
const path = require('path');

class userSignatureController {
    async addUserSignature(req,res) {
        try{
            let  id = req.body.id
            let user = req.body.user
            let signatureImagePath = req.file ? `/uploads/${path.basename(req.file.path).substring(0, 255)}` : null
          
            let userSignature = await UserSignatureService.addUserSignature(id, user, signatureImagePath)
            res.status(200).json(userSignature);
            }
            catch(e){
                res.status(404).json({ message: e.message });
            }
    }

    async list () {
       let userSignature = await UserSignatureService.listUserSignature()
       return userSignature
    }

    async detail (req, res) {
        try {
            let id = req.body.id
            let userSignature = await UserSignatureService.detail(id)
            res.status(200).json(userSignature);
        }
        catch(e) {
            res.status(404).json({ message: e.message });
        }
    }



}

export default userSignatureController;