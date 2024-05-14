import express, { Request, Response, NextFunction, Application } from "express";
import cookieparser from "cookie-parser";
import {AppRouter} from "./routes/appRouter";
import { HealthRoute } from "./routes/healthRoute";
import { Middleware } from "./middlewares/appMiddlewares";

class Server{
  private app: Application;

  constructor(){
    this.app = express();
    this.intializeMiddlewares();
    this.intializeRoutes();
  }

  private intializeMiddlewares(): void{

  this.app.use(cookieparser());
  this.app.use(express.json());
  this.app.use(Middleware.logRequest);
  this.app.use(Middleware.requestLimiter(3));

  this.app.use((req: Request, res: Response, next: NextFunction) => {
    req.headers["X-customRequestHeader"] = "qqqqqqqq";
    res.setHeader("X-customResponseHeader", "ssssss");
    next();
  });
  this.app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers["X-customRequestHeader"]);
    console.log(res.getHeader("X-customResponseHeader"));
    next();
  });

  }

  private intializeRoutes(): void {
    const appRouter = new AppRouter();
    const healthRoute = new HealthRoute();

    this.app.use("/health", healthRoute.router);
    this.app.use("/status", healthRoute.router);
    this.app.use("/getAuthorized", Middleware.generateDummyToken);
    this.app.use("/", appRouter.router);
    this.app.use(Middleware.errorHandle);
  }
  public getApp(): Application{
    return this.app;
  }

}

export default Server;
// const app = express();
// const healthRoute = new HealthRoute();

// const server = () => {
//   app.use(cookieparser());
//   app.use(express.json());

//   app.use("/health", healthRoute.router);
//   app.use("/status", healthRoute.router);

//   app.use(requestLimiter(3));

//   app.use((req: Request, res: Response, next: NextFunction) => {
//     req.headers["X-customRequestHeader"] = "qqqqqqqq";
//     res.setHeader("X-customResponseHeader", "ssssss");
//     next();
//   });
//   app.use((req: Request, res: Response, next: NextFunction) => {
//     console.log(req.headers["X-customRequestHeader"]);
//     console.log(res.getHeader("X-customResponseHeader"));
//     next();
//   });

//   app.use(logRequest);
//   app.use("/getAuthorized", generateDummyToken);
//   app.use("/", appRouter);
//   app.use(errorHandle);
//   return app;
// };

