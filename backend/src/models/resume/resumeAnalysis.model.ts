import mongoose, { Schema } from "mongoose";
import type { IResumeAnalysis } from "./resumeAnalysis.interface.js";

const resumeAnalysisSchema = new Schema<IResumeAnalysis>({
  applicationId: {
    type: Schema.Types.ObjectId,
    ref: "Application",
    required: true,
    unique: true // One application has exactly one analysis
  },
  matchScore: {
    type: Number,
    required: true
  },
  score_reasoning: {
    type: String
  },
  matchedSkill: {
    type: [String],
    default: []
  },
  missingSkill: {
    type: [String],
    default: []
  },
  strengths: {
    type: [String],
    default: []
  },
  areasToImprove: {
    type: [String],
    default: []
  },
  summary: {
    type: String,
    required: true
  },
  analyzedAt: {
    type: Date,
    default: Date.now
  }
});

export const ResumeAnalysis = mongoose.model<IResumeAnalysis>(
  "ResumeAnalysis",
  resumeAnalysisSchema
);
