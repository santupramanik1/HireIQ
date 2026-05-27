import mongoose, { Schema } from 'mongoose';
import type { IInterview } from './interview.interface.js';

const InterviewSchema = new Schema<IInterview>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['invited', 'completed'],
      default: 'invited',
    },
    interviewUrl: {
      type: String, // The unique frontend URL sent to the candidate
    },
    invitedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    overallScore: {
      type: Number, // Populated after the AI evaluation is complete
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes to optimize dashboard queries
InterviewSchema.index({ jobId: 1, status: 1 });
InterviewSchema.index({ candidateId: 1 });
InterviewSchema.index({ recruiterId: 1 });

export const Interview = mongoose.model<IInterview>(
  'Interview',
  InterviewSchema
);
