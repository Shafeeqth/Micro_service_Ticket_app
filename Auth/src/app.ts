import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user.ts";
import { signinUser } from "./routes/login.ts";
import { signoutUser } from "./routes/logout.ts";
import { signupUser } from "./routes/register.ts";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);

app.use(currentUserRouter);
app.use(signinUser);
app.use(signoutUser);
app.use(signupUser);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
