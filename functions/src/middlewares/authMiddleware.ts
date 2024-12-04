import { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).send({ success: false, message: "Token is required", data: null });
    return;
  }

  next()
  // try {
  //   await admin.auth().verifyIdToken(token);
  //   next();
  // } catch (error) {
  //   res.status(401).send({ success: false, message: "Unauthorized", data: null });
  //   return;
  // }
};