import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catch-async';

export const validationMiddleware = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req.body;

    await schema.parseAsync({
      body: body,
      cookies: req.cookies
    });
    next();
  });
};
