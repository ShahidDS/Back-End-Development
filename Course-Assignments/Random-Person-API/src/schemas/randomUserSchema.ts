import { z } from "zod";

export const RandomUserSchema = z.object({
  results: z.array(
    z.object({
      name: z.object({
        title: z.string(),
        first: z.string(),
        last: z.string(),
      }),
      location: z.object({
        country: z.string(),
        city: z.string(),
        postcode: z
          .union([z.string(), z.number()])
          .transform((val) => val.toString()),
      }),
      login: z.object({
        username: z.string(),
      }),
      registered: z.object({
        date: z.string().datetime(),
      }),
    })
  ),
});

export type RandomUserApiResponse = z.infer<typeof RandomUserSchema>;
