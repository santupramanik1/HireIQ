import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

interface Candidate {
  applicationId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: { title: string };
  status: string;
  appliedAt: string;
}

const getStatusBadgeClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'applied':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'screening':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'interviewing':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'offered':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'rejected':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export default function CandidateTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const [candidateToDelete, setCandidateToDelete] = useState<string | null>(null);

  const confirmDeleteCandidate = async (applicationId: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/applications/candidates/${applicationId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setCandidates(prev => prev.filter(c => c.applicationId !== applicationId));
        toast.success('Candidate deleted successfully.');
      }
    } catch (err: any) {
      console.error('Failed to delete candidate:', err);
      toast.error(err.response?.data?.message || 'Failed to delete candidate.');
    } finally {
      setCandidateToDelete(null);
    }
  };

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
  }, []);

  //   Render Loading State
  if (isLoading) {
    return (
      <div className="w-full max-w-8xl mx-auto p-4 min-h-100 flex items-center justify-center">
        <div className="flex flex-col items-center text-gray-500">
          <svg
            className="animate-spin h-8 w-8 mb-4 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>Loading candidates...</p>
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

  // Pagination calculation
  const totalItems = candidates.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = candidates.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Main Render (Success)
  return (
    <div className="w-full max-w-9xl mx-auto p-4 page-reveal">
      {/* ---  Heading Section --- */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Candidates List
            <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200 shadow-sm">
              {totalItems} Total
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage applicants across all open positions.
          </p>
        </div>
      </div>
      {/* ------------------------------- */}

      <div className="w-full bg-white shadow-sm rounded-lg border border-gray-200 overflow-visible flex flex-col">
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
                <th scope="col" className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCandidates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400 font-medium">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                currentCandidates.map((c, idx) => (
                  <tr
                    key={idx}
                    // --- Awesome Hover Classes Added Here ---
                    className="group relative bg-white border-b border-gray-100 transition-all duration-300 ease-in-out hover:bg-blue-50/30 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:z-10 cursor-pointer"
                  >
                    <td
                      onClick={() =>
                        navigate(`/dashboard/candidate-info/${c.applicationId}`)
                      }
                      className="px-6 py-4"
                    >
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {c.candidateName}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        {c.candidateEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4">{c.jobId?.title || 'Unknown Position'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize border shadow-sm ${getStatusBadgeClass(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(c.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCandidateToDelete(c.applicationId);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors p-1.5 rounded-lg hover:bg-red-50 cursor-pointer inline-flex items-center"
                        title="Delete Candidate"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- Pagination Controls --- */}
        {totalItems > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50/50 rounded-b-lg">
            <span className="text-sm text-gray-600 font-medium">
              Showing <span className="font-bold text-gray-900">{totalItems === 0 ? 0 : indexOfFirstItem + 1}</span> to{' '}
              <span className="font-bold text-gray-900">{Math.min(indexOfLastItem, totalItems)}</span> of{' '}
              <span className="font-bold text-gray-900">{totalItems}</span> candidates
            </span>

            <div className="inline-flex items-center gap-1.5">
              {/* Previous Page Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all cursor-pointer select-none"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`min-w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold border transition-all cursor-pointer select-none ${currentPage === page
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-slate-50 hover:text-gray-900'
                    }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Page Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all cursor-pointer select-none"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- Custom Delete Confirmation Modal --- */}
      {candidateToDelete && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-100 transform scale-100 transition-all duration-300 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-4 mx-auto">
              <span className="material-symbols-outlined text-[28px]">warning</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Candidate?</h3>
            <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              Are you sure you want to delete this candidate's application? This will permanently erase their resume analysis and interview history. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setCandidateToDelete(null)}
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl transition-all cursor-pointer select-none"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDeleteCandidate(candidateToDelete)}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-all cursor-pointer shadow-md shadow-red-200 select-none"
              >
                Delete Candidate
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
