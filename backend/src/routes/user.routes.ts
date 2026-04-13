import express from "express"
import {getUserProfile, googleCallback, login, refreshTokenController } from "../controllers/auth/auth.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
const userRouter=express.Router()

// login routes 
// Public route
userRouter.get("/login",login)
userRouter.get("/google/callback", googleCallback)
userRouter.post("/refresh-token",refreshTokenController)

// Protected Route
userRouter.get("/profile",isAuthenticated,getUserProfile)

export default userRouter