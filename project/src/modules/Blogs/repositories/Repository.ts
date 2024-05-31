import { IBlog } from "../entities";
import { blogModel } from "./ModelSchema";

class BlogRepository {
  async getAll(): Promise<IBlog[] | null> {
    return await blogModel.find();
  }
  async getById(id: string): Promise<IBlog | null> {
    return await blogModel.findById(id);
  }
  async create(data: IBlog): Promise<IBlog> {
    return await blogModel.create(data);
  }
  async update(id: string, data: IBlog): Promise<IBlog | null> {
    return await blogModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any> {
    return await blogModel.findByIdAndDelete(id);
  }
  
  async getByUser(userId: string): Promise<IBlog[] | null> {
    return await blogModel.find({ user: userId });
  }
}

export { BlogRepository };

