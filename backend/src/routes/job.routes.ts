import express from "express"
import { createJob } from "../controllers/job/job.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
const jobRouter=express.Router()

// Protect all job routes with the JWT middleware
jobRouter.use(isAuthenticated)

jobRouter.post("/create",createJob)

export default jobRouter