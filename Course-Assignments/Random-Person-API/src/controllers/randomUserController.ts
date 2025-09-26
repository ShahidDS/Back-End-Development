import { Request, Response } from "express";
import { RandomUserService } from "../services/randomUserService";
import { handleError } from "../utils/errorHandler";

export class RandomUserController {
  static async getRandomPerson(req: Request, res: Response) {
    try {
      const validatedData = await RandomUserService.fetchRandomUser();
      const user = validatedData.results[0];

      const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;

      res.json({
        fullName,
        country: user.location.country,
      });
    } catch (error) {
      handleError(error, res, "Failed to fetch random person");
    }
  }

  static async getRandomLogin(req: Request, res: Response) {
    try {
      const validatedData = await RandomUserService.fetchRandomUser();
      const user = validatedData.results[0];

      const registeredDate = new Date(user.registered.date)
        .toISOString()
        .split("T")[0];
      const summary = `${user.login.username} (registered on ${registeredDate})`;

      res.json({
        username: user.login.username,
        registeredDate: registeredDate,
        summary: summary,
      });
    } catch (error) {
      handleError(error, res, "Failed to fetch login info");
    }
  }

  static async getRandomAddress(req: Request, res: Response) {
    try {
      const validatedData = await RandomUserService.fetchRandomUser();
      const user = validatedData.results[0];

      res.json({
        city: user.location.city,
        postcode: user.location.postcode,
      });
    } catch (error) {
      handleError(error, res, "Failed to fetch address");
    }
  }
}
