import { ICRUD } from "../entities";
import { crudModel } from "./ModelSchema";

class CRUD_Repository{
    async getAll(): Promise<ICRUD[] | null>{
        return await crudModel.find();
    }
    async getById(id: number): Promise<ICRUD | null>{
        return await crudModel.findById(id);
    }
    async create(data: ICRUD): Promise<ICRUD>{
        return await crudModel.create(data);
    }
    async update(id: number, data: ICRUD): Promise<ICRUD | null>{
        return await crudModel.findByIdAndUpdate(id, data, {new: true});
    }
    async delete(id: number): Promise<any>{
        return await crudModel.findByIdAndDelete(id);
    }
}

export{CRUD_Repository};