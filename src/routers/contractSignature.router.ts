import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import contractSignatureController from '../controller/contractSignature.controller';

const uploadDir = path.join(__dirname, '../../uploads');

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

const ContractSignatureRouter: Router = express.Router();
const UserSignatureController = new contractSignatureController();

ContractSignatureRouter.post("/add", upload.single("filePath"), UserSignatureController.addContractSignature);
ContractSignatureRouter.post("/",  UserSignatureController.listContractSignature);
ContractSignatureRouter.post("/detail",  UserSignatureController.getDetail);
ContractSignatureRouter.post("/update",  UserSignatureController.updateContractSignature);


export default ContractSignatureRouter;
