import mongoose, { model, Schema } from "mongoose";
import { UserRole, type IUser } from "./recruiter.interface.js";

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: [true, "firstame is required"],
      trim: true,
    },
     lastname: {
      type: String,
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
    picture: {
      type: String,
    },
    isActive:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
