const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET route at /greet
app.get("/greet", (req, res) => {
  res.json({
    message: "Hello, developer!",
    timestamp: new Date().toISOString(),
  });
});

// POST route at /submit
app.post("/submit", (req, res) => {
  const { name, age } = req.body;

  // Basic validation
  if (!name || !age) {
    return res.status(400).json({
      error: "Both 'name' and 'age' are required in the request body",
    });
  }

  // Check if age is a number
  if (isNaN(age) || age <= 0) {
    return res.status(400).json({
      error: "Age must be a positive number",
    });
  }

  // Success response
  res.json({
    message: `Hello, ${name}! You are ${age} years old.`,
    receivedData: req.body,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Available routes:`);
  console.log(`   GET  http://localhost:${PORT}/greet`);
  console.log(`   POST http://localhost:${PORT}/submit`);
});

// Optional: Handle 404 for undefined routes
app.use("/", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    availableRoutes: {
      GET: "/greet",
      POST: "/submit",
    },
  });
});
