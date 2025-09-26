import {
  RandomUserSchema,
  RandomUserApiResponse,
} from "../schemas/randomUserSchema";

export class RandomUserService {
  static async fetchRandomUser(): Promise<RandomUserApiResponse> {
    const response = await fetch("https://randomuser.me/api/");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return RandomUserSchema.parse(data);
  }
}
