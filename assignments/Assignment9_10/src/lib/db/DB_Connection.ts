import mongoose from 'mongoose';

class DB_Connection{

    private static instance: DB_Connection;
    mongoUrl: string;

    private constructor(url: string){
        this.mongoUrl = url;
    }

    public static getInstance(mongoUrl: string): DB_Connection{
        if(!DB_Connection.instance){
            DB_Connection.instance = new DB_Connection(mongoUrl + 'CRUD');
            // console.log(`db connection instance created: ${DB_Connection.instance}`);
            console.log("db_connection instance created");
      console.log(DB_Connection.instance);
        }
        return DB_Connection.instance;
    }

    async connect(): Promise <void>{
        try {
            await mongoose.connect(this.mongoUrl);
        } catch (error) {
            throw new Error(`mongodb connection error: ${error}`);
        }
    }

    async disconnect(): Promise <void>{
        try {
            await mongoose.disconnect();
        } catch (error) {
            throw new Error(`mongodb disconnection error: ${error}`);
        }
    }
}

export {DB_Connection};