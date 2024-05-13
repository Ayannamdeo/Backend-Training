import { Server } from "./server";
import {serverConfig} from "./config";

const server: Server = Server.getInstance(serverConfig);
server.run();