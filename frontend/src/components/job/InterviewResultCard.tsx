interface InterviewResultCardProps {
  candidate: any;
}

export const InterviewResultCard = ({
  candidate,
}: InterviewResultCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col min-h-62.5">
      {/* Card Header & Status Badge */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
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
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          Interview Analysis
        </h2>

        {/* Dynamic Status Badge */}
        {candidate?.aiAnalysis?.voiceInterview?.status === 'completed' ? (
          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
            Completed
          </span>
        ) : (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
            Pending
          </span>
        )}
      </div>

      {/* CONDITIONAL RENDERING */}
      {candidate?.aiAnalysis?.voiceInterview?.status === 'completed' ? (
        // --- COMPLETED STATE: Show the charts ---
        <>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Overall Score Box */}
            <div className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl border border-indigo-100 min-w-30">
              <span className="text-3xl font-black text-indigo-700">
                {candidate.aiAnalysis.voiceInterview.overallScore}%
              </span>
              <span className="text-xs text-indigo-900/60 font-semibold mt-1 uppercase tracking-wide">
                Overall
              </span>
            </div>

            {/* Detailed Metrics */}
            <div className="flex-1 space-y-4 justify-center flex flex-col">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-gray-700">Communication Skills</span>
                  <span className="text-gray-900">
                    {candidate.aiAnalysis.voiceInterview.communicationScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000"
                    style={{
                      width: `${candidate.aiAnalysis.voiceInterview.communicationScore}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-gray-700">Technical Depth</span>
                  <span className="text-gray-900">
                    {candidate.aiAnalysis.voiceInterview.technicalScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-1.5 rounded-full transition-all duration-1000"
                    style={{
                      width: `${candidate.aiAnalysis.voiceInterview.technicalScore}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-gray-700">Problem Solving</span>
                  <span className="text-gray-900">
                    {candidate.aiAnalysis.voiceInterview.problemSolvingScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000"
                    style={{
                      width: `${candidate.aiAnalysis.voiceInterview.problemSolvingScore}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Recording
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Transcript
            </button>
          </div>
        </>
      ) : (
        // --- PENDING STATE: Show the empty placeholder ---
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Awaiting AI Interview
          </h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs">
            Voice screening analysis will appear here after the candidate
            completes their automated interview.
          </p>
          <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Send Interview Invite
          </button>
        </div>
      )}
    </div>
  );
};
