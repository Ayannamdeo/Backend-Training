import express, { Router , Request, Response} from "express";

const router: Router = express.Router();

// router.use('/country', countryRouter);
router.get('/health', (req: Request, res: Response)=>{
    res.status(200).json({ message: "Health Check Passed" });
    })

export default router;