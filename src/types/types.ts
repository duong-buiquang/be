import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface SystemRequest extends Request {
  user?: JwtPayload | Partial<User>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  orders: string;
  paymentMethods: string;
}

export interface Product {
  id: string;
  name: string;
  title: string;
  rating: number;
  sold: number;
  price: number;
  saleOff: number;
}
