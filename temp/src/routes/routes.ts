import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "PROJECT Health Check Passed" });
});

export default router;
