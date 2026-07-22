import express from 'express';
import {
  candidateInfoById,
  getAllAppliedCandidates,
  getTopMatchedCandidates,
  updateApplicationStatus,
  deleteCandidateApplication,
} from '../controllers/candidate/candidate.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const candidateRouter = express.Router();

candidateRouter.get('/candidates', isAuthenticated, getAllAppliedCandidates);
candidateRouter.get('/candidates/:id', isAuthenticated, candidateInfoById);
candidateRouter.put('/candidates/:id/status', isAuthenticated, updateApplicationStatus);
candidateRouter.delete('/candidates/:id', isAuthenticated, deleteCandidateApplication);
candidateRouter.get(
  '/matched-candidates/:id',
  isAuthenticated,
  getTopMatchedCandidates
);

export default candidateRouter;
