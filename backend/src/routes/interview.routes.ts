import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import {
  generateInterviewQuestions,
  getCompletedInterviews,
  getInterviewById,
  getPendingInvites,
  inviteCandidateToInterview,
  saveInterviewSetup,
  verifyMagicLink,
} from '../controllers/interview/interview.controller.js';

const interviewRouter = express.Router();

interviewRouter.post('/invite', isAuthenticated, inviteCandidateToInterview);
interviewRouter.post('/generate-questions', isAuthenticated, generateInterviewQuestions);
interviewRouter.post('/save-setup', isAuthenticated, saveInterviewSetup);
interviewRouter.get('/pending/:jobId', isAuthenticated, getPendingInvites);
interviewRouter.get('/verify-magic-link', verifyMagicLink);
interviewRouter.get("/:id", getInterviewById);
interviewRouter.get('/completed/:jobId', getCompletedInterviews);

export default interviewRouter;
