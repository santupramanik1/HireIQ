import { JobCard, jobs } from "../components/job/JobCard";

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

export default function JobsPage() {
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
              <span className="material-symbols-outlined">
                {metric.icon}
              </span>
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
            Showing {jobs.length} jobs
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
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            status={job.status}
            title={job.title}
            schedule={job.schedule}
            level={job.level}
            salary={job.salary}
            matchCount={job.matchCount}
          />
        ))}
      </section>
    </>
  );
}