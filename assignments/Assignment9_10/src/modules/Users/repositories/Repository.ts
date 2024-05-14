import { IUser } from "../entities";
import { IUserLogin } from "../entities";
import { USER } from "./modelSchema";

class UserRepository {
  create = async (user: IUser): Promise<IUser> => {
    return await USER.create(user);
  };

  getByEmail = async (email: string): Promise<IUser | null> => {
    return await USER.findOne({email});
  };
}

export { UserRepository };
