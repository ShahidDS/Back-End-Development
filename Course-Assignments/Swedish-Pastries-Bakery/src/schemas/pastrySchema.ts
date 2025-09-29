import { z } from "zod";

// Zod schema for pastry validation
export const PastrySchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  name: z
    .string()
    .min(2, "Pastry name must be at least 2 characters long")
    .max(50, "Pastry name must be at most 50 characters long")
    .regex(
      /^[a-zA-ZåäöÅÄÖ\s]+$/,
      "Pastry name can only contain letters and spaces"
    ),
  type: z.enum(["cake", "cookie", "bread", "pastry"], {
    errorMap: () => ({
      message: "Type must be one of: 'cake', 'cookie', 'bread', 'pastry'",
    }),
  }),
  price: z
    .number()
    .positive("Price must be a positive number")
    .max(1000, "Price cannot exceed 1000 SEK"),
  ingredients: z
    .array(z.string())
    .min(1, "At least one ingredient is required")
    .max(20, "Maximum 20 ingredients allowed"),
  inStock: z.boolean().default(true),
  description: z
    .string()
    .max(200, "Description must be at most 200 characters long")
    .optional(),
});

// Schema for creating a new pastry (without id)
export const CreatePastrySchema = PastrySchema.omit({ id: true });

// Schema for updating a pastry (all fields optional)
export const UpdatePastrySchema = CreatePastrySchema.partial();

// Type inference from Zod schemas
export type Pastry = z.infer<typeof PastrySchema>;
export type CreatePastryInput = z.infer<typeof CreatePastrySchema>;
export type UpdatePastryInput = z.infer<typeof UpdatePastrySchema>;
