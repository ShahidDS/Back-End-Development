import { Response } from "express";
import { z } from "zod";

export function handleError(
  error: unknown,
  res: Response,
  defaultMessage: string
) {
  if (error instanceof z.ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  } else if (error instanceof Error) {
    res.status(500).json({
      error: defaultMessage,
      message: error.message,
    });
  } else {
    res.status(500).json({
      error: defaultMessage,
      message: "Unknown error occurred",
    });
  }
}
