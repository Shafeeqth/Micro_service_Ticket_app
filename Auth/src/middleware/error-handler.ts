import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ error: err.serializeErrors() });
  }

  return res.status(400).send({ error: [{ message: "Something went wrong" }] });
};
