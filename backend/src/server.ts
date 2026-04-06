import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    return res.json({ success: "server setup" });
});

const PORT = process.env.PORT || 3000;

console.log("PORT:", PORT);

app.listen(PORT, () => {
    console.log("Server is Running at PORT :", PORT);
});