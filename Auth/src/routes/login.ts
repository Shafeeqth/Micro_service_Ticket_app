import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials.");
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials.");
    }
     // Generate JWT
     const userJwt = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET!
      );
  
      // Store jwt to session
      req.session = {
        jwt: userJwt,
      };
  
      res.status(201).send(existingUser);

  }
);

export { router as signinUser };
