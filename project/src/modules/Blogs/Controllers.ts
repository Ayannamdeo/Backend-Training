import { logger } from "../../lib/helpers/logger";
import { Request, Response } from "express";
import { BlogService } from "./Services";

class BlogControllers {
  private readonly blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  getAllContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const contentList = await this.blogService
        .getAllContent()
        .catch((err) => console.log("errrrrr", err));

      if (!contentList || contentList.length === 0) {
        logger.warn("no content in db");
        res.status(404).json({ message: "no content in db" });
      } else {
        res.json(contentList);
      }
    } catch (error: any) {
      logger.error("error in getAll Api", error);
      res.status(500).json({ message: error.message });
    }
  };
  getContentById = async (req: Request, res: Response): Promise<void> => {
    try {
      
      const content = await this.blogService.getContentById( req.params.id);
      if (!content) {
        logger.warn("content not found");
        res.status(404).json({ message: "content not found" });
      } else {
        res.status(200).json(content);
      }
    } catch (error: any) {
      logger.error("error in getContentById Api", error);
      res.status(500).json({ message: error.message });
    }
  };

  createContent = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      
      const createdContent = await this.blogService.createContent(req.body);
      res.status(201).json(createdContent);
    } catch (error: any) {
      logger.error("error in createContent Api", error);
      res.status(400).json({ message: error.message });
    }
  };

  updateContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedContent = await this.blogService.updateContent(
        req.params.id,
        req.body,
      );
      if (!updatedContent) {
        logger.warn("ID not found");
        res.status(404).json({ message: "ID not found" });
      }
      res.status(200).json(updatedContent);
    } catch (err: any) {
      logger.error("error in updateContent Api", err);
      res.status(400).json({ message: err.message });
    }
  };

  deleteContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedContent = await this.blogService.deleteContent(
        req.params.id,
      );
      res.status(200).json(deletedContent);
    } catch (err: any) {
      logger.error("error in deleteContent Api", err);
      res.status(500).json({ message: err.message });
    }
  };

  getUserBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const userBlogs = await this.blogService.getUserBlogs(req.params.userid);
      if (!userBlogs || userBlogs.length === 0) {
        logger.warn("No blogs found for this user");
        res.status(404).json({ message: "No blogs found for this user" });
      } else {
        res.status(200).json(userBlogs);
      }
    } catch (error: any) {
      logger.error("error in getUserBlogs Api", error);
      res.status(500).json({ message: error.message });
    }
  };
}

export { BlogControllers };
