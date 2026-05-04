import type { Document } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  email: string;
  phone?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  location?: string;
  latestResumeUrl: string; // Cloudinary URL
  createdAt: Date;
  updatedAt: Date;
}
