import { useEffect, useRef, useState } from 'react';

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
  // This prop allows the card to talk to the parent page
  onStatusChange: (jobId: string, newStatus: string) => void;
}

export function JobCard({
  _id,
  status,
  title,
  type,
  department,
  salary,
  matchCount = 0,
  onStatusChange,
}: JobCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isSelectedActive = status.toLowerCase() === 'active';

  // Helper to format numbers with commas (e.g., 1400000 -> 1,400,000)
  const formatSalary = (amount: number) => {
    return amount ? amount.toLocaleString() : '0';
  };

  // Close the menu if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusSelect = (newStatus: string) => {
    setIsMenuOpen(false);
    if (_id) {
      onStatusChange(_id, newStatus);
    }
  };

  return (
    <div className="bg-white border font-class border-slate-200 rounded-xl p-5 w-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      {/* Top Row: Status Pill & 3-Dot Menu */}
      <div className="flex justify-between items-start w-full">
        {/* Status Pill */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide capitalize ${
            isSelectedActive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              : status.toLowerCase() === 'expired'
                ? 'bg-red-50 text-red-700 border border-red-100'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isSelectedActive
                ? 'bg-emerald-500'
                : status.toLowerCase() === 'expired'
                  ? 'bg-red-500'
                  : 'bg-slate-400'
            }`}
          ></div>
          {status}
        </div>

        {/* Action Menu (...) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </button>

          {/* Dropdown Options */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 shadow-lg rounded-xl py-1.5 z-10 animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => handleStatusSelect('active')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                Set Active
              </button>
              <button
                onClick={() => handleStatusSelect('draft')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-yellow-600 transition-colors cursor-pointer"
              >
                Set Draft
              </button>
              <button
                onClick={() => handleStatusSelect('expired')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors cursor-pointer"
              >
                Set Expired
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Job Title */}
      <h3 className="text-[1.15rem] font-bold text-slate-900 mt-4 mb-3 leading-tight tracking-tight hover:text-blue-600 transition-colors cursor-pointer capitalize">
        {title}
      </h3>

      {/* 3. Info Tags Row */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* Type Tag */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-300 capitalize">
          <span
            className="material-symbols-outlined text-slate-400"
            style={{ fontSize: '18px' }}
          >
            work
          </span>
          {type?.replace('-', ' ')}
        </span>

        {/* Department Tag */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-300 capitalize">
          <span
            className="material-symbols-outlined text-slate-400"
            style={{ fontSize: '18px' }}
          >
            domain
          </span>
          {department}
        </span>

        {/* Salary Tag  */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-300">
          <span
            className="material-symbols-outlined text-slate-400"
            style={{ fontSize: '18px' }}
          >
            attach_money
          </span>
          {salary?.currency} {formatSalary(salary?.min)} -{' '}
          {formatSalary(salary?.max)}
        </span>
      </div>

      {/* 4. Horizontal Divider */}
      <hr className="border-slate-300 mb-4" />

      {/* 5. Footer Area */}
      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
          <span className="material-symbols-outlined text-lg">group</span>
          {matchCount > 0 ? `${matchCount} matches` : 'No matches yet'}
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
