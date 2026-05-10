import mongoose, { Schema } from 'mongoose';
import type { IInterview } from './interview.interface.js';

const InterviewSchema: Schema = new Schema(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },

    // Grouped Q&A
    qaPairs: [
      {
        question: { type: String, required: true },
        answer: { type: String },
        score: { type: Number },
        feedback: { type: String },
      },
    ],

    overallRating: {
      type: Number,
      default: 0,
    },
    transcript: {
      type: String,
    },
    recordingUrl: {
      type: String,
    },
    vapiCallId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Metadata & Enums
    mode: {
      type: String,
      enum: ['voice', 'chat', 'video'],
      default: 'voice',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
      required: true,
    },
    conductedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInterview>('Interview', InterviewSchema);
