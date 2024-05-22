import { Request, Response } from "express";
import { UserServices } from "./Services";
import { IUser, IUserLogin } from "./entities";
import { serverConfig } from "../../config";

class UserControllers {
  private readonly UserServices: UserServices;

  constructor() {
    this.UserServices = new UserServices();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser: IUser = req.body;

      const existingUser: IUser | null = await this.UserServices.getUserByEmail( newUser.email
      );
      if (existingUser) {
        res.status(401).json({ message: "This user already exists, kindly Login" });
        return;
      }

      const result = await this.UserServices.registerUser(newUser);
      res.status(201).json(result);
      console.log("result: ", result);
      //what will happen here?
      // res.redirect('/login'); 

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: IUserLogin = req.body;

      const existingUser: IUser | null = await this.UserServices.getUserByEmail(
        user.email
      );
      if (!existingUser) {
        res.status(404).json({ message: "No user found for current Email" });
        return;
      }
      // correct password check now
      const comparePassword: Boolean = await UserServices.verifyPassword(user, existingUser!);
      if(!comparePassword){
        res.status(401).json({message: "Invalid Credentials"});
      }

      const token: string = UserServices.generateToken(existingUser!, serverConfig.jwtSecret)
      console.log(token);
      res.cookie("JWT_Token", token);
      
      // res.status(200).send("CHECKPOINT");
      res.redirect('/CRUD');

    } catch (error:any) {
      res.status(500).json({error: error.message, message: "Error while logging in..."})
    }
  };
}

export { UserControllers };
