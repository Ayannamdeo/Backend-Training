"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("./Controllers");
class User_Router_class {
    constructor() {
        this.router = express_1.default.Router();
        this.userControllers = new Controllers_1.UserControllers();
        this.setRoutes();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new User_Router_class();
        }
        return this.instance;
    }
    setRoutes() {
        this.router.get("/register", this.userControllers.register);
        //
        //
    }
}
const UserRouter = User_Router_class.getInstance().router;
exports.UserRouter = UserRouter;
