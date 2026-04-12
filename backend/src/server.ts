import dotenv from "dotenv/config";


import express, { type Request, type Response } from "express";
import { connDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";



const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Routing
app.use("/api/auth",userRouter)




// Mongodb connection
await connDB()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is Running at PORT :", PORT);
});