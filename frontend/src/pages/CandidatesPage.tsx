import axios from 'axios';
import { useEffect, useState } from 'react';

interface Candidate {
  applicationId: string;
  candidateName: string;
  candidateEmail: string;
  jobId:{title:string}; 
  status: string;
  appliedAt: string;
}

export default function CandidateTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //   Fetch Data from API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/applications/candidates`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setCandidates(response.data.data);
        } else {
          throw new Error(response.data.message || 'Error loading data');
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to fetch candidates';

        setError(errorMessage);
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  },[]);

//   Render Loading State
  if (isLoading) {
    return (
      <div className="w-full max-w-8xl mx-auto p-4 min-h-100 flex items-center justify-center">
        <div className="flex flex-col items-center text-gray-500">
          <svg className="animate-spin h-8 w-8 mb-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading candidate pipeline...</p>
        </div>
      </div>
    );
  }

//   Render Error State
  if (error) {
    return (
      <div className="w-full max-w-8xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
          <span className="font-bold mr-2">Error:</span> {error}
        </div>
      </div>
    );
  }

  // Main Render (Success)
  return (
    <div className="w-full max-w-9xl mx-auto p-4">
      {/* ---  Heading Section --- */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Candidate Pipeline
            <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200 shadow-sm">
              {candidates.length} Total
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage applicants across all open positions.
          </p>
        </div>
      </div>
      {/* ------------------------------- */}

      <div className="w-full bg-white shadow-sm rounded-lg border border-gray-200 overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-md text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 ">
                  Candidate
                </th>
                <th scope="col" className="px-6 py-4 ">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-4 ">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 ">
                  Applied At
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, idx) => (
                <tr
                  key={idx}
                  // --- Awesome Hover Classes Added Here ---
                  className="group relative bg-white border-b border-gray-100 transition-all duration-300 ease-in-out hover:bg-blue-50/30 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:z-10 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    {/* Added group-hover:text-blue-600 to make the name light up on row hover */}
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {c.candidateName}
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {c.candidateEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4">{c.jobId.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(c.appliedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
