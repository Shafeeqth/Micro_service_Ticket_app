import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public reasons: ValidationError[]) {
    super("Request validation error");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.reasons.map((error) => {
      return {
        message: error.msg,
        field: error?.type == "field" ? error.path : undefined,
      };
    });
  }
}
