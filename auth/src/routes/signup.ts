import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

const bodyValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];

router.post(
  "/api/users/signup",
  bodyValidator,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(400).send(errors.array());
      // throw new Error("Invalid email or password");

      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log(email, " - ", password);
    throw new DatabaseConnectionError();

    // new User({email, password})
    res.send("signup");
  }
);

export { router as signupRouter };