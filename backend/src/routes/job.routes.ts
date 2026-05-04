import express from 'express';
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from '../controllers/job/job.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
const jobRouter = express.Router();

// Protect all job routes with the JWT middleware
jobRouter.post('/', isAuthenticated, createJob); // CREATE: POST /api/jobs
jobRouter.get('/', isAuthenticated, getJobs); // READ:   GET /api/jobs
jobRouter.put('/:id', isAuthenticated, updateJob); // UPDATE: PUT /api/jobs/:id
jobRouter.delete('/:id', isAuthenticated, deleteJob); // DELETE: DELETE /api/jobs/:id

export default jobRouter;
