import { NextFunction, Request, Response } from 'express';

export abstract class BaseMiddleware {
  public abstract exercute(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void>;
}
