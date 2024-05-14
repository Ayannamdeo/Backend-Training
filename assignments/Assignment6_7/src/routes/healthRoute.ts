import express, { Request, Response } from "express";

class HealthRoute {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/health", this.getHealthCheck);
    this.router.get("/status", this.getStatus);
  }

  private getHealthCheck(req: Request, res: Response) {
    res.status(200).json({ message: "Health Check Passed" });
  }
  private getStatus(req: Request, res: Response) {
    res.status(200).json({ status: "OK" });
  }
}

export { HealthRoute };
