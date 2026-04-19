import type { Request, Response } from "express";
import { Job } from "../../models/job/job.model.js";
import { send_email } from "../../utils/email.js";

//PRIVATE: CREATE A NEW JOB
export const createJob = async (req: Request, res: Response) => {
  try {
    // Ensure user is authenticated(handled by JWT middleware ,but good to double-check)
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Attach the recruiter's ID to the job data
    const jobData = {
      ...req.body,
      createdBy: req.user?.userId,
    };

    const newJob = new Job(jobData);
    await newJob.save();

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error: any) {
    // Check if the error is mongoose validation error
    if (error.name === "ValidationError") {
      // Extract all custom error message that is defined in the schema
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message,
      );

      // Send a 400 Bad Request response with the exact messages
      return res.status(400).json({
        success: false,
        message: "validation failed",
        errors: validationErrors,
      });
    }

    // Handle any other unexpected server errors
    console.error("Unexpected error creating job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//PRIVATE: UPDATE THE EXISTING JOB BY JOB_ID
export const updateJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;

    // Find the existing job
    const job = await Job.findById(jobId);

    // Check if the job is actually exists or not
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Ensure only creator can update
    if (job.createdBy.toString() !== req.user?.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job",
      });
    }

    // Apply the updates from the request body to the job document
    // Using Object.assign safely copies properties from req.body onto the job object
    Object.assign(job, req.body);

    // Save the document
    // This triggers all Mongoose validations
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error: any) {
    // Handle mongoose validation Error
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message,
      );

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Handle invalid MongoDB ID format errors (e.g., if someone passes "123" as an ID)
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID format",
      });
    }
    // Unexpected server Error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//PRIVATE: DELETE THE JOB BY JOB_ID
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;

    // Find the job to ensure it exist before trying to delete it
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Ensure that users is delete their own created  job
    if (job.createdBy.toString() !== req.user?.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job",
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error: any) {
    // Handle invalid MongoDB ID format errors
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID format",
      });
    }

    // Catch-all for unexpected server errors
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//PRIVATE: GET ALL THE JOB BASED ON FILTER
export const getJobs = async (req: Request, res: Response) => {
  try {
    // Pagination setup
    // Default to Page 1 and 10 items per page if it is not provided in query string
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Building the filter query object (Based on that job will be fetch from DB)
    const queryObj: any = {};

    // Filter by exact matches (e.g., ?status=active&type=full-time)
    if (req.query.status) {
      queryObj.status = req.query.status;
    }

    if (req.query.type) {
      queryObj.type = req.query.type;
    }

    if (req.query.location) {
      queryObj.location = req.query.location;
    }

    if (req.query.department) {
      queryObj.department = req.query.department;
    }

    // Search by keyword in the title (e.g., ?keyword=developer)
    // $options: "i" makes it case-insensitive
    if (req.query.keyword) {
      queryObj.title = { $regex: req.query.keyword, $options: "i" };
    }

    // Execute DB query
    const jobs = await Job.find(queryObj)
      .sort({ createdAt: -1 }) // Sort by newest jobs first
      .skip(skip) // Skip jobs from previous pages
      .limit(limit) // Limit to the requested number of jobs
      .populate("createdBy", "name email"); // Pull in the recruiter's name/email

    // Get the total count of jobs matching the filters
    const totalJobs = await Job.countDocuments(queryObj);

    return res.status(200).json({
      success: true,
      data: {
        totalJobs,
        totalPages: Math.ceil(totalJobs / limit),
        currentPage: page,
        jobsPerPage: limit,
        jobs,
      },
    });
  } catch (error: any) {
    console.error("Error in getJobs controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// PUBLIC: GET THE JOB BY ID (FOR THE CANDIDATE APPLICATION PAGE)
export const getJobById = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    // Check if the job is exist or it is in active mode
    if (!job || job.status !== "active") {
      return res.status(404).json({
        success: false,
        message: "Job not found or applications are closed.",
      });
    }

    await send_email()
    // Only send non-sensitive data needed for the form (like Title)
    return res.status(200).json({
      success: true,
      data: {
        title: job.title,
        skills: job.skills,
      },
    });
  } catch (error: any) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Job Link" });
    }
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
