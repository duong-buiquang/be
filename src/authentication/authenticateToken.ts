import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SystemRequest } from '../types/types';

export function authenticate(
  req: SystemRequest,
  res: Response,
  next: NextFunction
) {
  console.log('authenticate showed');
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as any;
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
