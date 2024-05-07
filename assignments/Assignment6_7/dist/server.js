"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const appRouter_1 = require("./routes/appRouter");
const healthRoute_1 = require("./routes/healthRoute");
const appMiddlewares_1 = require("./middlewares/appMiddlewares");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.intializeMiddlewares();
        this.intializeRoutes();
    }
    intializeMiddlewares() {
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(appMiddlewares_1.Middleware.logRequest);
        this.app.use(appMiddlewares_1.Middleware.requestLimiter(3));
        this.app.use((req, res, next) => {
            req.headers["X-customRequestHeader"] = "qqqqqqqq";
            res.setHeader("X-customResponseHeader", "ssssss");
            next();
        });
        this.app.use((req, res, next) => {
            console.log(req.headers["X-customRequestHeader"]);
            console.log(res.getHeader("X-customResponseHeader"));
            next();
        });
    }
    intializeRoutes() {
        const appRouter = new appRouter_1.AppRouter();
        const healthRoute = new healthRoute_1.HealthRoute();
        this.app.use("/health", healthRoute.router);
        this.app.use("/status", healthRoute.router);
        this.app.use("/getAuthorized", appMiddlewares_1.Middleware.generateDummyToken);
        this.app.use("/", appRouter.router);
        this.app.use(appMiddlewares_1.Middleware.errorHandle);
    }
    getApp() {
        return this.app;
    }
}
exports.default = Server;
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
