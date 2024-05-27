import express, { Router } from "express";
import { UserControllers } from "./Controllers";

class User_Router_class {
  private static instance: User_Router_class;
  router: Router;
  private readonly userControllers: UserControllers;

  private constructor() {
    this.router = express.Router();
    this.userControllers = new UserControllers();
    this.setRoutes();
  }

  public static getInstance(): User_Router_class {
    if (!this.instance) {
      this.instance = new User_Router_class();
    }
    return this.instance;
  }
  private setRoutes(): void {
    this.router.get("/register", this.userControllers.register);
    //
    //
  }
}

const UserRouter = User_Router_class.getInstance().router;

export { UserRouter };
