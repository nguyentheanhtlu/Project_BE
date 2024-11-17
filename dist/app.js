"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const path_1 = __importDefault(require("path"));
const app_config_1 = __importDefault(require("./config/app.config"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const contract_router_1 = __importDefault(require("./routers/contract.router"));
const auth_middlewares_1 = __importDefault(require("./middlewares/auth.middlewares"));
const department_router_1 = __importDefault(require("./routers/department.router"));
const contractAttachment_router_1 = __importDefault(require("./routers/contractAttachment.router"));
const fs_1 = __importDefault(require("fs"));
const userSignature_router_1 = __importDefault(require("./routers/userSignature.router"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.appConfig = new app_config_1.default();
        this.bootstrap();
    }
    bootstrap() {
        this.setupMiddlewares();
        // this.serveStaticFiles();
        this.listen();
    }
    // Static  files
    /* private serveStaticFiles(): void {
          this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
      } */
    setupMiddlewares() {
        // this.app.use(
        //   fileUpload({
        //     createParentPath: true,
        //   })
        // );
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_session_1.default)({
            name: "session",
            keys: [this.appConfig.sessionKey],
            maxAge: this.appConfig.sessionMaxAge,
        }));
        this.app.use((0, cors_1.default)({
            credentials: true,
            origin: this.appConfig.baseURL,
            methods: ["POST", "PUT", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"],
        }));
        const uploadsDir = path_1.default.join(__dirname, '../uploads');
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        }
        // Serve static files from the 'uploads' directory
        this.app.use('/uploads', express_1.default.static(uploadsDir));
        // Test
        // this.app.use('/test', async (req, res) => {
        //   let transactionRepo = dataSource.getRepository(Transaction)
        //   let result = await transactionRepo.createQueryBuilder('trans')
        //       .where('trans.date >= :startDate', {startDate: '2023-02-22'})
        //       .getMany()
        //   res.json(result)
        // })
        // //
        this.app.use("/api/auth", auth_router_1.default);
        this.app.use(auth_middlewares_1.default.checkAuthentication);
        this.app.use("/api/department", department_router_1.default);
        this.app.use("/api/contract_attachment", contractAttachment_router_1.default);
        this.app.use("/api/user-signature", userSignature_router_1.default);
        this.app.use("/api/user", user_router_1.default);
        this.app.use("/api/contract", contract_router_1.default);
        // this.app.use("/api/type", TransTypeRouter);
    }
    listen() {
        this.app.listen(this.appConfig.port, () => {
            console.log(`server started at http://localhost:${this.appConfig.port}`);
        });
    }
}
// tslint:disable-next-line:no-unused-expression
new App();
//# sourceMappingURL=app.js.map