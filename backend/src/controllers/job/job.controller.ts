import type {Request, Response} from "express";
import {Job} from "../../models/job/job.model.js";

// CREATE A NEW JOB
export const createJob = async (req: Request, res: Response) => {
    try {
        // Ensure user is authenticated(handled by JWT middleware ,but good to double-check)
        if (!req.user) {
            return res.status(401).json({success: false, message: "Unauthorized"});
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
            const validationErrors = Object.values(error.errors).map((err: any) => err.message);

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
