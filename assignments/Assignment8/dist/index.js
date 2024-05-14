"use strict";
// Implement seed scripts to store a list of playing countries and save records in the database.
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const config_1 = require("./config");
const server = server_1.Server.getInstance(config_1.serverConfig);
server.run();
