import type { Document } from "mongoose";

export interface ICandidate extends Document {
  name: string;
  email: string;
  resumeURL: string;
  createdAt: string;
  updatedAt: string;
}
