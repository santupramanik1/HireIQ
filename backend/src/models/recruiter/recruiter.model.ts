import mongoose, { model, Schema } from "mongoose";
import { UserRole, type IUser } from "./recruiter.interface.js";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.RECRUITER,
    },
    provider: {
      type: String,
      enum: ["google"],
      required: true,
    },
    providerId: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
