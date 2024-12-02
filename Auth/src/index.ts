import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user.ts"
import { signinUser } from "./routes/login.ts";
import { signoutUser } from "./routes/logout.ts";
import { signupUser } from "./routes/register.ts";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { connectDb } from "./utils/connect-db.ts";

const app = express();
connectDb();

app.use(express.json());

app.use(currentUserRouter);
app.use(signinUser);
app.use(signoutUser);
app.use(signupUser);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler); 

app.listen(3000, () => {
  console.log("Listening at post: 3000!");
});
