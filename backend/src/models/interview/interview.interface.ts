import type { Document, Types } from 'mongoose';

export interface IInterview extends Document {
  jobId: Types.ObjectId;
  applicationId: Types.ObjectId;
  candidateId: Types.ObjectId;
  recruiterId: Types.ObjectId;
  status: 'invited' | 'completed';
  interviewUrl?: string;
  invitedAt: Date;
  completedAt?: Date;
  overallScore?: number;
  technicalScore?: number;
  communicationScore?: number;
  confidenceScore?: number;

  strengths?: string[];
  weaknesses?: string[];

  detailedFeedback?: string;
  hireRecommendation?: string;

  transcript?: {
    role: string;
    text: string;
  }[];
}

export interface IInterviewSession extends Document {
  candidate_id:Types.ObjectId;
  job_id:Types.ObjectId;
  job_title: string; 
  is_completed: boolean;
  created_at: Date;
}
