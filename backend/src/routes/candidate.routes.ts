import express from "express"
import { getAllAppliedCandidates } from "../controllers/candidate/candidate.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const candidateRouter=express.Router()

candidateRouter.get("/candidates",isAuthenticated,getAllAppliedCandidates)

export default candidateRouter