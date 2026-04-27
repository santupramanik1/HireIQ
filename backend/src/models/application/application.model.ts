import mongoose, { Schema } from "mongoose";
import type { IApplication } from "./application.interface.js";

const applicationSchema = new Schema<IApplication>(
  {
    jobID: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidateID: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    status: {
      type: String,
      enum: ["applied", "screening", "interviewing", "offered", "rejected"],
      default: "applied",
    },

    currentTitle: { type: String, default: "" },
    currentCompany: { type: String, default: "" },
    tags: [{ type: String }],

    // Stats
    skills: [{ type: String }],
    yearsOfExperience: { type: Number, default: 0 },

    //Resume analysis
    aiAnalysis: {
      matchScore: { type: Number, default: 0, index: -1 }, // Sort top candidates instantly
      summary: { type: String, default: "" },
      strengths: [{ type: String }],
      areasToImprove: [{ type: String }],
    },
  },
  { timestamps: true },
);

// Compound unique index — one candidate cannot apply to same job twice
applicationSchema.index({ jobID: 1, candidateID: 1 }, { unique: true });

// Index for HR dashboard queries (fetch all applications for a job)
applicationSchema.index({ jobID: 1, status: 1 });

// Index for candidate portal (fetch all applications by candidate)
applicationSchema.index({ candidateID: 1 });

export const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema,
);
