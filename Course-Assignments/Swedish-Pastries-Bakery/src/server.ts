import express from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Swedish Pastries Bakery Management System",
    endpoints: {
      health: "/api/health",
      allPastries: "/api/pastries (GET)",
      pastryById: "/api/pastries/:id (GET)",
      pastriesByType: "/api/pastries/type/:type (GET)",
      createPastry: "/api/pastries (POST)",
      updatePastry: "/api/pastries/:id (PUT)",
      deletePastry: "/api/pastries/:id (DELETE)",
    },
    description: "Manage your Swedish bakery inventory with this API",
  });
});

// 404 handler
app.use("/*any", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(
    `🍰 Swedish Pastries Bakery API running on http://localhost:${PORT}`
  );
  console.log(`📚 API endpoints available at http://localhost:${PORT}/api`);
});
