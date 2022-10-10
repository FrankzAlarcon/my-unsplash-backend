import { NextFunction, Request, Response } from 'express';
import {ObjectSchema} from 'joi';

export function validationHandler(schema: ObjectSchema, property: 'params' | 'body' | 'query') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], {abortEarly: false});
    if (error) {
      return res.status(400).json({message: error.message});
    }
    next();
  }
}