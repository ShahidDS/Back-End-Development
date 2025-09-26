import express from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Root route - should come before API routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Random Person API",
    endpoints: {
      ping: "/api/ping",
      randomPerson: "/api/random-person",
      randomLogin: "/api/random-login",
      randomAddress: "/api/random-address",
      createUser: "/api/users (POST)",
    },
    description: "Use the /api prefix for all endpoints",
  });
});

// API Routes - this should come after root route but before 404 handler
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  next(); // Pass control to the next middleware/route
});
app.use("/api", routes);
//app.use("/api", routes);

// 404 handler - MUST BE THE LAST ROUTE
app.use("/*any", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
