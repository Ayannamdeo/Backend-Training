import express, { Request, Response, Router } from "express";
import { UserControllers } from "./Controllers";
import { UserValidation } from "../../lib/middlewares/userValidation";
import { AuthMiddleware } from "../../lib/middlewares/authMiddleware";

class User_Router_Class{
   private static instace: User_Router_Class; 
   router: Router;
    private readonly UserControllers: UserControllers;
    //Role based authorization 

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

        this.router.get('/', AuthMiddleware.restrictTo(["NORMAL", "ADMIN"]), (req: Request,res: Response)=> {
            return res.status(200).json({message: "Accessible by admins and normal users alike"});
        });

        this.router.get(
          "/admin",
          AuthMiddleware.authenticate,
          AuthMiddleware.restrictTo(["ADMIN"]),
          this.UserControllers.getAllUsers
        );
        this.router.delete(
          "/admin/:id",
          AuthMiddleware.authenticate,
          AuthMiddleware.restrictTo(["ADMIN"]),
          this.UserControllers.deleteUser
        );

    }
}

const User_Router = User_Router_Class.getInstance().router;

export {User_Router};


