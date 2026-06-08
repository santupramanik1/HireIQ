import { useNavigate, useLocation } from 'react-router-dom';

export default function InterviewCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the state passed from the Interview Room, with fallbacks just in case
  const {
    candidateName = 'Candidate',
    jobTitle = 'the role',
    questionsAnswered = 0,
    durationSeconds = 0,
  } = location.state || {};

  const company = 'HireIQ';

  // Helper to format raw seconds into "Xm Ys"
  const formatDuration = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    // Main Wrapper - Dark Theme Background
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-class flex flex-col selection:bg-indigo-500/30">
      {/* --- Top Navigation Bar --- */}
      <header className="p-4 md:p-8 w-full max-w-7xl mx-auto flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
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
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-medium text-slate-300">
            AI Interview Portal
          </span>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8  ">
        <div className="max-w-2xl w-full flex flex-col items-center text-center animate-fade-in-up">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Headings */}
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
            Interview Complete!
          </h1>
          <p className="text-lg text-indigo-400 font-medium mb-4">
            Thank you, {candidateName}!
          </p>

          {/* Description */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
            Your interview for the{' '}
            <span className="text-white font-semibold">{jobTitle}</span>{' '}
            position has been successfully recorded. Our hiring team will review
            your responses and get back to you within a few business days.
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-12 mb-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">
                {questionsAnswered}
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Responses given
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-slate-800"></div>

            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">
                {formatDuration(durationSeconds)}
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Duration
              </span>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="w-full bg-[#131722] border border-slate-800 rounded-2xl p-6 md:p-8 text-left mb-8 shadow-xl">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
              What happens next?
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 border border-indigo-500/20">
                  1
                </span>
                <span className="text-sm text-slate-300 mt-0.5">
                  Our team will review your interview responses and AI evaluation
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 border border-indigo-500/20">
                  2
                </span>
                <span className="text-sm text-slate-300 mt-0.5">
                  You will receive an email with the next steps
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 border border-indigo-500/20">
                  3
                </span>
                <span className="text-sm text-slate-300 mt-0.5">
                  Expect to hear back within 2–5 business days
                </span>
              </li>
            </ul>
          </div>

          {/* Footer Note */}
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Check your email for confirmation
          </div>
        </div>
      </main>
    </div>
  );
}