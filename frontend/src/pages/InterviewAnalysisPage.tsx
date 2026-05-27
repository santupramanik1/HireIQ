import React from 'react';

// ==========================================
// DUMMY DATA
// ==========================================
const ANALYSIS_DATA = {
  candidateName: 'Rahul Sanap',
  role: 'Full Stack React Developer',
  date: 'Mar 1, 2026',
  scores: {
    overall: 6,
    max: 10,
    communication: 6,
    technical: 5,
    recommendation: 'Yes',
  },
  strengths: [
    'Participated actively in the interview',
    'Provided detailed, thoughtful responses',
    'Engaged with the AI interviewer throughout the session',
  ],
  concerns: [
    'Lacked specific deep-dive technical examples',
    'Some answers were slightly repetitive',
  ],
  analysisText:
    'Rahul Sanap completed the AI interview session with 1 responses out of 2 questions asked. The candidate provided detailed and substantive answers. A full AI analysis was not available — please review the transcript for a complete evaluation.',
  highlightQuote:
    '"hey I my name is Rahul sanab I\'m working with the IT industry from last 10 years..."',
  transcript: [
    {
      id: 1,
      sender: 'AI Interviewer',
      role: 'ai',
      time: '07:18 PM',
      text: "Hi Rahul Sanap! Welcome to your AI interview for the Full Stack React Developer position. I'm your AI interviewer today. We'll go through about 6 to 8 questions over the next 15 to 20 minutes. Let's start — can you tell me a bit about yourself and your background?",
    },
    {
      id: 2,
      sender: 'Rahul Sanap',
      role: 'candidate',
      time: '07:19 PM',
      text: "hey I my name is Rahul sanab I'm working with the IT industry from last 10 years and I'm an expert in a react on nodejs I'm working as a full stack developer",
    },
    {
      id: 3,
      sender: 'AI Interviewer',
      role: 'ai',
      time: '07:19 PM',
      text: 'Great, thank you! Can you walk me through your most relevant experience for this Full Stack role, specifically focusing on your work with React and Node.js?',
    },
  ],
};

// ==========================================
// COMPONENT
// ==========================================
export default function InterviewAnalysisPage({
  onBack,
}: {
  onBack?: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-class">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* --- HEADER & BACK BUTTON --- */}
        <div className="flex flex-col gap-4 mb-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors w-fit"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            Back to Schedules
          </button>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {ANALYSIS_DATA.candidateName}'s Analysis
            </h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2 text-sm sm:text-base">
              <span className="material-symbols-outlined text-[18px]">
                work
              </span>
              {ANALYSIS_DATA.role} <span className="mx-1">•</span>{' '}
              {ANALYSIS_DATA.date}
            </p>
          </div>
        </div>

        {/* --- MAIN LAYOUT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN (Scores & Traits) - Sticky on Desktop */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8">
            {/* AI Scores Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-8">
                <span className="material-symbols-outlined text-indigo-500">
                  bar_chart
                </span>
                <h2 className="font-bold text-slate-800 text-lg">AI Scores</h2>
              </div>

              {/* Overall Score Circle/Text */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="text-5xl font-black text-slate-900 tracking-tighter">
                  {ANALYSIS_DATA.scores.overall}
                  <span className="text-2xl text-slate-400 font-medium tracking-normal">
                    /{ANALYSIS_DATA.scores.max}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-400 mt-1">
                  Overall Score
                </p>
              </div>

              {/* Progress Bars */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-600">Communication</span>
                    <span className="text-slate-900">
                      {ANALYSIS_DATA.scores.communication}/
                      {ANALYSIS_DATA.scores.max}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full w-[60%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-600">Technical</span>
                    <span className="text-slate-900">
                      {ANALYSIS_DATA.scores.technical}/
                      {ANALYSIS_DATA.scores.max}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full w-[50%]"></div>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-slate-100" />

              {/* Recommendation */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-500">
                  Recommendation
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-sm font-bold px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  {ANALYSIS_DATA.scores.recommendation}
                </span>
              </div>
            </div>

            {/* Strengths Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-emerald-500">
                  task_alt
                </span>
                <h2 className="font-bold text-slate-800 text-lg">Strengths</h2>
              </div>
              <ul className="space-y-3">
                {ANALYSIS_DATA.strengths.map((strength, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-600 font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Concerns Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-amber-500">
                  error
                </span>
                <h2 className="font-bold text-slate-800 text-lg">Concerns</h2>
              </div>
              <ul className="space-y-3">
                {ANALYSIS_DATA.concerns.map((concern, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-600 font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></div>
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN (Analysis & Transcript) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* AI Analysis Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-indigo-600">
                  insights
                </span>
                <h2 className="font-bold text-slate-800 text-lg">
                  AI Analysis
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                {ANALYSIS_DATA.analysisText}
              </p>

              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">
                  Key Highlights
                </h3>
                <div className="flex items-start gap-3 bg-amber-50/50 border border-amber-100 p-4 rounded-xl text-slate-700 italic text-sm font-medium">
                  <span
                    className="material-symbols-outlined text-amber-400 shrink-0 text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {ANALYSIS_DATA.highlightQuote}
                </div>
              </div>
            </div>

            {/* Full Transcript */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500">
                    description
                  </span>
                  <h2 className="font-bold text-slate-800 text-lg">
                    Full Conversation Transcript
                  </h2>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  {ANALYSIS_DATA.transcript.length} messages
                </span>
              </div>

              {/* Chat Container */}
              <div className="p-4 sm:p-6 space-y-8">
                {ANALYSIS_DATA.transcript.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                        msg.role === 'ai'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {msg.role === 'ai' ? 'AI' : msg.sender.charAt(0)}
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-sm">
                          {msg.sender}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
