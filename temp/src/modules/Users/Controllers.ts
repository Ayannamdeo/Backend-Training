import { throwDeprecation } from "process";
import { UserServices } from "./Services";
import { Request, Response } from "express";
import { IUser } from "./entities";

class UserControllers {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser: IUser = req.body;
      const existingUser: IUser | null = await this.userServices.getUserByEmail(
        newUser.email,
      );
      if (existingUser) {
        res
          .status(401)
          .json({ message: "This user already exists, kindly Login" });
        return;
      }

      const result = await this.userServices.registerUser(newUser);
      res.status(201).json(result);
    } catch (error: any) {}
  };

  login = async () => {};
}

export { UserControllers };
