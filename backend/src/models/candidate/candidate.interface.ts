import type { Document } from "mongoose";

export interface ICandidate extends Document {
email: string; // The unique identifier across your whole system
  name: string;
  phone?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  location?: string;
  resumeUrl: string; // Cloudinary URL
  createdAt: Date;
  updatedAt: Date;
}
