import { USER } from "./modelSchema";
import { IUser } from "../entities";

class UserRepository {
  getAll = async (): Promise<IUser[] | null> => {
    return await USER.find();
  };

  create = async (user: IUser): Promise<IUser> => {
    return await USER.create(user);
  };

  getByEmail = async (email: string): Promise<IUser | null> => {
    return await USER.findOne({ email });
  };

  delete = async (email: string): Promise<any | null> => {
    return await USER.findByIdAndDelete({ email });
  };
}

export { UserRepository };
