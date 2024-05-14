import express, { Application } from 'express';
import cookieParser from 'cookie-parser';

import { IServerConfig } from './config';
import { DB_Connection } from './lib/db/DB_Connection';
import router from './routes/routes';

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
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private configureRoutes(): void {
    this.app.use(router);
  }

  connectDB = async (): Promise<void> =>{
    console.log("trying to connect db");
    await this.db.connect().catch((err) => console.log(err));
  }

  disconnectDB = async (): Promise<void> =>{
    await this.db.disconnect().catch((err) => console.log(err));
  }

  run = async (): Promise<void> =>{
    await this.connectDB();
    console.log("after connectDB");

    this.app.listen(this.config.port, () => {
      console.log(`Node server started at port: ${this.config.port}`);
    });
  }
}

export {Server};