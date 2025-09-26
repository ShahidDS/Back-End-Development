import { z } from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(12, "Name must be at most 12 characters long"),
  age: z
    .number()
    .min(18, "Age must be at least 18")
    .max(100, "Age must be at most 100")
    .optional()
    .default(28),
  email: z
    .string()
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),
});

export type UserInput = z.infer<typeof UserSchema>;
