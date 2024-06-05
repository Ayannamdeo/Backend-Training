import { Types } from "mongoose";
import { IBlog } from "../entities";
import { blogModel } from "./ModelSchema";

class BlogRepository {
  async getAll(
    offset: number,
    limit: number,
    sort: string,
  ): Promise<IBlog[] | null> {
    return await blogModel
      .find()
      .sort({ [sort]: -1 })
      .skip(offset)
      .limit(limit);
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

  async docCount(): Promise<number> {
    return await blogModel.countDocuments();
  }

  async likeUnlike(userId: string, postId: string): Promise<IBlog | null> {
    console.log("inside likeUnlike repository");

    console.log("postId", postId);
    const post = await blogModel.findById(postId);
    console.log("logging post after findByid(postId): ", post);
    if (!post) return null;
    // console.log("logging post after findByid(postId): ", post);

    const userObjectId = new Types.ObjectId(userId);
    const index = post.likes.indexOf(userObjectId);

    if (index === -1) {
      post.likes.push(userObjectId);
    } else {
      post.likes.splice(index, 1);
    }

    console.log("logging post before save : ", post);
    await post.save();
    return post;
  }
}

export { BlogRepository };
