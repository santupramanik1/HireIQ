import express from "express"
import { createJob, deleteJob, getJobs, updateJob } from "../controllers/job/job.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
const jobRouter=express.Router()

// Protect all job routes with the JWT middleware
jobRouter.use(isAuthenticated)

jobRouter.post("/create",createJob)
jobRouter.put("/update/:id",updateJob)
jobRouter.delete("/delete/:id",deleteJob)
jobRouter.get("/get",getJobs)

export default jobRouter