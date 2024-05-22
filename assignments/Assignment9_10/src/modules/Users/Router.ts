import express, { Router } from "express";
import { UserControllers } from "./Controllers";
import { UserValidation } from "../../lib/middlewares/userValidation";

class User_Router_Class{
   private static instace: User_Router_Class; 
   router: Router;
    private readonly UserControllers: UserControllers;
//authentication and authorization middlwares
    private constructor(){
        this.router = express.Router();
        this.UserControllers = new UserControllers();
        this.setupRoutes();
    }

    static getInstance(): User_Router_Class{
        if(!this.instace){
            this.instace = new User_Router_Class();
        }
        return this.instace;
    }

    private setupRoutes():void {
        this.router.post('/register',UserValidation.register, this.UserControllers.register); 
        this.router.post('/login',UserValidation.login, this.UserControllers.login); 
    }
}

const User_Router = User_Router_Class.getInstance().router;

export {User_Router};


