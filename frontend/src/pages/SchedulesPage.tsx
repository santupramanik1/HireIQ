// import{ useState, useMemo } from 'react';

// // ==========================================
// // DUMMY DATA & TYPES
// // ==========================================
// interface Candidate {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   company: string;
//   type: string;
//   status: 'Pending' | 'Completed' | 'Expired';
//   dateSent: string;
//   initials: string;
//   colorClass: string;
// }

// interface InterviewResult extends Candidate {
//   score: number;
//   scoreText: string;
//   recommendation: 'Yes' | 'No' | 'Maybe';
//   duration: string;
//   qaCount: string;
//   dateCompleted: string;
// }

// const DUMMY_JOBS = [
//   'Full Stack React Developer',
//   'Senior Backend Engineer',
//   'Product Designer',
// ];

// const DUMMY_INVITED: Candidate[] = [
//   {
//     id: '1',
//     name: 'Rahul Sanap',
//     email: 'rahulsanap301@gmail.com',
//     role: 'Software Developer',
//     company: 'Eastdil Secured',
//     type: 'Screening',
//     status: 'Pending',
//     dateSent: 'Feb 20, 2026',
//     initials: 'RS',
//     colorClass: 'bg-emerald-500',
//   },
//   {
//     id: '2',
//     name: 'Sarah Johnson',
//     email: 'sarah.johnson@email.com',
//     role: 'Senior Software Engineer',
//     company: 'Google',
//     type: 'phone-screening',
//     status: 'Pending',
//     dateSent: 'Feb 20, 2026',
//     initials: 'SJ',
//     colorClass: 'bg-orange-500',
//   },
//   {
//     id: '3',
//     name: 'Alex Thompson',
//     email: 'alex.thompson@email.com',
//     role: 'Frontend Developer',
//     company: 'Shopify',
//     type: 'phone-screening',
//     status: 'Pending',
//     dateSent: 'Feb 20, 2026',
//     initials: 'AT',
//     colorClass: 'bg-purple-500',
//   },
//   {
//     id: '4',
//     name: 'Michael Chen',
//     email: 'm.chen@email.com',
//     role: 'Full Stack Developer',
//     company: 'Amazon',
//     type: 'Technical',
//     status: 'Pending',
//     dateSent: 'Feb 21, 2026',
//     initials: 'MC',
//     colorClass: 'bg-blue-500',
//   },
// ];

// const DUMMY_RESULTS: InterviewResult[] = [
//   {
//     id: '1',
//     name: 'Rahul Sanap',
//     email: 'rahulsanap301@gmail.com',
//     role: 'Software Developer',
//     company: 'Eastdil Secured',
//     type: 'Screening',
//     status: 'Completed',
//     dateSent: 'Feb 15, 2026',
//     initials: 'RS',
//     colorClass: 'bg-emerald-500',
//     score: 60,
//     scoreText: '6/10',
//     recommendation: 'Yes',
//     duration: '28m',
//     qaCount: '1 Q&A',
//     dateCompleted: 'Mar 1, 2026',
//   },
// ];

// // ==========================================
// // MAIN COMPONENT
// // ==========================================
// export default function SchedulesPage() {
//   const [selectedJob, setSelectedJob] = useState(DUMMY_JOBS[0]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [typeFilter, setTypeFilter] = useState('All Types');
//   const [resultFilter, setResultFilter] = useState('All Results');

//   // Filter logic for Invited Candidates
//   const filteredInvited = useMemo(() => {
//     return DUMMY_INVITED.filter((c) => {
//       const matchesSearch =
//         c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         c.email.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesType = typeFilter === 'All Types' || c.type.toLowerCase().includes(typeFilter.toLowerCase());
//       return matchesSearch && matchesType;
//     });
//   }, [searchQuery, typeFilter]);

//   // Filter logic for Results
//   const filteredResults = useMemo(() => {
//     return DUMMY_RESULTS.filter((r) => {
//       const matchesSearch =
//         r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         r.email.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesSearch;
//     });
//   }, [searchQuery]);

//   return (
//     <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-class">
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* --- HEADER --- */}
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
//             Schedules & Interviews
//           </h1>
//           <p className="text-slate-500 mt-1 text-sm sm:text-base">
//             Track invited candidates and review AI interview results by job.
//           </p>
//         </div>

//         {/* --- FILTER BAR --- */}
//         {/* CHANGED: Switched to flex-wrap and adjusted width utilities so everything stacks on mobile */}
//         <div className="flex flex-col lg:flex-row gap-3">
          
//           <div className="flex flex-col sm:flex-row gap-3 flex-1">
//             {/* Job Dropdown */}
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">work</span>
//               </div>
//               <select
//                 value={selectedJob}
//                 onChange={(e) => setSelectedJob(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
//               >
//                 {DUMMY_JOBS.map((job) => (
//                   <option key={job} value={job}>
//                     {job}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">expand_more</span>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search candidates..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm placeholder:text-slate-400"
//               />
//             </div>
//           </div>

//           {/* Filter Dropdowns */}
//           {/* CHANGED: Removed fixed w-36, made them full width on mobile, and fixed width on larger screens */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="relative w-full sm:w-1/2 lg:w-44">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">filter_alt</span>
//               </div>
//               <select
//                 value={typeFilter}
//                 onChange={(e) => setTypeFilter(e.target.value)}
//                 className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
//               >
//                 <option>All Types</option>
//                 <option>Screening</option>
//                 <option>Technical</option>
//               </select>
//             </div>
//             <div className="relative w-full sm:w-1/2 lg:w-44">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">bar_chart</span>
//               </div>
//               <select
//                 value={resultFilter}
//                 onChange={(e) => setResultFilter(e.target.value)}
//                 className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
//               >
//                 <option>All Results</option>
//                 <option>Passed</option>
//                 <option>Failed</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* --- METRICS CARDS --- */}
//         {/* CHANGED: Made grids adapt gracefully to all breakpoints */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
//               <span className="material-symbols-outlined">mail</span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-slate-500">Invited</p>
//               <h3 className="text-2xl font-bold text-slate-900">{DUMMY_INVITED.length}</h3>
//             </div>
//           </div>
          
//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
//               <span className="material-symbols-outlined">check_circle</span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-slate-500">Completed</p>
//               <h3 className="text-2xl font-bold text-slate-900">{DUMMY_RESULTS.length}</h3>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 sm:col-span-2 md:col-span-1">
//             <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
//               <span className="material-symbols-outlined">trending_up</span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-slate-500">Avg Score</p>
//               <h3 className="text-2xl font-bold text-slate-900">
//                 {DUMMY_RESULTS.length > 0 ? '6.0/10' : '0/10'}
//               </h3>
//             </div>
//           </div>
//         </div>

//         {/* --- MAIN GRID (2 COLUMNS) --- */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          
//           {/* LEFT COLUMN: INVITED CANDIDATES */}
//           {/* CHANGED: Reduced mobile height to 500px so it isn't an infinite scroll block on tiny phones */}
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px] md:h-[700px]">
//             {/* Column Header */}
//             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
//               <div className="flex items-center gap-2">
//                 <span className="material-symbols-outlined text-blue-500 text-[20px]">mail</span>
//                 <h2 className="font-bold text-slate-800">Invited Candidates</h2>
//               </div>
//               <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
//                 {filteredInvited.length}
//               </span>
//             </div>

//             {/* Scrollable List */}
//             <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
//               {filteredInvited.length === 0 ? (
//                 <div className="text-center py-10 text-slate-400">No candidates found.</div>
//               ) : (
//                 filteredInvited.map((candidate) => (
//                   <div key={candidate.id} className="border border-slate-100 rounded-xl p-3 sm:p-4 hover:border-slate-300 transition-colors bg-white shadow-sm hover:shadow flex flex-col sm:flex-row justify-between items-start gap-3">
                    
//                     {/* Avatar & Info */}
//                     <div className="flex items-start gap-3 min-w-0 w-full sm:w-auto">
//                       <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${candidate.colorClass}`}>
//                         {candidate.initials}
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <div className="flex justify-between items-start sm:block">
//                           <h3 className="font-bold text-slate-900 text-sm truncate pr-2 sm:pr-0">{candidate.name}</h3>
                          
//                           {/* Mobile-only status badge (floats right on very small screens) */}
//                           <div className="sm:hidden shrink-0">
//                             <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
//                               <span className="material-symbols-outlined text-[12px]">schedule</span>
//                               {candidate.status}
//                             </span>
//                           </div>
//                         </div>

//                         <p className="text-xs text-slate-500 truncate">{candidate.email}</p>
//                         <p className="text-xs text-slate-400 mt-0.5 truncate">
//                           {candidate.role} <span className="mx-1">@</span> {candidate.company}
//                         </p>
                        
//                         <div className="flex flex-wrap items-center gap-2 mt-3">
//                           <span className="inline-block border border-blue-200 text-blue-600 bg-blue-50 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
//                             {candidate.type}
//                           </span>
//                           <span className="text-[11px] text-slate-400 font-medium">
//                             Sent {candidate.dateSent}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Desktop-only Status Badge */}
//                     <div className="hidden sm:block shrink-0">
//                       <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full">
//                         <span className="material-symbols-outlined text-[14px]">schedule</span>
//                         {candidate.status}
//                       </span>
//                     </div>

//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* RIGHT COLUMN: INTERVIEW RESULTS */}
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px] md:h-[700px]">
//             {/* Column Header */}
//             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
//               <div className="flex items-center gap-2">
//                 <span className="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
//                 <h2 className="font-bold text-slate-800">Interview Results</h2>
//               </div>
//               <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
//                 {filteredResults.length}
//               </span>
//             </div>

//             {/* Scrollable List */}
//             <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
//               {filteredResults.length === 0 ? (
//                 <div className="text-center py-10 text-slate-400">No results found yet.</div>
//               ) : (
//                 filteredResults.map((result) => (
//                   <div key={result.id} className="border border-slate-100 rounded-xl p-3 sm:p-4 hover:border-slate-300 transition-colors bg-white shadow-sm hover:shadow relative group">
                    
//                     {/* External Link Icon (shows on hover) */}
//                     <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-300 hover:text-slate-600 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100">
//                       <span className="material-symbols-outlined text-[18px] sm:text-[20px]">open_in_new</span>
//                     </button>

//                     <div className="flex flex-col sm:flex-row items-start gap-3">
//                       {/* Avatar */}
//                       <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${result.colorClass}`}>
//                         {result.initials}
//                       </div>
                      
//                       {/* Details */}
//                       <div className="flex-1 min-w-0 w-full pr-0 sm:pr-6">
//                         <h3 className="font-bold text-slate-900 text-sm truncate pr-6 sm:pr-0">{result.name}</h3>
//                         <p className="text-xs text-slate-500 truncate mb-4">{result.email}</p>
                        
//                         {/* Score Section */}
//                         <div>
//                           <div className="flex justify-between items-end mb-1.5">
//                             <span className="font-bold text-blue-600 text-lg leading-none">{result.score}%</span>
//                             <span className="text-xs text-slate-400 font-medium">{result.scoreText}</span>
//                           </div>
//                           <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
//                             <div 
//                               className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" 
//                               style={{ width: `${result.score}%` }}
//                             ></div>
//                           </div>
//                         </div>

//                         {/* Bottom Meta row */}
//                         <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
//                           <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
//                             {result.recommendation}
//                           </span>
//                           <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
//                             <span className="material-symbols-outlined text-[14px]">schedule</span>
//                             {result.duration}
//                           </div>
//                           <span className="text-[11px] text-slate-400 font-medium border-l border-slate-200 pl-3">
//                             {result.qaCount}
//                           </span>
//                           <span className="text-[11px] text-slate-400 font-medium border-l border-slate-200 pl-3">
//                             {result.dateCompleted}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useMemo } from 'react';
import InterviewAnalysisPage from './InterviewAnalysisPage'; // Import the new Analysis page

// ==========================================
// DUMMY DATA & TYPES
// ==========================================
interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  type: string;
  status: 'Pending' | 'Completed' | 'Expired';
  dateSent: string;
  initials: string;
  colorClass: string;
}

interface InterviewResult extends Candidate {
  score: number;
  scoreText: string;
  recommendation: 'Yes' | 'No' | 'Maybe';
  duration: string;
  qaCount: string;
  dateCompleted: string;
}

const DUMMY_JOBS = [
  'Full Stack React Developer',
  'Senior Backend Engineer',
  'Product Designer',
];

const DUMMY_INVITED: Candidate[] = [
  {
    id: '1',
    name: 'Rahul Sanap',
    email: 'rahulsanap301@gmail.com',
    role: 'Software Developer',
    company: 'Eastdil Secured',
    type: 'Screening',
    status: 'Pending',
    dateSent: 'Feb 20, 2026',
    initials: 'RS',
    colorClass: 'bg-emerald-500',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'Senior Software Engineer',
    company: 'Google',
    type: 'phone-screening',
    status: 'Pending',
    dateSent: 'Feb 20, 2026',
    initials: 'SJ',
    colorClass: 'bg-orange-500',
  },
  {
    id: '3',
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    role: 'Frontend Developer',
    company: 'Shopify',
    type: 'phone-screening',
    status: 'Pending',
    dateSent: 'Feb 20, 2026',
    initials: 'AT',
    colorClass: 'bg-purple-500',
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    role: 'Full Stack Developer',
    company: 'Amazon',
    type: 'Technical',
    status: 'Pending',
    dateSent: 'Feb 21, 2026',
    initials: 'MC',
    colorClass: 'bg-blue-500',
  },
];

const DUMMY_RESULTS: InterviewResult[] = [
  {
    id: '1',
    name: 'Rahul Sanap',
    email: 'rahulsanap301@gmail.com',
    role: 'Software Developer',
    company: 'Eastdil Secured',
    type: 'Screening',
    status: 'Completed',
    dateSent: 'Feb 15, 2026',
    initials: 'RS',
    colorClass: 'bg-emerald-500',
    score: 60,
    scoreText: '6/10',
    recommendation: 'Yes',
    duration: '28m',
    qaCount: '1 Q&A',
    dateCompleted: 'Mar 1, 2026',
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function SchedulesPage() {
  const [selectedJob, setSelectedJob] = useState(DUMMY_JOBS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [resultFilter, setResultFilter] = useState('All Results');
  
  // NEW STATE: Tracks which candidate's analysis page is open
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

  // Filter logic for Invited Candidates
  const filteredInvited = useMemo(() => {
    return DUMMY_INVITED.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'All Types' || c.type.toLowerCase().includes(typeFilter.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter]);

  // Filter logic for Results
  const filteredResults = useMemo(() => {
    return DUMMY_RESULTS.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  // =========================================================
  // VIEW ROUTING: If an ID is selected, show Analysis Page
  // =========================================================
  if (selectedResultId) {
    return <InterviewAnalysisPage onBack={() => setSelectedResultId(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-class">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- HEADER --- */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Schedules & Interviews
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Track invited candidates and review AI interview results by job.
          </p>
        </div>

        {/* --- FILTER BAR --- */}
        <div className="flex flex-col lg:flex-row gap-3">
          
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Job Dropdown */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-lg">work</span>
              </div>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
              >
                {DUMMY_JOBS.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-lg">expand_more</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
              </div>
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-1/2 lg:w-44">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-lg">filter_alt</span>
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
              >
                <option>All Types</option>
                <option>Screening</option>
                <option>Technical</option>
              </select>
            </div>
            <div className="relative w-full sm:w-1/2 lg:w-44">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-lg">bar_chart</span>
              </div>
              <select
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
              >
                <option>All Results</option>
                <option>Passed</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- METRICS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Invited</p>
              <h3 className="text-2xl font-bold text-slate-900">{DUMMY_INVITED.length}</h3>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Completed</p>
              <h3 className="text-2xl font-bold text-slate-900">{DUMMY_RESULTS.length}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Score</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {DUMMY_RESULTS.length > 0 ? '6.0/10' : '0/10'}
              </h3>
            </div>
          </div>
        </div>

        {/* --- MAIN GRID (2 COLUMNS) --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          
          {/* LEFT COLUMN: INVITED CANDIDATES */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px] md:h-[700px]">
            {/* Column Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500 text-[20px]">mail</span>
                <h2 className="font-bold text-slate-800">Invited Candidates</h2>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                {filteredInvited.length}
              </span>
            </div>

            {/* Scrollable List */}
            <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
              {filteredInvited.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No candidates found.</div>
              ) : (
                filteredInvited.map((candidate) => (
                  <div key={candidate.id} className="border border-slate-100 rounded-xl p-3 sm:p-4 hover:border-slate-300 transition-colors bg-white shadow-sm hover:shadow flex flex-col sm:flex-row justify-between items-start gap-3">
                    
                    {/* Avatar & Info */}
                    <div className="flex items-start gap-3 min-w-0 w-full sm:w-auto">
                      <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${candidate.colorClass}`}>
                        {candidate.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-start sm:block">
                          <h3 className="font-bold text-slate-900 text-sm truncate pr-2 sm:pr-0">{candidate.name}</h3>
                          
                          {/* Mobile-only status badge */}
                          <div className="sm:hidden shrink-0">
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                              <span className="material-symbols-outlined text-[12px]">schedule</span>
                              {candidate.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 truncate">{candidate.email}</p>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {candidate.role} <span className="mx-1">@</span> {candidate.company}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="inline-block border border-blue-200 text-blue-600 bg-blue-50 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            {candidate.type}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            Sent {candidate.dateSent}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop-only Status Badge */}
                    <div className="hidden sm:block shrink-0">
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {candidate.status}
                      </span>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: INTERVIEW RESULTS */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px] md:h-[700px]">
            {/* Column Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
                <h2 className="font-bold text-slate-800">Interview Results</h2>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                {filteredResults.length}
              </span>
            </div>

            {/* Scrollable List */}
            <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
              {filteredResults.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No results found yet.</div>
              ) : (
                filteredResults.map((result) => (
                  <div key={result.id} className="border border-slate-100 rounded-xl p-3 sm:p-4 hover:border-slate-300 transition-colors bg-white shadow-sm hover:shadow relative group">
                    
                    {/* NEW: Clickable External Link Icon */}
                    <button 
                      onClick={() => setSelectedResultId(result.id)}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-300 hover:text-indigo-600 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                      title="View Full Analysis"
                    >
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">open_in_new</span>
                    </button>

                    <div className="flex flex-col sm:flex-row items-start gap-3">
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${result.colorClass}`}>
                        {result.initials}
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0 w-full pr-0 sm:pr-6">
                        <h3 className="font-bold text-slate-900 text-sm truncate pr-6 sm:pr-0">{result.name}</h3>
                        <p className="text-xs text-slate-500 truncate mb-4">{result.email}</p>
                        
                        {/* Score Section */}
                        <div>
                          <div className="flex justify-between items-end mb-1.5">
                            <span className="font-bold text-blue-600 text-lg leading-none">{result.score}%</span>
                            <span className="text-xs text-slate-400 font-medium">{result.scoreText}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
                            <div 
                              className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${result.score}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Bottom Meta row */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
                          <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                            {result.recommendation}
                          </span>
                          <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            {result.duration}
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium border-l border-slate-200 pl-3">
                            {result.qaCount}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium border-l border-slate-200 pl-3">
                            {result.dateCompleted}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}