import type { Request, Response } from 'express';
import { Interview } from '../../models/interview/interview.model.js';
import { sendInterviewInviteEmail } from '../email/email.controller.js';
import mongoose from 'mongoose';
import { redisClient } from '../../config/redis.js';
import crypto from 'node:crypto';
import { InterviewSession } from '../../models/interview/interviewSession.model.js';

// export const inviteCandidateToInterview = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const {
//       jobId,
//       applicationId,
//       candidateId,
//       candidateEmail,
//       candidateName,
//       jobTitle,
//     } = req.body;

//     const recruiterId = req.user?.userId;

//     //Create the Interview document
//     const newInterview = new Interview({
//       jobId,
//       applicationId,
//       candidateId,
//       recruiterId,
//       status: 'invited',
//     });

//     await newInterview.save();

//     //  Generate a secure Magic Link Token
//     const token = crypto.randomBytes(32).toString('hex');

//     // We set an expiration (EX) of 86400 seconds (24 hours)
//     await redisClient.set(
//       `interview_token:${token}`,
//       newInterview._id.toString(),
//       {
//         EX: 86400,
//       }
//     );

//     // Generate the Magic Link URL
//     const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//     const interviewLink = `${frontendBaseUrl}/interview/verify?token=${token}`;

//     // Send the email with the Magic Link
//     await sendInterviewInviteEmail({
//       to: candidateEmail,
//       candidateName,
//       jobTitle,
//       interviewType: 'AI Technical Screening',
//       interviewLink,
//     });

//     return res.status(201).json({
//       success: true,
//       message: 'Candidate invited successfully via magic link.',
//       data: newInterview,
//     });
//   } catch (error: any) {
//     console.error('Invite Error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to invite candidate',
//       error: error.message,
//     });
//   }
// };

export const inviteCandidateToInterview = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      jobId,
      applicationId,
      candidateId,
      candidateEmail,
      candidateName,
      jobTitle,
    } = req.body;

    const recruiterId = req.user?.userId;

    // 1. Create your standard Interview document (For your ATS dashboard)
    const newInterview = new Interview({
      jobId,
      applicationId,
      candidateId,
      recruiterId,
      status: 'invited',
    });
    await newInterview.save();

    // ==========================================
    // 2. THE FIX: Create the AI Session for Python
    // ==========================================
    const newSession = new InterviewSession({
      candidate_id: candidateId,
      job_id: jobId,
      job_title: jobTitle,
      is_completed: false
    });
    await newSession.save();

    // 3. Generate a secure Magic Link Token
    const token = crypto.randomBytes(32).toString('hex');

    // 4. Save the token to Redis, mapping it to the Python SESSION ID
    await redisClient.set(
      `interview_token:${token}`,
      newSession._id.toString(), // <-- Point this to the newSession, not newInterview
      {
        EX: 86400, // Expires in 24 hours
      }
    );

    // 5. Generate the Magic Link URL
    const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const interviewLink = `${frontendBaseUrl}/interview/verify?token=${token}`;

    // 6. Send the email with the Magic Link
    await sendInterviewInviteEmail({
      to: candidateEmail,
      candidateName,
      jobTitle,
      interviewType: 'AI Technical Screening',
      interviewLink,
    });

    return res.status(201).json({
      success: true,
      message: 'Candidate invited successfully via magic link.',
      data: {
        interview: newInterview,
        session: newSession
      },
    });
  } catch (error: any) {
    console.error('Invite Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to invite candidate',
      error: error.message,
    });
  }
};
/**
 * @desc    Verify magic link token and retrieve interview details
 * @route   GET /api/interviews/verify-magic-link?token=XYZ
 * @access  Public (Candidate)
//  */
// export const verifyMagicLink = async (req: Request, res: Response) => {
//   try {
//     const { token } = req.query;

//     if (!token || typeof token !== 'string') {
//       return res.status(400).json({
//         success: false,
//         message: 'Token is required',
//       });
//     }

//     // Check Redis for the token
//     const redisKey = `interview_token:${token}`;
//     const interviewId = await redisClient.get(redisKey);

//     if (!interviewId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Magic link is invalid or has expired.',
//       });
//     }

//     //  Fetch the Interview document
//     const interview = await Interview.findById(interviewId);

//     if (!interview) {
//       return res.status(404).json({
//         success: false,
//         message: 'Interview session not found.',
//       });
//     }

//     await redisClient.del(redisKey);

//     // Return success and the required data for the frontend to start the interview
//     return res.status(200).json({
//       success: true,
//       message: 'Magic link verified successfully.',
//       data: {
//         interviewId: interview._id,
//         candidateId: interview.candidateId,
//         jobId: interview.jobId,
//         status: interview.status,
//       },
//     });
//   } catch (error: any) {
//     console.error('Magic Link Verification Error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to verify magic link',
//       error: error.message,
//     });
//   }
// };


export const verifyMagicLink = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Token is required',
      });
    }

    // 1. Check Redis for the token
    const redisKey = `interview_token:${token}`;
    const sessionId = await redisClient.get(redisKey);

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: 'Magic link is invalid or has expired.',
      });
    }

    // 2. Fetch the InterviewSession document
    const session = await InterviewSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Interview session not found.',
      });
    }

    // 3. SECURITY CHECK: Ensure it hasn't been completed yet
    if (session.is_completed) {
      return res.status(403).json({
        success: false,
        message: 'This interview has already been completed and can no longer be accessed.',
      });
    }

    // Note: We intentionally DO NOT delete the Redis key here. 
    // This allows the candidate to refresh the page or click the email link 
    // again if their browser crashes before they actually finish the interview.

    // 4. Return success and the required data for the frontend
    return res.status(200).json({
      success: true,
      message: 'Magic link verified successfully.',
      data: {
        // We pass the sessionId back as 'interviewId' to perfectly match 
        // your React code: navigate(`/start-interview/${data.interviewId}`)
        interviewId: session._id, 
        candidateId: session.candidate_id,
        jobId: session.job_id,
      },
    });
  } catch (error: any) {
    console.error('Magic Link Verification Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify magic link',
      error: error.message,
    });
  }
};
/**
 * @desc    Get all pending (invited) candidates for a specific job
 * @route   GET /api/interviews/pending/:jobId
 * @access  Private (Recruiter)
 */
export const getPendingInvites = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId as string)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Job ID' });
    }

    // Fetch interviews where the candidate has been invited but hasn't completed it
    const pendingInterviews = await Interview.find({
      jobId: new mongoose.Types.ObjectId(jobId as string),
      status: 'invited',
    })
      .populate({
        path: 'candidateId',
        select: 'name email', // Pulling the core candidate info
      })
      .populate({
        path: 'jobId',
        select: 'title', // Used as a fallback for the role
      })
      .sort({ invitedAt: -1 }); // Newest invites first

    // Format the data exactly how the frontend needs it
    const formattedData = pendingInterviews.map((interview) => {
      const candidate = interview.candidateId as any;
      const job = interview.jobId as any;

      return {
        id: interview._id,
        candidateName: candidate?.name || 'Unknown Candidate',
        candidateEmail: candidate?.email || 'No email provided',
        // Fallback title since company isn't in your core schema yet
        role: job?.title || 'Applicant',
        company: 'HireIQ',
        type: 'AI SCREENING',
        invitedAt: interview.invitedAt,
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error: any) {
    console.error('Error fetching pending invites:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch pending invites',
    });
  }
};


// Fetch Completed Interviews for a Job
export const getCompletedInterviews = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId as string;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'Job ID is required' });
    }

    // Find interviews where status is 'completed'
    const completedInterviews = await Interview.find({ 
      jobId, 
      status: 'completed' 
    })
    .populate('candidateId', 'name email')
    .populate('jobId', 'title company');

    // Format the data including all the AI Evaluation scores
    const formattedData = completedInterviews.map((item: any) => ({
      id: item._id,
      candidateName: item.candidateId?.name || 'Unknown Candidate',
      candidateEmail: item.candidateId?.email || '',
      role: item.jobId?.title || 'Candidate',
      company: item.jobId?.company || 'HireIQ',
      invitedAt: item.createdAt,
      updatedAt: item.updatedAt,
      
      // AI Scores & Feedback
      overallScore: item.overallScore || 0,
      technicalScore: item.technicalScore || 0,
      communicationScore: item.communicationScore || 0,
      confidenceScore: item.confidenceScore || 0,
      strengths: item.strengths || [],
      weaknesses: item.weaknesses || [],
      detailedFeedback: item.detailedFeedback || '',
      hireRecommendation: item.hireRecommendation || 'Hold',
      transcript: item.transcript || []
    }));

    return res.status(200).json({ success: true, data: formattedData });
  } catch (error: any) {
    console.error("Error fetching completed interviews:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get interview details by ID (with candidate and job info)
 * @route   GET /api/interviews/:id
 * @access  Public (Candidate accessing via Magic Link) or Private (Recruiter)
 */
export const getInterviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the ID format to prevent database crash errors
    if (!mongoose.Types.ObjectId.isValid(id as string )) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid Interview ID format' 
      });
    }

    // Fetch the interview and populate the related references
    const interview = await Interview.findById(id)
      .populate({
        path: 'candidateId',
        select: 'name email', // Only pull the fields we need
      })
      .populate({
        path: 'jobId',
        select: 'title', // Pull the job title
      });

    // Check if it exists
    if (!interview) {
      return res.status(404).json({ 
        success: false, 
        message: 'Interview session not found' 
      });
    }

    // 4. Return the populated data
    return res.status(200).json({
      success: true,
      data: interview
    });

  } catch (error: any) {
    console.error('Error fetching interview by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch interview details',
      error: error.message
    });
  }
};