import { useEffect, useState } from 'react';
import { JobCard } from '../components/job/JobCard';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import MatchCandidatesModal from '../components/job/MatchCandidatesModal';

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface MetricCard {
  title: string;
  value: number;
  icon: string;
  colorClass: string;
  bgClass: string;
}

interface DashboardContext {
  refreshTrigger: number;
}

export default function JobsPage() {
  const [jobList, setJobList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState<number>(0);

  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [activeJobTitle, setActiveJobTitle] = useState('');
  const [activeJobId, setActiveJobId] = useState('');

  const handleOpenMatchModal = (title: string, id: string) => {
    setActiveJobTitle(title);
    setActiveJobId(id);
    setIsMatchModalOpen(true);
  };
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Grab the trigger from the parent Layout
  const { refreshTrigger } = useOutletContext<DashboardContext>();

  // Fetch jobs from backend
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/jobs?limit=50`,
        { withCredentials: true }
      );
      setJobList(data.data.jobs);
      setTotalJobs(data.data.totalJobs);
    } catch (error: any) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    setCurrentPage(1); // Reset page on refresh
  }, [refreshTrigger]);

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    console.log('Handle status');
    setJobList((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, status: newStatus } : job
      )
    );
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      toast.success(`Job marked as ${newStatus}`);
    } catch (error: any) {
      toast.error('Failed to update job status.');
      fetchJobs();
    }
  };

  const activeCount = jobList.filter(
    (job) => job.status.toLowerCase() === 'active'
  ).length;
  const draftCount = jobList.filter(
    (job) => job.status.toLowerCase() === 'draft'
  ).length;
  const expiredCount = jobList.filter(
    (job) => job.status.toLowerCase() === 'expired'
  ).length;

  // Pagination calculation
  const totalItems = jobList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const metrics: MetricCard[] = [
    {
      title: 'Total Jobs',
      value: totalJobs,
      icon: 'assignment',
      colorClass: 'text-blue-600',
      bgClass: 'bg-blue-50',
    },
    {
      title: 'Active',
      value: activeCount,
      icon: 'check_circle',
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50',
    },
    {
      title: 'Drafts',
      value: draftCount,
      icon: 'edit_note',
      colorClass: 'text-amber-600',
      bgClass: 'bg-amber-50',
    },
    {
      title: 'Expired',
      value: expiredCount,
      icon: 'history',
      colorClass: 'text-slate-500',
      bgClass: 'bg-slate-100',
    },
  ];

  return (
    <>
      {/* Header Section */}
      <section className="mb-10">
        <h1 className="text-sm sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
          Manage open positions
        </h1>
        <p className=" sm:text-lg text-slate-500 max-w-2xl">
          Use AI to find the best candidates effortlessly with our curated
          matching engine.
        </p>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white p-5 sm:p-6 rounded-xl flex flex-col gap-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${metric.bgClass} ${metric.colorClass}`}
            >
              <span className="material-symbols-outlined">{metric.icon}</span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">
                {metric.title}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {metric.value}
              </h3>
            </div>
          </div>
        ))}
      </section>

      {/* List Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Showing {totalItems} jobs
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Sort by:{' '}
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
              Recently Created
            </span>
          </p>
        </div>
      </div>

      {/* Job Cards Grid */}
      {isLoading ? (
        <p className="text-slate-500">Loading jobs...</p>
      ) : (
        <div className="flex flex-col gap-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <JobCard
                key={job._id}
                _id={job._id}
                status={job.status}
                title={job.title}
                type={job.type}
                department={job.department}
                salary={job.salary}
                matchCount={job.matchCount || 0}
                onStatusChange={handleStatusChange}
                onFindMatches={handleOpenMatchModal}
              />
            ))}
          </section>

          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-sm text-gray-600 font-medium font-class">
                Showing <span className="font-bold text-gray-900">{totalItems === 0 ? 0 : indexOfFirstItem + 1}</span> to{' '}
                <span className="font-bold text-gray-900">{Math.min(indexOfLastItem, totalItems)}</span> of{' '}
                <span className="font-bold text-gray-900">{totalItems}</span> jobs
              </span>

              <div className="inline-flex items-center gap-1.5 font-class">
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
                    className={`min-w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold border transition-all cursor-pointer select-none ${
                      currentPage === page
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
      )}

      <MatchCandidatesModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        jobTitle={activeJobTitle}
        jobId={activeJobId}
      />
    </>
  );
}
