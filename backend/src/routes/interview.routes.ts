import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import {
  getInterviewById,
  getPendingInvites,
  inviteCandidateToInterview,
  verifyMagicLink,
} from '../controllers/interview/interview.controller.js';

const interviewRouter = express.Router();

interviewRouter.post('/invite', isAuthenticated, inviteCandidateToInterview);
interviewRouter.get('/pending/:jobId', isAuthenticated, getPendingInvites);
interviewRouter.get('/verify-magic-link', verifyMagicLink);
interviewRouter.get("/:id", getInterviewById);

export default interviewRouter;
