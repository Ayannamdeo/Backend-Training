import { CRUD_Controllers } from "./Controllers";
import express, { Request, Response, Router } from 'express';

class CRUD_Router_Class{
    private static instance: CRUD_Router_Class;
    router: Router;
    private readonly CRUD_Controllers: CRUD_Controllers;

    private constructor(){
        
        this.router = express.Router();
        this.CRUD_Controllers = new CRUD_Controllers();
        this.setupRoutes();
        
    }
    
    static getInstance(): CRUD_Router_Class{
        if(!CRUD_Router_Class.instance){
            CRUD_Router_Class.instance = new CRUD_Router_Class();
        }
        return CRUD_Router_Class.instance;
    }

    private setupRoutes(): void{
        this.router.get('/', this.CRUD_Controllers.getAllContent);
    //    this.router.get('/', (req: Request, res: Response) => this.CRUD_Controllers.getAllContent(req, res));
        this.router.get('/:id', this.CRUD_Controllers.getContentById)

        this.router.post('/', this.CRUD_Controllers.createContent);

        this.router.put('/:id', this.CRUD_Controllers.updateContent);

        this.router.delete('/:id', this.CRUD_Controllers.deleteContent);
    }
}
const CRUD_Router_Class_instance: CRUD_Router_Class =  CRUD_Router_Class.getInstance();
const CRUD_Router = CRUD_Router_Class_instance.router;

export{CRUD_Router};