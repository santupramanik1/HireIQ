import type { Document, Types } from "mongoose";

export interface IJob extends Document {
  createdBy: Types.ObjectId;
  status: "draft" | "active" | "expired";
  title: string;
  description: string;
  type: "full-time" | "part-time" | "internship";
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  department: string;
  location: string;
  responsibilities?: string[];
  requirements?: string[];
  skills?: string[];
  createdAt: Date;
  updatedAt: Date;
}
