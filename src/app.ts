import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import path from 'path';
import dataSource from "./database/data-source";
import AppConfig from "./config/app.config";
import AuthRouter from "./routers/auth.router";
import UserRouter from "./routers/user.router";
import ContractRouter from "./routers/contract.router";
import AuthMiddleware from "./middlewares/auth.middlewares";
import DepartmentRouter from "./routers/department.router";
import ContractAttachmentRouter from "./routers/contractAttachment.router";
import fs from 'fs';
import UserSignatureRouter from "./routers/userSignature.router";
import ContractSignatureRouter from "./routers/contractSignature.router";
import ApprovalFlowRouter from "./routers/approvalFlow.router";

class App {
  private app: express.Application = express();

  private appConfig = new AppConfig();

  constructor() {
    this.bootstrap();
  }

  public bootstrap(): void {
    this.setupMiddlewares();
    // this.serveStaticFiles();
    this.listen();
  }

  // Static  files
  /* private serveStaticFiles(): void {
        this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
    } */
  private setupMiddlewares(): void {
    // this.app.use(
    //   fileUpload({
    //     createParentPath: true,
    //   })
    // );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cookieSession({
        name: "session",
        keys: [this.appConfig.sessionKey],
        maxAge: this.appConfig.sessionMaxAge,
      })
    );
    this.app.use(
      cors({
        credentials: true,
        origin: this.appConfig.baseURL,
        methods: ["POST", "PUT", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"],
      })
    );
    
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)){
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Serve static files from the 'uploads' directory
    this.app.use('/uploads', express.static(uploadsDir));
    

    // Test

    // this.app.use('/test', async (req, res) => {
    //   let transactionRepo = dataSource.getRepository(Transaction)
    //   let result = await transactionRepo.createQueryBuilder('trans')
    //       .where('trans.date >= :startDate', {startDate: '2023-02-22'})
    //       .getMany()
    //   res.json(result)
    // })

    // //

    this.app.use("/api/auth", AuthRouter);
    this.app.use(AuthMiddleware.checkAuthentication);
    this.app.use("/api/department", DepartmentRouter);
    this.app.use("/api/contract_attachment", ContractAttachmentRouter);
    this.app.use("/api/user_signature", UserSignatureRouter);
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/contract", ContractRouter);
    this.app.use("/api/contract_signature", ContractSignatureRouter);
    this.app.use("/api/approval_flow" , ApprovalFlowRouter)
    
  }

  private listen(): void {
    this.app.listen(this.appConfig.port, () => {
      console.log(`server started at http://localhost:${this.appConfig.port}`);
    });
  }
}

// tslint:disable-next-line:no-unused-expression
new App();
