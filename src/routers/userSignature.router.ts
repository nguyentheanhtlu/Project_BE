import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import userSignatureController from '../controller/userSignature.controller';

const uploadDir = path.join(__dirname, '../../../uploads/');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const UserSignatureRouter: Router = express.Router();
const Controller = new userSignatureController();

UserSignatureRouter.post("/add", upload.single("signatureImagePath"), Controller.addUserSignature);
UserSignatureRouter.post("/",  Controller.list);
UserSignatureRouter.post("/detail",  Controller.detail);

export default UserSignatureRouter;
