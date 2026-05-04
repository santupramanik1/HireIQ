import type { Document, Types } from 'mongoose';

export interface IApplication extends Document {
  jobID: Types.ObjectId;
  candidateID: Types.ObjectId;
  status: 'applied' | 'screening' | 'interviewing' | 'offered' | 'rejected';
  finalScore?: number;
  createdAt: Date;
  updatedAt: Date;
}
