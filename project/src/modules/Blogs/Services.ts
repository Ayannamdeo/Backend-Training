import { IBlog } from "./entities";

import { BlogRepository } from "./repositories";

class BlogService {
  blogRepository: BlogRepository;

  constructor() {
    this.blogRepository = new BlogRepository();
  }

  getAllContent = async (): Promise<IBlog[] | null> => {
    return await this.blogRepository.getAll();
  };
  getContentById = async (id: number): Promise<IBlog | null> => {
    return await this.blogRepository.getById(id);
  };
  createContent = async (data: IBlog): Promise<IBlog> => {
    return await this.blogRepository.create(data);
  };

  updateContent = async (id: number, data: IBlog): Promise<IBlog | null> => {
    return await this.blogRepository.update(id, data);
  };
  deleteContent = async (id: number): Promise<any> => {
    return await this.blogRepository.delete(id);
  };
}

export { BlogService };

