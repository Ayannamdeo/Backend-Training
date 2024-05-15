import { ICRUD } from "./entities/ICRUD";
import { CRUD_Repository } from "./repositories";

class CRUD_Service{
  CRUD_Repository: CRUD_Repository;

  constructor(){
    console.log("inside crud_service constructor");
    this.CRUD_Repository = new CRUD_Repository();
  }

  getAllContent = async (): Promise<ICRUD[] | null> => {
    console.log("inside CRUD_Service - getallcontent");
    
    return await this.CRUD_Repository.getAll();
  }
  getContentById = async (id: number): Promise<ICRUD | null> => {
    return await this.CRUD_Repository.getById(id);
  }
  createContent = async (data: ICRUD): Promise<ICRUD> => {
    return await this.CRUD_Repository.create(data);
  }

  updateContent = async (id: number, data: ICRUD): Promise<ICRUD | null> =>{
    return await this.CRUD_Repository.update(id, data);
  }
  deleteContent = async (id: number): Promise<any> =>{
    return await this.CRUD_Repository.delete(id)
  }
}

export{CRUD_Service};