import express, { Request, Response } from "express";
import { currentUser, IUserPayload } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-ath";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response): any => {
    return res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
