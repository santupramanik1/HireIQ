import express from "express"
import {googleCallback, login } from "../controllers/auth/auth.controller.js"
const userRouter=express.Router()

// login routes
userRouter.get("/login",login)
userRouter.get("/google/callback", googleCallback)

export default userRouter