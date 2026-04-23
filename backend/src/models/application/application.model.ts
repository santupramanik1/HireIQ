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
      enum: [
        "applied",
        "reviewing",
        "shortlisted",
        "interviewed",
        "rejected",
        "hired",
      ],
      default: "applied",
    },
    finalScore: {
      type: Number,
      min: [0, "Score cannot be negative"],
      max: [100, "Score cannot exceed 100"],
      default: 0,
    },
    appliedAt: {
      type: Date,
      default: Date.now(),
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

export const Application=mongoose.model<IApplication>("Application",applicationSchema)