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
const ContractSignatureController = new contractSignatureController();

ContractSignatureRouter.post("/add", upload.single("signatureImagePath"), ContractSignatureController.addContractSignature);
ContractSignatureRouter.post("/",  ContractSignatureController.listContractSignature);
ContractSignatureRouter.post("/detail",  ContractSignatureController.getDetail);
ContractSignatureRouter.post("/update", upload.single("signatureImagePath"),  ContractSignatureController.updateContractSignature);
ContractSignatureRouter.post("/find", ContractSignatureController.findByContract);



export default ContractSignatureRouter;
