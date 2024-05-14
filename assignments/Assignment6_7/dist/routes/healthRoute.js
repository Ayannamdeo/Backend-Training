"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRoute = void 0;
const express_1 = __importDefault(require("express"));
class HealthRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/health", this.getHealthCheck);
        this.router.get("/status", this.getStatus);
    }
    getHealthCheck(req, res) {
        res.status(200).json({ message: "Health Check Passed" });
    }
    getStatus(req, res) {
        res.status(200).json({ status: "OK" });
    }
}
exports.HealthRoute = HealthRoute;
