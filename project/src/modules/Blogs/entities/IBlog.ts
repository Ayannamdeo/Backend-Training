import { Types } from "mongoose";
interface IBlog {
  title: string;
  body: string;
  user: Types.ObjectId;
  userName: string;
  imageUrl: string;
}

export { IBlog };
