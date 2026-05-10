import { Document, Types } from 'mongoose';

export interface IInterview extends Document {
  applicationId: string | Types.ObjectId;

  // Structured Q&A mapped from Vapi's structuredData
  qaPairs: {
    question: string;
    answer?: string;
    score?: number;
    feedback?: string;
  }[];

  // AI-generated scores
  overallRating: number;

  // Vapi Call Details
  transcript?: string; // Full raw text of the interview
  recordingUrl?: string; // URL to the MP3 recording
  vapiCallId?: string; // Unique reference ID from Vapi

  // Call Metadata
  mode: 'voice' | 'chat' | 'video';
  status: 'pending' | 'completed' | 'failed';
  conductedAt: Date;
}
