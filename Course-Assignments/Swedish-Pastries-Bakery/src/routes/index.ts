import { Router } from "express";
import pastryRoutes from "./pastries.js";

const router = Router();

router.use("/pastries", pastryRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    message: "Swedish Pastries Bakery API is running!",
    timestamp: new Date().toISOString(),
  });
});

export default router;
