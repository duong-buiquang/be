import { NextFunction, Request, Response } from 'express';
import { SystemRequest } from '../types/types';
import { verifyToken } from '../utils/helper';

export const userMiddleware = (
  req: SystemRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const user = verifyToken(token);
      req.user = user;
      console.log(user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ status: 'fail', result: null, message: 'ok' });
    }
  } else {
    res.status(401).json({ status: 'fail', result: null, message: 'ok' });
  }
};
