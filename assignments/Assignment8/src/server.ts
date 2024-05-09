import express, {Application, Request, Response} from 'express';
import {IServerConfig} from './config'
import { DB_Connection } from './lib/db/DB_Connection';
import {SeedCountry} from './modules/Country/SeedCountry'
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
      Server.instance.bootStrap();
    }
    return Server.instance;
  }

  private bootStrap(): void {
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    this.app.use(router);
  }

  async connectDB(): Promise<void> {
    console.log("trying to connectDB");
    
    await this.db.connect().catch((err) => console.log(err));
  }

  async disconnectDB(): Promise<void> {
    await this.db.diconnect().catch((err) => console.log(err));
  }

  async run(): Promise<void> {
    //connect to mongoDB
    await this.connectDB();
    console.log("after connectDB");
    

    //seeding logic
    await SeedCountry.initialSeed().catch((err) =>
      console.log(`error occurred while seeding: ${err}`)
    );
    //

    this.app.listen(this.config.port, () => {
      console.log(`Node server started at port: ${this.config.port}`);
    });
  }
}

export{Server};