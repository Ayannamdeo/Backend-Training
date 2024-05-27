import dotenv from "dotenv";
import { IServerConfig } from "./IConfig";

dotenv.config();

const serverConfig: IServerConfig = Object.freeze({
  devmode: process.env.DEV_MODE ?? "development",
  port: parseInt(process.env.PORT ?? "8080", 10),
  jwtSecret: process.env.JWT_SECRET ?? "",
  mongoURL: process.env.MONGO_URL ?? "",
});

export { serverConfig };
