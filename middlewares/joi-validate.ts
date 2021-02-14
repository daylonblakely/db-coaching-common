import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { JoiRequestValidationError } from "../errors/joi-validation-error";

export const validateSchema = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new JoiRequestValidationError(error);
    }

    next();
  };
};
