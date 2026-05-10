import express from "express"
import { candidateInfoById, getAllAppliedCandidates } from "../controllers/candidate/candidate.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const candidateRouter=express.Router()

candidateRouter.get("/candidates",isAuthenticated,getAllAppliedCandidates)
candidateRouter.get("/candidates/:id",isAuthenticated,candidateInfoById)

export default candidateRouter