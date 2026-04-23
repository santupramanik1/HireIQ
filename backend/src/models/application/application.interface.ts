import type { Document, Types } from "mongoose";

export interface IApplication extends Document {
  jobID: Types.ObjectId;
  candidateID: Types.ObjectId;
  status:
    | "applied"
    | "reviewing"
    | "shortlisted"
    | "interviewed"
    | "rejected"
    | "hired";
  finalScore?: number;
  appliedAt:Date,
  createdAt: Date;
  updateAt: Date;
}
