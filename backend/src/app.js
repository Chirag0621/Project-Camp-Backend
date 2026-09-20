import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//CookieParser
app.use(cookieParser())


//cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE",  "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);




// Import the routes
import healthCheckRouter from "./routes/healthcheckup.routes.js";
app.use("/api/v1/healthcheck", healthCheckRouter)

app.get("/", (req, res) => {
  res.send("Welcome to basecampy");
});

import authRouter from "./routes/auth.routes.js"
app.use("/api/v1/auth", authRouter)

import projectRouter from "./routes/project.routes.js";
app.use("/api/v1/projects", projectRouter);

import taskRouter from "./routes/task.routes.js";
app.use("/api/v1/tasks", taskRouter);

import noteRouter from "./routes/note.routes.js";
app.use("/api/v1/notes", noteRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    statusCode,
    data: err.data || null,
    message: err.message || "Something went wrong",
    success: false,
    errors: err.errors || [],
  });
});

export default app;
