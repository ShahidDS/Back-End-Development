import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json()); // This applies to all routes

// In-memory data stores for each challenge
let pets = [];
let reviews = [];
let tasks = [];
let quizAnswers = [];

// ===== CHALLENGE 1: Pet Shelter API =====
const PetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().positive("Age must be positive"),
  type: z.enum(["dog", "cat", "bird"]),
});

app.post("/pets", (req, res) => {
  const result = PetSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid pet data",
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  pets.push(result.data);
  return res
    .status(201)
    .json({ message: "Pet added successfully", pet: result.data });
});

app.get("/pets", (req, res) => {
  res.json(pets);
});

// ===== CHALLENGE 2: Bookstore Reviews =====
const ReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .max(200, "Comment must be 200 characters or less")
    .optional(),
});

app.post("/reviews", (req, res) => {
  const result = ReviewSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0];
    return res.status(400).json({ error: firstError.message });
  }

  reviews.push(result.data);
  return res
    .status(201)
    .json({ message: "Review added successfully", review: result.data });
});

app.get("/reviews", (req, res) => {
  res.json(reviews);
});

// ===== CHALLENGE 3: Login System =====
const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

app.post("/login", (req, res) => {
  const result = LoginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error.issues.map((issue) => issue.message),
    });
  }

  return res.json({
    success: true,
    message: "Login successful",
    user: { email: result.data.email },
  });
});

// ===== CHALLENGE 4: Task Manager =====
const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z
    .string()
    .refine(
      (date) => {
        const inputDate = new Date(date);
        return inputDate > new Date();
      },
      {
        message: "Due date must be in the future",
      }
    )
    .optional(),
});

app.post("/tasks", (req, res) => {
  const result = TaskSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0];
    return res.status(400).json({ error: firstError.message });
  }

  tasks.push({
    ...result.data,
    id: tasks.length + 1,
    createdAt: new Date().toISOString(),
  });

  return res
    .status(201)
    .json({ message: "Task created successfully", task: result.data });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ===== CHALLENGE 5: Quiz Answers =====
const AnswerSchema = z
  .array(
    z.object({
      questionId: z
        .number()
        .int()
        .positive("Question ID must be a positive integer"),
      answer: z.string().max(100, "Answer must be 100 characters or less"),
    })
  )
  .refine(
    (answers) => {
      const questionIds = answers.map((answer) => answer.questionId);
      return new Set(questionIds).size === questionIds.length;
    },
    {
      message: "All question IDs must be unique",
    }
  );

app.post("/quiz", (req, res) => {
  const result = AnswerSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0];
    return res.status(400).json({ error: firstError.message });
  }

  quizAnswers.push({
    answers: result.data,
    submittedAt: new Date().toISOString(),
    id: quizAnswers.length + 1,
  });

  return res.json({
    message: "Quiz answers submitted successfully",
    totalQuestions: result.data.length,
  });
});

app.get("/quiz", (req, res) => {
  res.json(quizAnswers);
});

// ===== ADDITIONAL ROUTES FOR BETTER UX =====

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
app.get("/health", (req, res) => {
  // Changed from app.use to app.get
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

// 404 handler for undefined routes - FIXED THE ERROR HERE
app.use((req, res, next) => {
  // Remove the "*" path or use app.all for catch-all
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
});
