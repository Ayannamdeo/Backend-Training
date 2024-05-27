import mongoose from "mongoose";

class DB_connection {
  private static instance: DB_connection;
  mongoURL: string;

  private constructor(url: string) {
    this.mongoURL = url;
  }

  public static getInstance(URL: string): DB_connection {
    if (!DB_connection.instance) {
      DB_connection.instance = new DB_connection(URL + "bloggerProject");
    }
    return DB_connection.instance;
  }

  connect = async (): Promise<void> => {
    try {
      await mongoose.connect(this.mongoURL);
    } catch (error: any) {
      throw new Error(`mongodb connection error: ${error.message}`);
    }
  };

  disconnect = async (): Promise<void> => {
    try {
      await mongoose.disconnect();
    } catch (error: any) {
      throw new Error(`mongodb disconnection error: ${error.message}`);
    }
  };
}

export { DB_connection };
