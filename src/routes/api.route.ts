import express, { Request, Response, NextFunction, Application } from 'express';
import { fetchUserData, updateUserData } from '../controllers/api.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { globalMiddleware } from '../middlewares/globalMiddleware';

const router = express.Router();

// router.get("/get-token", globalMiddleware, async (req: Request, res: Response) => {
//     await generateToken(req, res);
// });

router.get("/fetch-user-data", globalMiddleware, authMiddleware, async (req: Request, res: Response) => {
    await fetchUserData(req, res);
});

router.post("/update-user-data", globalMiddleware, authMiddleware, async (req: Request, res: Response) => {
    await updateUserData(req, res);
});

export default router;