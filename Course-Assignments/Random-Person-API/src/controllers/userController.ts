import { Request, Response } from "express";
import { UserSchema, UserInput } from "../schemas/userSchema";
import { handleError } from "../utils/errorHandler";

export class UserController {
  static createUser(req: Request, res: Response) {
    try {
      const validatedUser: UserInput = UserSchema.parse(req.body);

      res.status(201).json({
        message: "User created successfully",
        user: validatedUser,
      });
    } catch (error) {
      handleError(error, res, "Validation failed");
    }
  }
}
