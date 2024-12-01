import express, { Request, Response } from "express";
import { body, ValidationError, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ max: 20, min: 4 })
      .withMessage("Password must be between 4 and 5 characters"),
  ],
  (req: Request, res: Response): any => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    throw new DatabaseConnectionError() ;

    res.send("Hello");
  }
);

export { router as signupUser };
