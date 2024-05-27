import express, { Application } from "express";
import helmet from "helmet";

import cookieParser from "cookie-parser";

import { DB_connection } from "./lib/db/DBconnection";
import { IServerConfig } from "./config";
import router from "./routes/routes";

class Server {
  private static instance: Server;
  private readonly db: DB_connection;
  private readonly app: Application;
  private readonly config: IServerConfig;

  private constructor(config: IServerConfig) {
    this.app = express();
    this.config = config;
    this.db = DB_connection.getInstance(this.config.mongoURL);
  }

  public static getInstance(config: IServerConfig): Server {
    if (!Server.instance) {
      Server.instance = new Server(config);
      Server.instance.bootsrap();
    }
    return Server.instance;
  }

  private bootsrap(): void {
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private configureRoutes(): void {
    this.app.use(router);
  }

  connectDB = async (): Promise<void> => {
    await this.db.connect().catch((err) => console.log(err));
  };

  disconnectDB = async (): Promise<void> => {
    await this.db.disconnect().catch((err) => console.log(err));
  };

  run = async (): Promise<void> => {
    await this.connectDB();

    this.app.listen(this.config.port, () => {
      console.log(
        `Node server for PROJECT started at port: ${this.config.port}`,
      );
    });
  };
}

export { Server };
