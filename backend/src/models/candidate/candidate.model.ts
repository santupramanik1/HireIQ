import mongoose, { Model, Schema } from "mongoose";
import type { ICandidate } from "./candidate.interface.js";
import validator from "validator";

const candidateSchema = new Schema<ICandidate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim:true,
      validate: [validator.isEmail, "Please provide a valid Email address"],
    },
    resumeURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Candidate = mongoose.model<ICandidate>(
  "Candidate",
  candidateSchema,
);
