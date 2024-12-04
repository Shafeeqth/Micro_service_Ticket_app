import express, { Request, Response } from "express";
import { body, ValidationError, validationResult } from "express-validator";
import { User } from "../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middleware/validate-request";

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
  validateRequest,
  async (req: Request, res: Response): Promise<any> => {
   
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already exist.");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!
    );

    // Store jwt to session
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
  
);

export { router as signupUser };
