import type { Document, Types } from 'mongoose';

export interface IResumeAnalysis extends Document {
  applicationId: Types.ObjectId;
  matchScore: number;
  score_reasoning?: string; // Keeping this from our AI fix!
  matchedSkill: string[];
  missingSkill: string[];
  strengths: string[];
  areasToImprove: string[];
  summary: string;
  analyzedAt: Date;
}
