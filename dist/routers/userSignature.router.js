"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const userSignature_controller_1 = __importDefault(require("../controller/userSignature.controller"));
const uploadDir = path_1.default.join(__dirname, '../../../uploads/');
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
const UserSignatureRouter = express_1.default.Router();
const Controller = new userSignature_controller_1.default();
UserSignatureRouter.post("/add", upload.single("signatureImagePath"), Controller.addUserSignature);
UserSignatureRouter.post("/", Controller.list);
UserSignatureRouter.post("/detail", Controller.detail);
exports.default = UserSignatureRouter;
//# sourceMappingURL=userSignature.router.js.map