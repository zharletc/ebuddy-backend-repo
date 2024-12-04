import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const globalMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // AUTHENTICATION: $2b$10$WigDg5zlt0rtL/hMLKPh8OTuqjEFZRkP27wc7NjsWdeomGHwc2tD6
  const token = req.headers.authorization?.split(' ')[1];
  const authentication: any = req.headers.authentication;

  const authKey = 'EBUDDY.2024';
  
  if (!authentication) {
    res.status(403).send({ success: false, message: "Authentication is required", data: null });
    return;
  }

  // CHECK HASH AUTHKEY
  const isMatch = await bcrypt.compare(authKey, authentication);
  if (!isMatch) {
    res.status(403).send({ success: false, message: "Authentication is invalid", data: null });
    return;
  }

  if (!token) {
    res.status(403).send({ success: false, message: "Token is required", data: null });
    return;
  }

  try {
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Unauthorized", data: null });
    return;
  }

};