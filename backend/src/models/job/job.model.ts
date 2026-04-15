import mongoose, {Schema} from "mongoose";
import type {IJob} from "./job.interface.js";

const jobSchema = new Schema<IJob>(
    {
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["draft", "active", "expired"],
            default: "draft",
        },
        title: {
            type: String,
            required: [true, "Job titile is required"],
            trim: true, //Automatically removes extra spaces from start and end
        },
        description: {
            type: String,
            required: [true, "Job description is required"],
            trim: true,
        },
        type: {
            type: String,
            enum: ["full-time", "part-time", "internship"],
            required: true,
        },
        salary: {
            min: {type: Number, default: 0},
            max: {type: Number, default: 0},
            currency: {type: String, default: "INR"},
        },
        department: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        responsibilities: [{type: String}],
        requirements: [{type: String}],
        skills: {
            type: [String],
            validate: {
                validator: function (this: IJob, skillsArray: string[]) {
                    if (this.status == "active" && (!skillsArray || skillsArray.length == 0)) {
                        return false;
                    }
                    return true;
                },
                message: "You must add at least one skill before publishing this job.",
            },
        },
    },
    {timestamps: true}
);

export const Job=mongoose.model<IJob>("Job",jobSchema)