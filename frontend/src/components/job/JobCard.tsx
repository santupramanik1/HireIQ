interface Job {
  id: number;
  title: string;
  status: "Draft" | "Active";
  schedule: string;
  level: string;
  salary: string;
  matchCount: number;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Full Stack React Developer",
    status: "Active",
    schedule: "Full-Time",
    level: "Mid",
    salary: "$ USD 100,000-140,000",
    matchCount: 4,
  },
  {
    id: 2,
    title: "Senior React Native Developer",
    status: "Active",
    schedule: "Full-Time",
    level: "Senior",
    salary: "$ USD 150,000-190,000",
    matchCount: 12,
  },
  {
    id: 3,
    title: "Product Designer (UI/UX)",
    status: "Active",
    schedule: "Remote",
    level: "Mid-Senior",
    salary: "$ USD 90,000-130,000",
    matchCount: 3,
  },
  {
    id: 4,
    title: "Data Engineer (PySpark)",
    status: "Draft",
    schedule: "Hybrid",
    level: "Lead",
    salary: "$ USD 140,000-180,000",
    matchCount: 0,
  },
];
export function JobCard({
  status,
  title,
  schedule,
  level,
  salary,
  matchCount,
}: Omit<Job, "id">) {
  const isSelectedActive = status === "Active";

  return (
    <div className="bg-white border font-class border-slate-200 rounded-xl p-5 w-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      {/* 1. Status Pill */}
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full  text-xs font-bold tracking-wide ${
          isSelectedActive
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
            : "bg-slate-100 text-slate-600 border border-slate-200"
        }`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${isSelectedActive ? "bg-emerald-500" : "bg-slate-400"}`}
        ></div>
        {status}
      </div>

      {/* 2. Job Title */}
      <h3 className="text-[1.15rem] font-bold text-slate-900 mt-4 mb-3 leading-tight tracking-tight hover:text-blue-600 transition-colors cursor-pointer">
        {title}
      </h3>

      {/* 3. Info Tags Row */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-300">
          <span className="material-symbols-outlined text-[16px] text-slate-400" style={{fontSize:"18px"}}>
            work
          </span>
          {schedule}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-300">
          <span className="material-symbols-outlined text-[16px] text-slate-400" style={{fontSize:"18px"}} >
            schedule
          </span>
          {level}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-300">
          <span className="material-symbols-outlined text-[16px] text-slate-400" style={{fontSize:"18px"}}>
            attach_money
          </span>
          {salary}
        </span>
      </div>

      {/* 4. Horizontal Divider */}
      <hr className="border-slate-300 mb-4" />

      {/* 5. Footer Area */}
      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
          <span className="material-symbols-outlined text-lg">group</span>
          {matchCount > 0 ? `${matchCount} matches` : "No matches yet"}
        </div>

        <button className="bg-linear-to-r from-violet-600 cursor-pointer to-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[18px]">
            auto_awesome
          </span>
          Find Matches
        </button>
      </div>
    </div>
  );
}
