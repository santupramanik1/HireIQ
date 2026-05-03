import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
import { login, logout } from "../controllers/auth/auth.controller.js"
const userRouter=express.Router()


userRouter.post("/google/login",login)
userRouter.post("/logout",isAuthenticated,logout)


export default userRouter