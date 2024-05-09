
import mongoose from "mongoose";

class DB_Connection {
  private static instance: DB_Connection;
  mongoUrl: string;

  private constructor(url: string) {
    this.mongoUrl = url;
  }

  public static getInstance(mongoUrl: string): DB_Connection {
    if (!DB_Connection.instance) {
      DB_Connection.instance = new DB_Connection(mongoUrl+'CountrySeed');
      console.log("db_connection instance created");
      console.log(DB_Connection.instance);
    }
    return DB_Connection.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUrl);
    } catch (error) {
      throw new Error("Mongodb connection Error: " + error);
    }
  }

    public async diconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (error) {
      throw new Error("Mongodb disconnection Error: " + error);
    }
  }
}

export {DB_Connection};