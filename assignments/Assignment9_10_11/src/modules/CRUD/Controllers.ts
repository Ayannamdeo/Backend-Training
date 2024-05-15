
import { Request, Response } from "express";
import { CRUD_Service } from "./Services";

class CRUD_Controllers {
  private readonly CRUD_Service: CRUD_Service;

  constructor() {
    this.CRUD_Service = new CRUD_Service();
  }

  getAllContent = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("inside CRUD_Controller getAllContent()");
      const contentList = await this.CRUD_Service.getAllContent().catch((err) => console.log("errrrrr", err));
      // console.log("contentList", contentList);

      if (!contentList || contentList.length === 0) {
        // console.log("no contentlist in db");
        res.status(404).json({ message: "no content in db" });
      } else {
        res.json(contentList);
      }
    } catch (error: any) {
      // console.log("inside CRUD_Controllers getallContent catch block");
      res.status(500).json({ message: error.message });
    }
  };
  getContentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const content = await this.CRUD_Service.getContentById(
        parseInt(req.params.id, 10)
      );
      if (!content) {
        res.status(404).json({ message: "content not found" });
      } else {
        res.status(200).json(content);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  createContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const createdContent = await this.CRUD_Service.createContent(req.body);
      res.status(201).json(createdContent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  updateContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedContent = await this.CRUD_Service.updateContent(
        parseInt(req.params.id, 10),
        req.body
      );
      if (!updatedContent) {
        res.status(404).json({ message: "ID not found" });
      }
      res.status(200).json(updatedContent);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  deleteContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedContent = await this.CRUD_Service.deleteContent(
        parseInt(req.params.id, 10)
      );
      res.status(200).json(deletedContent);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
}

export { CRUD_Controllers };


// import { Request, Response } from "express";
// import { CRUD_Service } from "./Services";

// class CRUD_Controllers {
//   private readonly CRUD_Service: CRUD_Service;

//   constructor() {
//     console.log("inside crud_controller constructor");
//     this.CRUD_Service = new CRUD_Service();
//     console.log("crud_service instantiated: ", this.CRUD_Service);
    
//     // Bind methods to the instance
//     this.getAllContent = this.getAllContent.bind(this);
//     this.getContentById = this.getContentById.bind(this);
//     this.createContent = this.createContent.bind(this);
//     this.updateContent = this.updateContent.bind(this);
//     this.deleteContent = this.deleteContent.bind(this);
//   }
  
//   async getAllContent(req: Request, res: Response): Promise<void> {
//     try {
//       console.log("inside CRUD_Controller getAllContent()");
//       const contentList = await this.CRUD_Service.getAllContent();
//       console.log("contentList", contentList);

//       if (!contentList) {
//         console.log("no contentlist in db");
//         res.status(404).json({ message: "no content in db" });
//       } else {
//         res.json(contentList);
//       }
//     } catch (error: any) {
//       console.log("inside CRUD_Controllers getAllContent catch block");
//       res.status(500).json({ message: error.message });
//     }
//   }
//   async getContentById(req: Request, res: Response): Promise<void> {
//     try {
//       const content = await this.CRUD_Service.getContentById(
//         parseInt(req.params.id, 10)
//       );
//       if (!content) {
//         res.status(404).json({ message: "content not found" });
//       } else {
//         res.status(200).json(content);
//       }
//     } catch (error: any) {
//       res.status(500).json({ message: error.message });
//     }
//   }
//   async createContent(req: Request, res: Response): Promise<void> {
//     try {
//       const createdContent = await this.CRUD_Service.createContent(req.body);
//       res.status(201).json(createdContent);
//     } catch (error: any) {
//       res.status(400).json({ message: error.message });
//     }
//   }
//   async updateContent(req: Request, res: Response): Promise<void> {
//     try {
//       const updatedContent = await this.CRUD_Service.updateContent(
//         parseInt(req.params.id, 10),
//         req.body
//       );
//       if (!updatedContent) {
//         res.status(404).json({ message: "ID not found" });
//       }
//       res.status(200).json(updatedContent);
//     } catch (err: any) {
//       res.status(400).json({ message: err.message });
//     }
//   }
//   async deleteContent(req: Request, res: Response): Promise<void> {
//     try {
//       const deletedContent = await this.CRUD_Service.deleteContent(
//         parseInt(req.params.id, 10)
//       );
//       res.status(200).json(deletedContent);
//     } catch (err: any) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// }

// export { CRUD_Controllers };

// import { Request, Response } from "express";
// import { CRUD_Service } from "./Services";

// class CRUD_Controllers {
//   private readonly CRUD_Service: CRUD_Service;

//   constructor() {
//     console.log("inside crud_controller constructor");
    
//     this.CRUD_Service = new CRUD_Service();
//     console.log("crud_sevice instatiated: ", this.CRUD_Service);
//   }

//   async getAllContent(req: Request, res: Response): Promise<void> {
//     try {
//       console.log("inside CRUD_Controller getAllContent()");
//       console.log("this: ", this);

//       const contentList = await this.CRUD_Service.getAllContent().catch(err=> console.log("errrrrr",err));
//       console.log("contentList", contentList);

//       if (!contentList) {
//         console.log("no contentlist in db");

//         res.status(404).json({ message: "no content in db" });
//       } else {
//         res.json(contentList);
//       }
//     } catch (error: any) {
//       console.log("inside CRUD_Controllers getallContent catch block");
//       res.status(500).json({ message: error.message });
//     }
//   }
//   async getContentById(req: Request, res: Response): Promise<void> {
//     try {
//       const content = await this.CRUD_Service.getContentById(
//         parseInt(req.params.id, 10)
//       );
//       if (!content) {
//         res.status(404).json({ message: "content not found" });
//       } else {
//         res.status(200).json(content);
//       }
//     } catch (error: any) {
//       res.status(500).json({ message: error.message });
//     }
//   }
//   async createContent(req: Request, res: Response): Promise<void> {
//     try {
//       const createdContent = await this.CRUD_Service.createContent(req.body);
//       res.status(201).json(createdContent);
//     } catch (error: any) {
//       res.status(400).json({ message: error.message });
//     }
//   }
//   async updateContent(req: Request, res: Response): Promise<void> {
//     try {
//       const updatedContent = await this.CRUD_Service.updateContent(
//         parseInt(req.params.id, 10),
//         req.body
//       );
//       if (!updatedContent) {
//         res.status(404).json({ message: "ID not found" });
//       }
//       res.status(200).json(updatedContent);
//     } catch (err: any) {
//       res.status(400).json({ message: err.message });
//     }
//   }
//   async deleteContent(req: Request, res: Response): Promise<void> {
//     try {
//       const deletedContent = await this.CRUD_Service.deleteContent(
//         parseInt(req.params.id, 10)
//       );
//       res.status(200).json(deletedContent);
//     } catch (err: any) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// }

// export { CRUD_Controllers };
