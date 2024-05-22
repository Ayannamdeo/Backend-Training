import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

import { UserRepository } from "./repositories";
import { IUser, IUserLogin } from "./entities";

class UserServices {
  private UserRepository: UserRepository;

  constructor() {
    this.UserRepository = new UserRepository();
  }

  getAllUsers = async (): Promise<IUser[] | null> => {
    return await this.UserRepository.getAll();
  }
 
  deleteUser = async (id: number): Promise<any >  => {
    return await this.UserRepository.delete(id);
  }

  registerUser = async (user: IUser): Promise<IUser> => {
    const saltRounds: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(user.password, saltRounds);

    return await this.UserRepository.create({
      ...user,
      password: hashedPassword,
    });
  };

  getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await this.UserRepository.getByEmail(email);
  };

  static verifyPassword = async (
    currentUser: IUserLogin,
    existingUser: IUser
  ): Promise<Boolean> => {
    return await bcrypt.compare(currentUser.password, existingUser.password);
  };

  static generateToken = (existingUser: IUser, jwtsecret: string) => {
    return JWT.sign(
      { userId: existingUser._id, role: existingUser.role },
      jwtsecret,
      {
        expiresIn: 100,
      }
    );
  };
}

export { UserServices };
