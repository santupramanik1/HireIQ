import type { Request, Response } from 'express';
import { Application } from '../../models/application/application.model.js';
import mongoose from 'mongoose';
import { ResumeAnalysis } from '../../models/resume/resumeAnalysis.model.js';
import { Interview } from '../../models/interview/interview.model.js';

/**
 * @desc Get a list of all candidates who have applied for any job
 * @route GET /api/applications/candidates
 * @access  Private/Admin
 */
export const getAllAppliedCandidates = async (req: Request, res: Response) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidateID',
          foreignField: '_id',
          as: 'candidateDetails',
        },
      },
      {
        $unwind: { path: '$candidateDetails', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobID',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      {
        $unwind: { path: '$jobDetails', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'resumeanalyses',
          localField: '_id',
          foreignField: 'applicationId',
          as: 'analysisDetails',
        },
      },
      {
        $unwind: { path: '$analysisDetails', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'interviews',
          localField: '_id',
          foreignField: 'applicationId',
          as: 'interviewDetails',
        },
      },
      {
        $unwind: { path: '$interviewDetails', preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          applicationId: '$_id',
          jobId: {
            _id: '$jobDetails._id',
            title: '$jobDetails.title'
          },
          status: '$status',
          finalScore: '$finalScore',
          candidateId: '$candidateDetails._id',
          candidateName: '$candidateDetails.name',
          candidateEmail: '$candidateDetails.email',
          appliedAt: '$createdAt',
          matchScore: { $ifNull: ['$analysisDetails.matchScore', 0] },
          interviewScore: { $ifNull: ['$interviewDetails.overallScore', 0] }
        }
      }
    ];

    const formattedData = await Application.aggregate(pipeline);

    // Handle the case where no applications exist in the system yet
    if (!formattedData || formattedData.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No applications found in the system.',
        data: [],
      });
      return;
    }

    return res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    });
  } catch (error) {
    console.error('Error fetching candidate applications:', error);
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

    const analysis = await ResumeAnalysis.findOne({ applicationId: id }).lean();

    const interview = await Interview.findOne({ applicationId: id }).lean();

    const candidate = application.candidateID as any;
    const job = application.jobID as any;

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

      aiAnalysis: {
        matchScore: analysis?.matchScore || 0,
        matchedSkills: analysis?.matchedSkill || [],
        missingSkills: analysis?.missingSkill || [],
        summary: analysis?.summary || 'Analysis pending...',
        strengths: analysis?.strengths || [],
        improvements: analysis?.areasToImprove || [],
        scoreReasoning: analysis?.score_reasoning || '',

        // --- NEW: Injecting dynamic voice interview data ---
        voiceInterview: {
          status: interview?.status || 'pending',
          overallScore: interview?.overallScore || 0,
          communicationScore: interview?.communicationScore || 0,
          technicalScore: interview?.technicalScore || 0,
          confidenceScore: interview?.confidenceScore || 0, // Using confidence instead of problem-solving
        },
      },
    };

    return res.status(200).json({ success: true, data: formattedResponse });
  } catch (error) {
    console.error('Error fetching candidate profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
/**
 * @desc    Get top matched candidates for a specific job based on AI analysis score
 * @route   GET /api/applications/matched-candidates/:jobId
 * @access  Private/Admin
 */

export const getTopMatchedCandidates = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    //  Validate Job ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Job ID format' });
    }

    // Aggregation Pipeline
    const pipeline: any[] = [
      // Match applications strictly for this job
      {
        $match: { jobID: new mongoose.Types.ObjectId(id) },
      },

      // Join Job Details (Needed to fetch the Job Title)
      {
        $lookup: {
          from: 'jobs', // Ensure this matches your jobs collection name
          localField: 'jobID',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      {
        $unwind: { path: '$jobDetails', preserveNullAndEmptyArrays: true },
      },

      // Join Candidate Details
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidateID',
          foreignField: '_id',
          as: 'candidateDetails',
        },
      },
      {
        $unwind: {
          path: '$candidateDetails',
          preserveNullAndEmptyArrays: true,
        },
      },

      // Join AI Match Analysis
      {
        $lookup: {
          from: 'resumeanalyses',
          localField: '_id',
          foreignField: 'applicationId',
          as: 'analysis',
        },
      },
      {
        $unwind: { path: '$analysis', preserveNullAndEmptyArrays: true },
      },

      // Sort by the AI Match Score in Descending Order (Highest first)
      {
        $sort: { 'analysis.matchScore': -1, createdAt: -1 },
      },

      // Project ONLY the specifically requested fields
      {
        $project: {
          _id: 0, // Hides the default MongoDB ObjectId
          applicationId: '$_id', // ADD THIS
          candidateId: '$candidateDetails._id',
          jobTitle: '$jobDetails.title',
          candidateName: '$candidateDetails.name',
          candidateEmail: '$candidateDetails.email',
          matchScore: { $ifNull: ['$analysis.matchScore', 0] },
          summary: '$analysis.summary',
        },
      },
    ];

    // Execute the pipeline
    const matchedCandidates = await Application.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: 'Matched candidates fetched successfully',
      data: {
        total: matchedCandidates.length,
        candidates: matchedCandidates,
      },
    });
  } catch (error: any) {
    console.error('Error fetching matched candidates:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch matched candidates',
      error: error.message,
    });
  }
};

/**
 * @desc    Update a candidate's application status
 * @route   PUT /api/applications/candidates/:id/status
 * @access  Private/Admin
 */
export const updateApplicationStatus = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid Application ID.' });
      return;
    }

    const validStatuses = ['applied', 'screening', 'interviewing', 'offered', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status value.' });
      return;
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      res.status(404).json({ success: false, message: 'Application not found.' });
      return;
    }

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully.',
      data: application,
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Delete a candidate application and related analysis/interviews
 * @route   DELETE /api/applications/candidates/:id
 * @access  Private/Admin
 */
export const deleteCandidateApplication = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid Application ID.' });
      return;
    }

    // 1. Delete the Application
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      res.status(404).json({ success: false, message: 'Application not found.' });
      return;
    }

    // 2. Delete related ResumeAnalysis
    await ResumeAnalysis.deleteMany({ applicationId: id });

    // 3. Delete related Interview
    await Interview.deleteMany({ applicationId: id });

    return res.status(200).json({
      success: true,
      message: 'Candidate application deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting candidate application:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

