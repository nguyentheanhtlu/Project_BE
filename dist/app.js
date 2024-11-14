"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const app_config_1 = __importDefault(require("./config/app.config"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
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
        this.app.use((0, express_fileupload_1.default)({
            createParentPath: true,
        }));
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
        // this.app.use(AuthMiddleware.checkAuthentication);
        // this.app.use("/api/wallet", WalletRouter);
        // this.app.use("/api/transaction-subcategory", TransSubCateRouter);
        // this.app.use("/api/transaction-category", TransCateRouter);
        this.app.use("/api/user", user_router_1.default);
        // this.app.use("/api/transaction", TransactionRouter);
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