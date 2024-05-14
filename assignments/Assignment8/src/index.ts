// Implement seed scripts to store a list of playing countries and save records in the database.

import { Server } from "./server";
import {serverConfig} from './config';

const server: Server = Server.getInstance(serverConfig);
server.run();