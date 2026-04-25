import type { Document, Types } from "mongoose";

export interface IApplication extends Document {
  jobID: Types.ObjectId;
  candidateID: Types.ObjectId;

  status: "applied" | "screening" | "interviewing" | "offered" | "rejected";
  appliedResumeUrl: string;

  currentTitle: string;
  currentCompany: string;
  tags: string[];

  skills: string[];
  yearsOfExperience: number;

  // AI Resume Analysis Section
  aiAnalysis: {
    matchScore: number; // 0-100 Math calculation
    summary: string;
    strengths: string[];
    areasToImprove: string[];
  };


  createdAt: Date;
  updatedAt: Date;
}
