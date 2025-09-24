// ===== ADDITIONAL ROUTES FOR BETTER UX =====
/*
// Root route - API info
app.get("/", (req, res) => {
  res.json({
    message: "Zod Validation Challenges API",
    endpoints: {
      pets: {
        POST: "/pets - Add a pet",
        GET: "/pets - Get all pets",
      },
      reviews: {
        POST: "/reviews - Add a review",
        GET: "/reviews - Get all reviews",
      },
      login: {
        POST: "/login - User login",
      },
      tasks: {
        POST: "/tasks - Create a task",
        GET: "/tasks - Get all tasks",
      },
      quiz: {
        POST: "/quiz - Submit quiz answers",
        GET: "/quiz - Get all quiz submissions",
      },
    },
  });
});


// Clear all data (useful for testing)
app.delete("/clear", (req, res) => {
  pets = [];
  reviews = [];
  tasks = [];
  quizAnswers = [];
  res.json({ message: "All data cleared" });
});

// Health check route
app.use("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    dataCounts: {
      pets: pets.length,
      reviews: reviews.length,
      tasks: tasks.length,
      quizSubmissions: quizAnswers.length,
    },
  });
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
*/
