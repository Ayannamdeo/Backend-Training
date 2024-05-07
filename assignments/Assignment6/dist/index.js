"use strict";
// Incorporate the TypeSCript with the previous code.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const server = require('./src/server');
const server_1 = __importDefault(require("./server"));
const PORT = 3000;
(0, server_1.default)().listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
