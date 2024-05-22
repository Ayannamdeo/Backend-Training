"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Router = void 0;
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("./Controllers");
const userValidation_1 = require("../../lib/middlewares/userValidation");
class User_Router_Class {
    //authentication and authorization middlwares
    constructor() {
        this.router = express_1.default.Router();
        this.UserControllers = new Controllers_1.UserControllers();
        this.setupRoutes();
    }
    static getInstance() {
        if (!this.instace) {
            this.instace = new User_Router_Class();
        }
        return this.instace;
    }
    setupRoutes() {
        this.router.post('/register', userValidation_1.UserValidation.register, this.UserControllers.register);
        this.router.post('/login', userValidation_1.UserValidation.login, this.UserControllers.login);
    }
}
const User_Router = User_Router_Class.getInstance().router;
exports.User_Router = User_Router;
