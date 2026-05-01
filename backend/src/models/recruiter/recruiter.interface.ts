import type { Document } from "mongoose";

export enum UserRole {
  RECRUITER = "recruiter",
  ADMIN = "admin",
}

export interface IUser extends Document {
  firstname: string;
  lastname?:string|undefined
  email: string;
  role: UserRole;
  picture?: string; // Profile picture from Google
  isActive:boolean
  createdAt: Date;
  updatedAt: Date;
}
