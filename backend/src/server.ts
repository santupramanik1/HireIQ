import dotenv from "dotenv/config";


import express, { type Request, type Response } from "express";
import { connDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";
import applyRouter from "./routes/public.routes.js";



const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Routing
// Authentication
app.use("/api/auth",userRouter)

// Job management
app.use("/api/jobs",jobRouter)

// Candidate apply
app.use("/api/jobs",applyRouter)



// Mongodb connection
await connDB()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is Running at PORT :", PORT);
});