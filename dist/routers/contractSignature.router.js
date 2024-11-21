"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const contractSignature_controller_1 = __importDefault(require("../controller/contractSignature.controller"));
const uploadDir = path_1.default.join(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const ContractSignatureRouter = express_1.default.Router();
const ContractSignatureController = new contractSignature_controller_1.default();
ContractSignatureRouter.post("/add", upload.single("signatureImagePath"), ContractSignatureController.addContractSignature);
ContractSignatureRouter.post("/", ContractSignatureController.listContractSignature);
ContractSignatureRouter.post("/detail", ContractSignatureController.getDetail);
ContractSignatureRouter.post("/update", upload.single("signatureImagePath"), ContractSignatureController.updateContractSignature);
ContractSignatureRouter.post("/find", ContractSignatureController.findByContract);
exports.default = ContractSignatureRouter;
//# sourceMappingURL=contractSignature.router.js.map