import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validationMiddleware = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const {body} = req.body;
     
      
      try {
        await schema.parseAsync({
          body: body,
        });
        next();
      } catch (error) {
        next(error);
      }
    };
  };
  