import express from 'express';
import {
  getJobById,
  submitApplication,
  uploadAndExtract,
} from '../controllers/job/job.controller.js';
import { uploadResume } from '../middlewares/upload.middleware.js';

const applyRouter = express.Router();

// GET JOB DETAILS
// Full URL: GET /api/jobs/:id
applyRouter.get('/:id', getJobById);

// UPLOAD & EXTRACT RESUME (Pre-submission phase)
// Full URL: POST /api/jobs/:id/applications/extract-resume
applyRouter.post(
  '/:id/applications/extract-resume',
  (req, res, next) => {
    const upload = uploadResume.single('resume');

    upload(req, res, (err) => {
      if (err) {
        console.error(' Multer Error Caught:', err.message);
        return res.status(400).json({
          success: false,
          message: 'File upload error: ' + err.message,
        });
      }

      // If we reach here, Multer succeeded! Move to the controller.
      next();
    });
  },
  uploadAndExtract
);

//  FINAL APPLICATION SUBMISSION
// Full URL: POST /api/jobs/:id/applications
applyRouter.post('/:id/applications', submitApplication);

export default applyRouter;
