import dotenv from 'dotenv/config';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { connDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import jobRouter from './routes/job.routes.js';
import applyRouter from './routes/public.routes.js';
import { testCloudinaryConnection } from './config/cloudinary.js';
import cors from 'cors';
import candidateRouter from './routes/candidate.routes.js';
import interviewRouter from './routes/interview.routes.js';
import { connectRedis } from './config/redis.js';

const app = express();

app.set('trust proxy', 1);

// Add this simple Health Check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the HireIQ API! The server is running smoothly.',
  });
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, postman, curl)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:5173',
        'http://localhost:3000',
      ].filter(Boolean) as string[];
      
      const isAllowed = allowedOrigins.some(
        (allowed) => allowed === origin || allowed.replace(/\/$/, '') === origin
      );
      
      if (isAllowed || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        // Fallback for production: accept origin dynamically so cross-origin cookies work
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// Routing
// Authentication
app.use('/api/auth', userRouter);

// Candidate apply (Public Candidate Routes)
app.use('/api/jobs', applyRouter);

// Job management (Protected Recruiter Routes)
app.use('/api/jobs', jobRouter);

// Get all candidate who are applied for Job
app.use('/api/applications', candidateRouter);

// Interview Inivitation
app.use('/api/interviews', interviewRouter);

// Database & Services connection
await connDB();
await testCloudinaryConnection();
await connectRedis();

// Global Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('CRITICAL UNHANDLED ERROR:', err.stack);

  res.status(500).json({
    success: false,
    message: 'Something went wrong on our end. Our team has been notified.',
  });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server is Running at PORT :', PORT);
  });
}

// VERCEL REQUIREMENT: Export the app
export default app;
