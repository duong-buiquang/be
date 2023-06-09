import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/User.entity';
import crypto from 'crypto';

export function hashPassword(password: string, secretKey: string): string {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(password);
  const hashedPassword = hmac.digest('hex');
  return hashedPassword;
}

export function comparePassword(password: string, hash: string): boolean {
  return password === hash;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as any;
    return decoded.user;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
