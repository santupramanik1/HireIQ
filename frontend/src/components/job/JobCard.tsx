export interface JobSalary {
  min: number;
  max: number;
  currency: string;
}


export interface JobCardProps {
  _id?: string;
  status: string;
  title: string;
  type: string; 
  department: string; 
  salary: JobSalary;
  matchCount?: number;
}

export function JobCard({
  status,
  title,
  type,
  department,
  salary,
  matchCount = 0,
}: JobCardProps) {

  const isSelectedActive = status.toLowerCase() === "active";

  // Helper to format numbers with commas (e.g., 1400000 -> 1,400,000)
  const formatSalary = (amount: number) => {
    return amount ? amount.toLocaleString() : "0";
  };

  return (
    <div className="bg-white border font-class border-slate-200 rounded-xl p-5 w-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      {/* 1. Status Pill */}
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide capitalize ${
          isSelectedActive
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
            : "bg-slate-100 text-slate-600 border border-slate-200"
        }`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            isSelectedActive ? "bg-emerald-500" : "bg-slate-400"
          }`}
        ></div>
        {status}
      </div>

      {/* 2. Job Title */}
      <h3 className="text-[1.15rem] font-bold text-slate-900 mt-4 mb-3 leading-tight tracking-tight hover:text-blue-600 transition-colors cursor-pointer capitalize">
        {title}
      </h3>

      {/* 3. Info Tags Row */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* Type Tag */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-300 capitalize">
          <span className="material-symbols-outlined text-slate-400" style={{ fontSize: "18px" }}>
            work
          </span>
          {type?.replace("-", " ")}
        </span>
        
        {/* Department Tag */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-300 capitalize">
          <span className="material-symbols-outlined text-slate-400" style={{ fontSize: "18px" }}>
            domain
          </span>
          {department}
        </span>
        
        {/* Salary Tag  */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-300">
          <span className="material-symbols-outlined text-slate-400" style={{ fontSize: "18px" }}>
            attach_money
          </span>
          {salary?.currency} {formatSalary(salary?.min)} - {formatSalary(salary?.max)}
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

        <button className="bg-linear-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">
            auto_awesome
          </span>
          Find Matches
        </button>
      </div>
    </div>
  );
}