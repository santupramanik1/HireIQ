import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartInterviewPage() {
  const navigate = useNavigate();

  // These would normally come from your database or URL params
  const [candidateName, setCandidateName] = useState('Santu Pramanik');
  const [candidateEmail, setCandidateEmail] = useState('santu700141@gmail.com');
  const jobTitle = 'Senior Backend Developer';
  const company = 'HireIQ';

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the actual active interview room/component
    // navigate(`/interview/room/${interviewId}`);
    console.log('Starting interview for:', candidateName);
  };

  return (
    // Main Wrapper - Dark Theme Background
    <div className="min-h-screen bg-[#0B0F19] text-slate-300  p-4 md:p-8 selection:bg-indigo-500/30 font-class">
      <div className="max-w-6xl mx-auto">
        {/* --- Top Navigation Bar --- */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              {company}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300">
              AI Interview Portal
            </span>
          </div>
        </div>

        {/* --- Hero / Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                AI Technical Interview
              </span>
              <p className="text-sm text-slate-400">
                You're invited to interview for
              </p>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {jobTitle}{' '}
              <span className="text-slate-500 font-medium">@ {company}</span>
            </h1>
          </div>

          {/* Job Tags */}
          <div className="flex flex-wrap gap-2 md:mt-8">
            <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium rounded-lg">
              Full-time
            </span>
            <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium rounded-lg">
              Remote
            </span>
            <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium rounded-lg">
              20–30 minutes
            </span>
          </div>
        </div>

        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Interview Details Card */}
            <div className="bg-[#131722] border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
                Interview Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
                    <svg
                      className="w-5 h-5 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Position</p>
                    <p className="text-sm font-semibold text-slate-200">
                      {jobTitle}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
                    <svg
                      className="w-5 h-5 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Location</p>
                    <p className="text-sm font-semibold text-slate-200">
                      Remote
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
                    <svg
                      className="w-5 h-5 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Duration</p>
                    <p className="text-sm font-semibold text-slate-200">
                      20-30 minutes
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
                    <svg
                      className="w-5 h-5 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Type</p>
                    <p className="text-sm font-semibold text-slate-200">
                      AI Technical Interview
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <span className="px-4 py-1.5 bg-slate-800/50 border border-slate-700 text-slate-400 text-xs font-medium rounded-full">
                  English
                </span>
              </div>
            </div>

            {/* What to Expect Card */}
            <div className="bg-[#131722] border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
                What to expect
              </h2>
              <ul className="space-y-4">
                {[
                  'You will be asked technical questions based on your background and the role.',
                  'The AI voice agent will guide you through the entire interview.',
                  'Speak clearly and take your time — there is no rush.',
                  'Your responses will be recorded and reviewed by the hiring team.',
                  'You will receive a follow-up email with next steps after the interview.',
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-slate-300 leading-relaxed">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Before You Begin Card */}
            <div className="bg-[#131722] border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
                Before you begin
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-800 rounded-xl">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span className="text-xs text-slate-300 font-medium">
                    Headphones recommended
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-800 rounded-xl">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                  <span className="text-xs text-slate-300 font-medium">
                    Working microphone required
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-800 rounded-xl">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs text-slate-300 font-medium">
                    Webcam required
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-800 rounded-xl">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                  <span className="text-xs text-slate-300 font-medium">
                    Stable internet connection
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-800 rounded-xl sm:col-span-2">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.52 22C3.575 22 2 20.425 2 18.48V5.52C2 3.575 3.575 2 5.52 2h12.96C20.425 2 22 3.575 22 5.52v12.96c0 1.945-1.575 3.52-3.52 3.52H5.52zM12 16.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5z"
                    />
                  </svg>
                  <span className="text-xs text-slate-300 font-medium">
                    Quiet environment preferred
                  </span>
                </div>
              </div>
            </div>

            {/* Action / Form Card */}
            <div className="bg-linear-to-b from-[#1C1635] to-[#121020] border border-indigo-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Background Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

              <div className="flex gap-4 items-center mb-8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
                  <svg
                    className="w-6 h-6 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Ready to begin?
                  </h2>
                  <p className="text-sm text-indigo-200/70">
                    Confirm your details to start the interview
                  </p>
                </div>
              </div>

              <form onSubmit={handleStart} className="space-y-5 relative z-10">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Full Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Interview sent to
                  </label>
                  <input
                    type="email"
                    disabled
                    value={candidateEmail}
                    className="w-full bg-[#0B0F19]/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-4 py-3.5 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
                >
                  Start Interview
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <p className="text-[11px] text-center text-slate-500 mt-4">
                  By starting, you agree that your responses will be recorded
                  and reviewed by the hiring team.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
