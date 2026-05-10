import type { Request, Response } from 'express';
import { Application } from '../../models/application/application.model.js';
import mongoose from 'mongoose';
import { ResumeAnalysis } from '../../models/resume/resumeAnalysis.model.js';

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

/**
 * @desc    Get a single candidate's full profile and AI resume analysis
 * @route   GET /api/applications/:id
 * @access  Private/Admin
 */
export const candidateInfoById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res
        .status(400)
        .json({ success: false, message: 'Invalid Application ID.' });
      return;
    }

    // Fetch Application + Candidate + Job
    const application = await Application.findById(id)
      .populate({
        path: 'candidateID',
        select:
          'name email phone location linkedInUrl githubUrl latestResumeUrl',
      })
      .populate({
        path: 'jobID',
        select: 'title company',
      })
      .lean();

    if (!application) {
      res
        .status(404)
        .json({ success: false, message: 'Application not found.' });
      return;
    }

    // Fetch the AI Analysis linked to this Application
    const analysis = await ResumeAnalysis.findOne({ applicationId: id }).lean();

    // Type assertions
    const candidate = application.candidateID as any;
    const job = application.jobID as any;

    //  Format payload to match the React frontend exactly
    const formattedResponse = {
      applicationId: application._id,
      name: candidate?.name || 'Unknown',
      role: job?.title || 'Unknown Role',
      company: job?.company || 'Your Company',
      status: application.status,

      contact: {
        email: candidate?.email || 'N/A',
        phone: candidate?.phone || 'N/A',
        location: candidate?.location || 'N/A',
        linkedin: candidate?.linkedInUrl || '',
        github: candidate?.githubUrl || '',
        resumeUrl: candidate?.latestResumeUrl || '#',
      },

      // Merge AI Analysis Data gracefully (fallback if analysis is still processing)
      aiAnalysis: {
        matchScore: analysis?.matchScore || 0,
        matchedSkills: analysis?.matchedSkill || [],
        missingSkills: analysis?.missingSkill || [],
        summary: analysis?.summary || 'Analysis pending...',
        strengths: analysis?.strengths || [],
        improvements: analysis?.areasToImprove || [],
        scoreReasoning: analysis?.score_reasoning || '',
      },
    };

    return res.status(200).json({ success: true, data: formattedResponse });
  } catch (error) {
    console.error('Error fetching candidate profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
