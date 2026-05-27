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
}
