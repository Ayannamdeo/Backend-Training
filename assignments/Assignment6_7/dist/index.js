"use strict";
// Establish health check routes using classes.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Refactor all previous code to incorporate classes and interfaces.
const server_1 = __importDefault(require("./server"));
const PORT = 3000;
const app = new server_1.default();
app.getApp().listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
