import dotenv from "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response
} from "express";
import { connDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";
import applyRouter from "./routes/public.routes.js";
import { testCloudinaryConnection } from "./config/cloudinary.js";
import cors from "cors";
import { connectRedis } from "./config/redis.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

// Routing
// Authentication
app.use("/api/auth", userRouter);

// Candidate apply (Public Candidate Routes)
app.use("/api/jobs", applyRouter);

// Job management (Protected Recruiter Routes)
app.use("/api/jobs", jobRouter);

// Database & Services connection
await connDB();
await testCloudinaryConnection();
await connectRedis()

// Global Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("CRITICAL UNHANDLED ERROR:", err.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong on our end. Our team has been notified."
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is Running at PORT :", PORT);
});
