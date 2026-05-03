import { useEffect, useState } from "react";
import { JobCard } from "../components/job/JobCard";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

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

// ==========================================
// MOCK DATA
// ==========================================

const metrics: MetricCard[] = [
  {
    title: "Total Jobs",
    value: 7,
    icon: "assignment",
    colorClass: "text-blue-600",
    bgClass: "bg-blue-50"
  },
  {
    title: "Active",
    value: 5,
    icon: "check_circle",
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-50"
  },
  {
    title: "Drafts",
    value: 2,
    icon: "edit_note",
    colorClass: "text-amber-600",
    bgClass: "bg-amber-50"
  },
  {
    title: "Expired",
    value: 0,
    icon: "history",
    colorClass: "text-slate-500",
    bgClass: "bg-slate-100"
  }
];

interface DashboardContext {
  refreshTrigger: number;
}

export default function JobsPage() {
  const [jobList, setJobList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Grab the trigger from the parent Layout
  const { refreshTrigger } = useOutletContext<DashboardContext>();

  // Fetch jobs from backend
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/jobs`,
        { withCredentials: true }
      );
      setJobList(data.data.jobs);
    } catch (error: any) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [refreshTrigger]);

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
            Showing {jobList.length} jobs
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Sort by:{" "}
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobList.map((job) => (
            <JobCard
              key={job._id} 
              status={job.status}
              title={job.title}
              type={job.type} 
              department={job.department}
              salary={job.salary}
              matchCount={0}
            />
          ))}
        </section>
      )}
    </>
  );
}
