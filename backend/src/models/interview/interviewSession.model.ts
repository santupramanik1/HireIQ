import mongoose, { Schema } from "mongoose";
import type { IInterviewSession } from "./interview.interface.js";

const interviewSessionSchema = new Schema<IInterviewSession>({
  candidate_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  job_title: { type: String, required: true },
  is_completed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
}, {
  collection: 'interview_sessions'
});

export const InterviewSession = mongoose.model<IInterviewSession>('InterviewSession', interviewSessionSchema);