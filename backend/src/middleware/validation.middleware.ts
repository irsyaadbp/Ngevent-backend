import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import HttpException from "../common/http-exception";

export default function validationMiddleware<T>(type: any): RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) =>
            Object.values(error.constraints || {})
          )
          .join(", ");
        next(new HttpException(400, message, message));
      } else {
        next();
      }
    });
  };
}
