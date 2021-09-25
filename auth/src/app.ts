import express from "express";
import cookieSession from "cookie-session";
import cors from "cors";
import { json } from "body-parser";
import "express-async-errors";

import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/singin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true,
};
app.use(cors(corsOptions));

app.use(json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test",
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.get("/", async (req, res) => {
  res.send({ status: "ok" });
});

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
