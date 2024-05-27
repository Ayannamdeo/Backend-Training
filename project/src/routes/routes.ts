import express, { Router, Request, Response } from "express";
import { CRUD_Router, UserRouter } from "../modules";

const router: Router = express.Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Health Check Passed" });
});

router.use("/user", UserRouter);
// router.use('/CRUD', CRUD_Router);

export default router;

