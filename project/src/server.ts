import express, { Application } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import { IServerConfig } from "./config";
import { DB_Connection } from "./lib/db/DB_Connection";
import router from "./routes/routes";
import { logger } from "./lib/helpers/logger";
import { ReqLoggger } from "./lib/middlewares/reqLogger";

class Server {
  private static instance: Server;
  private readonly app: Application;
  private readonly config: IServerConfig;
  private readonly db: DB_Connection;

  private constructor(config: IServerConfig) {
    this.app = express();
    this.config = config;
    this.db = DB_Connection.getInstance(this.config.mongoUrl);
  }

  public static getInstance(config: IServerConfig): Server {
    if (!Server.instance) {
      Server.instance = new Server(config);
      Server.instance.bootstrap();
    }
    return Server.instance;
  }

  private bootstrap(): void {
    this.configureMiddlewares();
    this.configureRoutes();
    // this.configureErrorHandler();
  }

  private configureMiddlewares(): void {
    this.app.use(ReqLoggger.LogHTTP);
    this.app.use(cors());
    // this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private configureRoutes(): void {
    this.app.use(router);
  }

  // private configureErrorHandler(): void {
  //   this.app.use(errorHandler);
  // }

  connectDB = async (): Promise<void> => {
    await this.db.connect().catch((err) => console.log(err));
  };

  disconnectDB = async (): Promise<void> => {
    await this.db.disconnect().catch((err) => console.log(err));
  };

  run = async (): Promise<void> => {
    await this.connectDB();
    logger.info("after connectDB");

    this.app.listen(this.config.port, () => {
      logger.info(`Node server started at port: ${this.config.port}`);
    });
  };
}

export { Server };
