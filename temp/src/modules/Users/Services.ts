import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

import { IUser, IUserLogin } from "./entities";
import { UserRepository } from "./repositories";

class UserServices {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  getAllUsers = async (): Promise<IUser[] | null> => {
    return await this.userRepository.getAll();
  };

  deleteUser = async (email: string): Promise<any> => {
    return await this.userRepository.delete(email);
  };

  getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await this.userRepository.getByEmail(email);
  };

  registerUser = async (user: IUser): Promise<IUser> => {
    const saltRounds: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(user.password, saltRounds);

    return await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
  };

  static generateJwtToken = (existingUser: IUser, jwtsecret: string) => {
    return JWT.sign({ userName: existingUser.name }, jwtsecret, {
      expiresIn: 20,
    });
  };

  static verifyPassword = async (
    currentUser: IUserLogin,
    existingUser: IUser,
  ): Promise<Boolean> => {
    return await bcrypt.compare(currentUser.password, existingUser.password);
  };

  // liking the blog
}

export { UserServices };
