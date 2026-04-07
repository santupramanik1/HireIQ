import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import { connDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (req:Request, res:Response) => {
    return res.json({ success: "server setup" });
});

const PORT = process.env.PORT || 3000;


// Mongodb connection
await connDB()
app.listen(PORT, () => {
    console.log("Server is Running at PORT :", PORT);
});