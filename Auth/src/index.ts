
import { app } from "./app.ts";
import { connectDb } from "./utils/connect-db.ts";

connectDb();

app.listen(3000, () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  console.log("Listening at post: 3000!");
});
