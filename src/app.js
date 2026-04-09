import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

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
import healthCheckRoute from "./routes/healthcheckup.routes.js";
app.use("/api/v1/healthcheck", healthCheckRoute)

app.get("/", (req, res) => {
  res.send("Welcome to basecampy");
});

export default app;
