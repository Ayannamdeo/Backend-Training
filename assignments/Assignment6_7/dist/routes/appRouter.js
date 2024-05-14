"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = __importDefault(require("express"));
const appMiddlewares_1 = require("../middlewares/appMiddlewares");
const appRouterControllers_1 = require("../controllers/appRouterControllers");
class AppRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route("/")
            .all(appMiddlewares_1.Middleware.ValidateJwt)
            .get(appRouterControllers_1.AppRouterControllers.handleGetUsers)
            .post(appMiddlewares_1.Middleware.ValidateFieldLength, appMiddlewares_1.Middleware.ValidateFieldContent, appRouterControllers_1.AppRouterControllers.handleCreateUser);
    }
}
exports.AppRouter = AppRouter;
