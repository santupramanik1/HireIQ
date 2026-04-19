import express from "express";
import { getJobById } from "../controllers/job/job.controller.js";
import { send_email } from "../utils/email.js";
const applyRouter = express.Router();

applyRouter.get("/:id/apply", getJobById);

export default applyRouter;
