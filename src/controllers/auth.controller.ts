import { ok } from 'assert';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { injectable } from 'inversify';
import { BaseMiddleware, controller, httpPost } from 'inversify-express-utils';
import { sign } from 'jsonwebtoken';
import { authenticate } from '../authentication/authenticateToken';
import { User } from '../entities/User.entity';
import AuthService from '../services/auth.service';
import UserService from '../services/users.service';
import { hashPassword } from '../utils/helper';

@controller('/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @httpPost('/signup')
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      return res.status(401).json({ status: ok, result: null, message: 'ok' });
    }

    const hashedPassword = hashPassword(password, process.env.JWT_SECRET || '');
    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      orders: [],
    };
    const user = await this.userService.createUser(newUser);
    const token = sign(user, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });
    return res
      .status(200)
      .json({ status: ok, result: { token }, message: 'ok' });
  }

  @httpPost('/login')
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await this.authService.authenticate(email, password);
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email or password was incorrect', result: null });
    }
    const token = sign({ user }, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });
    return res.status(200).json({ status: 'ok', token, message: 'ok' });
  }
}
