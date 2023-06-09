import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../base/BaseController';
import { User } from '../entities/User.entity';
import { inject, injectable } from 'inversify';
import UserService from '../services/users.service';
import { autobind } from 'core-decorators';
import { controller, httpGet } from 'inversify-express-utils';
import { userMiddleware } from '../middlewares/user.middleware';
import { SystemRequest } from '../types/types';

@controller('/users')
export default class UserController {
  constructor(protected readonly userService: UserService) {}

  // findOneUser(req: Request, res: Response, next: NextFunction) {
  //   console.log('hello');
  //   console.log(this);
  //   const data = this.userService.findAll();
  //   console.log(data);
  //   return res.json({ message: 'hello world' });
  // }

  @httpGet('/')
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    // console.log('this');
    const users = await this.userService.findAll();
    // console.log(users);
    // const user = await this.userService.findOneByEmail('duong.bui@gmail.com');
    // console.log(user);
    // this.userService.sayHello();
    return res.json(users);
  }
  @httpGet('/:id', userMiddleware)
  async login(req: SystemRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await this.userService.findOneById(parseInt(id));
    console.log(user);
    if (!user || req?.user?.id !== parseInt(id)) {
      return res
        .status(400)
        .json({ status: 'fail', result: null, message: 'not ok' });
    }
    return res
      .status(200)
      .json({ status: 'success', result: user, message: 'ok' });
  }
}
