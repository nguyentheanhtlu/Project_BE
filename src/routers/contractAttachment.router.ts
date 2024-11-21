import express, { Router } from 'express';
import multer from 'multer';
import ContractAttachmentController from '../controller/contractAttachment.controller';
import path from 'path';
import fs from 'fs';

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

const ContractAttachmentRouter: Router = express.Router();
const contractAttachmentController = new ContractAttachmentController();

ContractAttachmentRouter.post("/add", upload.single("filePath"), contractAttachmentController.addContractAttachment);
ContractAttachmentRouter.post("/",  contractAttachmentController.listContractAttachment);
ContractAttachmentRouter.post("/detail",  contractAttachmentController.getDetails);
ContractAttachmentRouter.post("/update",  contractAttachmentController.updateContractAttachment);


export default ContractAttachmentRouter;
