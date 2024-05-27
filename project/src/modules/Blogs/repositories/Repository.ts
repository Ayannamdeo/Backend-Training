import { IBlog } from "../entities";
import { blogModel } from "./ModelSchema";

class BlogRepository {
  async getAll(): Promise<IBlog[] | null> {
    return await blogModel.find();
  }
  async getById(id: number): Promise<IBlog | null> {
    return await blogModel.findById(id);
  }
  async create(data: IBlog): Promise<IBlog> {
    return await blogModel.create(data);
  }
  async update(id: number, data: IBlog): Promise<IBlog | null> {
    return await blogModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: number): Promise<any> {
    return await blogModel.findByIdAndDelete(id);
  }
}

export { BlogRepository };

