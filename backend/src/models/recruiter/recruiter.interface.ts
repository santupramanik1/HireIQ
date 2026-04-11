import type { Document } from "mongoose";

export enum UserRole {
  RECRUITER = "recruiter",
  ADMIN = "admin",
}

export interface IUser extends Document {
  name: string;
  email: string;
  role: UserRole;
  provider: "google";
  providerId: string;
  avatar?: string; // Profile picture from Google
  createdAt: Date;
  updatedAt: Date;
}
