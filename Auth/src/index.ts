import express from "express";
import { currentUserRouter } from "./routes/current-user";
import { signinUser } from "./routes/signin";
import { signoutUser } from "./routes/signout";
import { signupUser } from "./routes/signup";
import { errorHandler } from "../middleware/error-handler";
import { NotFound } from "../errors/not-found-error";

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signinUser);
app.use(signoutUser);
app.use(signupUser);

app.get("*", () => {
  throw new NotFound();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening at post: 3000!");
});
