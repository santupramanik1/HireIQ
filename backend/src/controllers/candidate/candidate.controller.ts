import type { Request, Response } from 'express';
import { Application } from '../../models/application/application.model.js';
import mongoose from 'mongoose';

/**
 * @desc Get a list of all candidates who have applied for any job
 * @route GET /api/applications/candidates
 * @access  Private/Admin
 */
export const getAllAppliedCandidates = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find()
      .populate('candidateID', 'name email')
      .populate('jobID', 'title')
      .lean();

    // Handle the case where no applications exist in the system yet
    if (!applications || applications.length === 0) {
      res.status(404).json({
        success: true,
        message: 'No applications found in the system.',
        data: [],
      });
      return;
    }

    const formattedData = applications.map((app) => {
      const candidate = app.candidateID as unknown as {
        _id: string;
        name: string;
        email: string;
      };
      return {
        applicationId: app._id,
        jobId: app.jobID, // Identifies which job this specific application is for
        status: app.status,
        finalScore: app.finalScore,
        candidateId: candidate?._id,
        candidateName: candidate?.name || 'Unknown',
        candidateEmail: candidate?.email || 'Unknown',
        appliedAt: app.createdAt,
      };
    });

    return res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    });
  } catch (error) {
    // Catch Mongoose-specific errors
    if (error instanceof mongoose.Error) {
      res.status(500).json({
        success: false,
        message: 'A database error occurred while fetching candidates.',
      });
      return;
    }

    // Catch all other unexpected server errors
    res.status(500).json({
      success: false,
      message: 'An unexpected server error occurred.',
    });
  }
};
