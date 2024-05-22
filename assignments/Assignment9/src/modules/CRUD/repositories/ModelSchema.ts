import mongoose from 'mongoose';
import { ICRUD } from '../entities';

const crudSchema: mongoose.Schema<ICRUD> = new mongoose.Schema<ICRUD>(
    {
        _id: {type: Number, required: true, uniue: true},
        title: {type: String, required: true},
        body: {type: String, required: true}
    }, 
    {timestamps: true}
);

const crudModel = mongoose.model("crud", crudSchema);

export {crudModel};



