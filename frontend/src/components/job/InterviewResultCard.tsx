import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface InterviewResultCardProps {
  candidate: any;
}

export const InterviewResultCard = ({ candidate }: InterviewResultCardProps) => {
 
 const voiceData = candidate?.aiAnalysis?.voiceInterview || {};
  const chartData = {
    labels: ['Communication', 'Technical Depth', 'Confidence'],
    datasets: [
      {
        label: 'Score Breakdown',
        data: [
          voiceData.communicationScore || 0,
          voiceData.technicalScore || 0,
          voiceData.confidenceScore || 0,
        ],
        // Three distinct colors for the three slices (Blue, Indigo, Purple)
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', 
          'rgba(99, 102, 241, 0.7)', 
          'rgba(168, 85, 247, 0.7)', 
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 4, 
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const, 
        labels: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
            weight: 'bold' as const,
          },
          color: '#4b5563', // gray-600
          padding: 15,
          usePointStyle: true, // Makes the legend markers circular instead of boxes
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)', // gray-900
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return ` ${context.label}: ${context.raw}%`;
          }
        }
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col min-h-100">
      {/* Card Header & Status Badge */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">
            analytics
          </span>
          Interview Performance
        </h2>

        {/* Dynamic Status Badge */}
        {voiceData.status === 'completed' ? (
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
      {voiceData.status === 'completed' ? (
        <>
          <div className="flex flex-col md:flex-row gap-6 mb-6 flex-1">
            {/* Overall Score Box */}
            <div className="flex flex-col items-center justify-center p-6 bg-indigo-50 rounded-xl border border-indigo-100 min-w-35">
              <span className="text-4xl font-black text-indigo-700">
                {voiceData.overallScore || 0}%
              </span>
              <span className="text-xs text-indigo-900/60 font-semibold mt-2 uppercase tracking-wide text-center">
                Overall<br />Performance
              </span>
            </div>

            {/* Chart.js Pie Graph Container */}
            <div className="flex-1 min-h-50 w-full relative flex items-center justify-center pl-2">
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        </>
      ) : (
        // --- PENDING STATE ---
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
            <span className="material-symbols-outlined text-gray-400 text-3xl">mic</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Awaiting AI Interview
          </h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs">
            Voice screening analysis and performance graphs will appear here after the candidate completes their automated interview.
          </p>
          <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">send</span>
            Send Interview Invite
          </button>
        </div>
      )}
    </div>
  );
};