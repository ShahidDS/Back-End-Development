import { Request, Response } from "express";
import {
  PastrySchema,
  CreatePastrySchema,
  UpdatePastrySchema,
} from "../schemas/pastrySchema";

// In-memory database for demonstration
let pastries: z.infer<typeof PastrySchema>[] = [
  {
    id: "1",
    name: "Kanelbulle",
    type: "pastry",
    price: 25,
    ingredients: ["flour", "butter", "cinnamon", "sugar", "cardamom"],
    inStock: true,
    description: "Traditional Swedish cinnamon bun",
  },
  {
    id: "2",
    name: "Prinsesstårta",
    type: "cake",
    price: 350,
    ingredients: ["sponge cake", "custard", "whipped cream", "marzipan"],
    inStock: true,
    description: "Classic Princess Cake with green marzipan",
  },
];

export class PastryController {
  // GET /pastries - Get all pastries
  static getAllPastries(req: Request, res: Response) {
    try {
      const validatedPastries = PastrySchema.array().parse(pastries);
      res.json({
        message: "Pastries retrieved successfully",
        count: validatedPastries.length,
        pastries: validatedPastries,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve pastries" });
    }
  }

  // GET /pastries/:id - Get pastry by ID
  static getPastryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pastry = pastries.find((p) => p.id === id);

      if (!pastry) {
        return res.status(404).json({ error: "Pastry not found" });
      }

      const validatedPastry = PastrySchema.parse(pastry);
      res.json({
        message: "Pastry retrieved successfully",
        pastry: validatedPastry,
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid pastry data" });
    }
  }

  // POST /pastries - Create a new pastry
  static createPastry(req: Request, res: Response) {
    try {
      const input = CreatePastrySchema.parse(req.body);
      const newPastry = {
        id: Math.random().toString(36).substr(2, 9), // Simple ID generation
        ...input,
      };

      const validatedPastry = PastrySchema.parse(newPastry);
      pastries.push(validatedPastry);

      res.status(201).json({
        message: "Pastry created successfully",
        pastry: validatedPastry,
      });
    } catch (error) {
      res.status(400).json({
        error: "Validation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // PUT /pastries/:id - Update a pastry
  static updatePastry(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pastryIndex = pastries.findIndex((p) => p.id === id);

      if (pastryIndex === -1) {
        return res.status(404).json({ error: "Pastry not found" });
      }

      const input = UpdatePastrySchema.parse(req.body);
      const updatedPastry = { ...pastries[pastryIndex], ...input };

      const validatedPastry = PastrySchema.parse(updatedPastry);
      pastries[pastryIndex] = validatedPastry;

      res.json({
        message: "Pastry updated successfully",
        pastry: validatedPastry,
      });
    } catch (error) {
      res.status(400).json({
        error: "Validation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // DELETE /pastries/:id - Delete a pastry
  static deletePastry(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pastryIndex = pastries.findIndex((p) => p.id === id);

      if (pastryIndex === -1) {
        return res.status(404).json({ error: "Pastry not found" });
      }

      const deletedPastry = pastries.splice(pastryIndex, 1)[0];
      const validatedPastry = PastrySchema.parse(deletedPastry);

      res.json({
        message: "Pastry deleted successfully",
        pastry: validatedPastry,
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid pastry data" });
    }
  }

  // GET /pastries/type/:type - Get pastries by type
  static getPastriesByType(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const filteredPastries = pastries.filter((p) => p.type === type);

      const validatedPastries = PastrySchema.array().parse(filteredPastries);
      res.json({
        message: `Pastries of type ${type} retrieved successfully`,
        count: validatedPastries.length,
        pastries: validatedPastries,
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid type specified" });
    }
  }
}
