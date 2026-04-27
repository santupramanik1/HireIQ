import express from "express";
import { getJobById, submitApplication, uploadAndExtract } from "../controllers/job/job.controller.js";
import { uploadResume } from "../middlewares/upload.middleware.js";

const applyRouter = express.Router();

applyRouter.get("/:id/apply", getJobById);

// Wrapper to catch Multer errors and prevent hanging
// applyRouter.post("/:id/apply", (req, res, next) => {
//   const upload = uploadResume.single("resume");
  
//   upload(req, res, (err) => {
//     if (err) {
//       console.error(" Multer Error Caught:", err.message);
//       return res.status(400).json({
//         success: false,
//         message: "File upload error: " + err.message
//       });
//     }
    
//     // If we reach here, Multer succeeded! Move to the controller.
//     next();
//   });
// }, submitApplication);

applyRouter.post("/:id/apply", (req, res, next) => {
  const upload = uploadResume.single("resume");
  
  upload(req, res, (err) => {
    if (err) {
      console.error(" Multer Error Caught:", err.message);
      return res.status(400).json({
        success: false,
        message: "File upload error: " + err.message
      });
    }
    
    // If we reach here, Multer succeeded! Move to the controller.
    next();
  });
}, uploadAndExtract);

applyRouter.post("/:id/submit",submitApplication)

export default applyRouter;