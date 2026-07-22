// import { useState, useMemo, useEffect } from 'react';
// import axios from 'axios';
// import InterviewAnalysisPage from './InterviewAnalysisPage';

// // ==========================================
// // TYPES
// // ==========================================
// interface Job {
//   id: string;
//   title: string;
// }

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

// // ==========================================
// // CONSTANTS & HELPERS
// // ==========================================

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

// // Generates initials from a full name (e.g., "John Doe" -> "JD")
// const getInitials = (name: string) => {
//   if (!name) return '??';
//   return name
//     .split(' ')
//     .map((n) => n[0])
//     .join('')
//     .substring(0, 2)
//     .toUpperCase();
// };

// // Assigns a consistent color based on the first letter of the name
// const getColorClass = (name: string) => {
//   const colors = [
//     'bg-emerald-500',
//     'bg-blue-500',
//     'bg-purple-500',
//     'bg-orange-500',
//     'bg-indigo-500',
//   ];
//   const charCode = name.charCodeAt(0) || 0;
//   return colors[charCode % colors.length];
// };

// // Formats the ISO date from the backend to a readable string (e.g., "Feb 20, 2026")
// const formatDate = (isoString: string) => {
//   if (!isoString) return 'N/A';
//   const date = new Date(isoString);
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// };

// // ==========================================
// // MAIN COMPONENT
// // ==========================================
// export default function SchedulesPage() {
//   // Filter & Search State
//   const [searchQuery, setSearchQuery] = useState('');
//   const [typeFilter, setTypeFilter] = useState('All Types');
//   const [resultFilter, setResultFilter] = useState('All Results');
//   const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

//   // Dynamic Data State
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedJobId, setSelectedJobId] = useState<string>('');
//   const [isJobsLoading, setIsJobsLoading] = useState(true);

//   const [invitedCandidates, setInvitedCandidates] = useState<Candidate[]>([]);
//   const [isCandidatesLoading, setIsCandidatesLoading] = useState(false);

//   // ==========================================
//   // 1. FETCH JOBS ON MOUNT
//   // ==========================================
//   useEffect(() => {
//     const fetchJobs = async () => {
//       setIsJobsLoading(true);
//       try {
//         // Replace with your actual backend endpoint for fetching jobs
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/jobs?limit=50`,
//           {
//             withCredentials: true,
//           }
//         );
//         const result = response.data.data.jobs;

//         if (result) {
//           // Map MongoDB _id if necessary
//           const mappedJobs: Job[] = result.map((job: any) => ({
//             id: job._id || job.id,
//             title: job.title,
//           }));

//           setJobs(mappedJobs);

//           // Automatically select the first job to trigger candidate fetching
//           if (mappedJobs.length > 0) {
//             setSelectedJobId(mappedJobs[0].id);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       } finally {
//         setIsJobsLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // ==========================================
//   // 2. FETCH CANDIDATES WHEN JOB CHANGES
//   // ==========================================
//   useEffect(() => {
//     // Prevent fetching if no job is selected yet
//     if (!selectedJobId) return;

//     const fetchPendingInvites = async () => {
//       setIsCandidatesLoading(true);
//       try {
//         const jobId = selectedJobId;

//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/interviews/pending/${jobId}`,
//           { withCredentials: true }
//         );
//         const result = response.data;

//         console.log('data', result);
//         if (result.success) {
//           const mappedData: Candidate[] = result.data.map((item: any) => ({
//             id: item.id,
//             name: item.candidateName,
//             email: item.candidateEmail,
//             role: item.role,
//             company: item.company,
//             type: item.type,
//             status: 'Pending',
//             dateSent: formatDate(item.invitedAt),
//             initials: getInitials(item.candidateName),
//             colorClass: getColorClass(item.candidateName),
//           }));
//           setInvitedCandidates(mappedData);
//         }
//       } catch (error) {
//         console.error('Error fetching candidates:', error);
//       } finally {
//         setIsCandidatesLoading(false);
//       }
//     };

//     fetchPendingInvites();
//   }, [selectedJobId]);

//   // ==========================================
//   // FILTERING LOGIC
//   // ==========================================
//   const filteredInvited = useMemo(() => {
//     return invitedCandidates.filter((c) => {
//       const matchesSearch =
//         c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         c.email.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesType =
//         typeFilter === 'All Types' ||
//         c.type.toLowerCase().includes(typeFilter.toLowerCase());
//       return matchesSearch && matchesType;
//     });
//   }, [invitedCandidates, searchQuery, typeFilter]);

//   const filteredResults = useMemo(() => {
//     return DUMMY_RESULTS.filter((r) => {
//       const matchesSearch =
//         r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         r.email.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesSearch;
//     });
//   }, [searchQuery]);

//   // =========================================================
//   // VIEW ROUTING
//   // =========================================================
//   if (selectedResultId) {
//     return <InterviewAnalysisPage onBack={() => setSelectedResultId(null)} />;
//   }

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
//         <div className="flex flex-col lg:flex-row gap-3">
//           <div className="flex flex-col sm:flex-row gap-3 flex-1">
//             {/* Dynamic Job Dropdown */}
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">
//                   work
//                 </span>
//               </div>
//               <select
//                 value={selectedJobId}
//                 onChange={(e) => setSelectedJobId(e.target.value)}
//                 disabled={isJobsLoading || jobs.length === 0}
//                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {isJobsLoading ? (
//                   <option value="">Loading jobs...</option>
//                 ) : jobs.length === 0 ? (
//                   <option value="">No jobs found</option>
//                 ) : (
//                   jobs.map((job) => (
//                     <option key={job.id} value={job.id}>
//                       {job.title}
//                     </option>
//                   ))
//                 )}
//               </select>
//               <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">
//                   expand_more
//                 </span>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">
//                   search
//                 </span>
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
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="relative w-full sm:w-1/2 lg:w-44">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">
//                   filter_alt
//                 </span>
//               </div>
//               <select
//                 value={typeFilter}
//                 onChange={(e) => setTypeFilter(e.target.value)}
//                 className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
//               >
//                 <option>All Types</option>
//                 <option>Screening</option>
//                 <option>Technical</option>
//                 <option>AI SCREENING</option>
//               </select>
//             </div>
//             <div className="relative w-full sm:w-1/2 lg:w-44">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <span className="material-symbols-outlined text-slate-400 text-lg">
//                   bar_chart
//                 </span>
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
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
//               <span className="material-symbols-outlined">mail</span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-slate-500">Invited</p>
//               <h3 className="text-2xl font-bold text-slate-900">
//                 {invitedCandidates.length}
//               </h3>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
//               <span className="material-symbols-outlined">check_circle</span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-slate-500">Completed</p>
//               <h3 className="text-2xl font-bold text-slate-900">
//                 {DUMMY_RESULTS.length}
//               </h3>
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
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px] md:h-[700px]">
//             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
//               <div className="flex items-center gap-2">
//                 <span className="material-symbols-outlined text-blue-500 text-[20px]">
//                   mail
//                 </span>
//                 <h2 className="font-bold text-slate-800">Invited Candidates</h2>
//               </div>
//               <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
//                 {filteredInvited.length}
//               </span>
//             </div>

//             <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full relative">
//               {isCandidatesLoading ? (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/80 z-10">
//                   <span className="material-symbols-outlined animate-spin text-3xl text-indigo-500 mb-2">
//                     progress_activity
//                   </span>
//                   <p className="text-sm font-medium">Fetching candidates...</p>
//                 </div>
//               ) : !selectedJobId ? (
//                 <div className="text-center py-10 text-slate-400">
//                   Please select a job to view candidates.
//                 </div>
//               ) : filteredInvited.length === 0 ? (
//                 <div className="text-center py-10 text-slate-400">
//                   No candidates found for this job.
//                 </div>
//               ) : (
//                 filteredInvited.map((candidate) => (
//                   <div
//                     key={candidate.id}
//                     className="border border-slate-100 rounded-xl p-3 sm:p-4 hover:border-slate-300 transition-colors bg-white shadow-sm hover:shadow flex flex-col sm:flex-row justify-between items-start gap-3"
//                   >
//                     <div className="flex items-start gap-3 min-w-0 w-full sm:w-auto">
//                       <div
//                         className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${candidate.colorClass}`}
//                       >
//                         {candidate.initials}
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <div className="flex justify-between items-start sm:block">
//                           <h3 className="font-bold text-slate-900 text-sm truncate pr-2 sm:pr-0">
//                             {candidate.name}
//                           </h3>

//                           <div className="sm:hidden shrink-0">
//                             <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
//                               <span className="material-symbols-outlined text-[12px]">
//                                 schedule
//                               </span>
//                               {candidate.status}
//                             </span>
//                           </div>
//                         </div>

//                         <p className="text-xs text-slate-500 truncate">
//                           {candidate.email}
//                         </p>
//                         <p className="text-xs text-slate-400 mt-0.5 truncate">
//                           {candidate.role} <span className="mx-1">@</span>{' '}
//                           {candidate.company}
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

//                     <div className="hidden sm:block shrink-0">
//                       <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full">
//                         <span className="material-symbols-outlined text-[14px]">
//                           schedule
//                         </span>
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
//             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
//               <div className="flex items-center gap-2">
//                 <span className="material-symbols-outlined text-emerald-500 text-[20px]">
//                   check_circle
//                 </span>
//                 <h2 className="font-bold text-slate-800">Interview Results</h2>
//               </div>
//               <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
//                 {filteredResults.length}
//               </span>
//             </div>

//             <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
//               {filteredResults.length === 0 ? (
//                 <div className="text-center py-10 text-slate-400">
//                   No results found yet.
//                 </div>
//               ) : (
//                 filteredResults.map((result) => (
//                   <div
//                     key={result.id}
//                     className="border border-slate-100 rounded-xl p-3 sm:p-4 hover:border-slate-300 transition-colors bg-white shadow-sm hover:shadow relative group"
//                   >
//                     <button
//                       onClick={() => setSelectedResultId(result.id)}
//                       className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-300 hover:text-indigo-600 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 cursor-pointer z-10"
//                       title="View Full Analysis"
//                     >
//                       <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
//                         open_in_new
//                       </span>
//                     </button>

//                     <div className="flex flex-col sm:flex-row items-start gap-3">
//                       <div
//                         className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${result.colorClass}`}
//                       >
//                         {result.initials}
//                       </div>

//                       <div className="flex-1 min-w-0 w-full pr-0 sm:pr-6">
//                         <h3 className="font-bold text-slate-900 text-sm truncate pr-6 sm:pr-0">
//                           {result.name}
//                         </h3>
//                         <p className="text-xs text-slate-500 truncate mb-4">
//                           {result.email}
//                         </p>

//                         <div>
//                           <div className="flex justify-between items-end mb-1.5">
//                             <span className="font-bold text-blue-600 text-lg leading-none">
//                               {result.score}%
//                             </span>
//                             <span className="text-xs text-slate-400 font-medium">
//                               {result.scoreText}
//                             </span>
//                           </div>
//                           <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
//                             <div
//                               className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
//                               style={{ width: `${result.score}%` }}
//                             ></div>
//                           </div>
//                         </div>

//                         <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
//                           <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
//                             {result.recommendation}
//                           </span>
//                           <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
//                             <span className="material-symbols-outlined text-[14px]">
//                               schedule
//                             </span>
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


import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import InterviewAnalysisPage from './InterviewAnalysisPage';

// ==========================================
// TYPES
// ==========================================
interface Job {
  id: string;
  title: string;
}

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

export interface InterviewResult extends Candidate {
  score: number;
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  strengths: string[];
  weaknesses: string[];
  detailedFeedback: string;
  recommendation: string;
  transcript: { role: string; text: string }[];
  dateCompleted: string;
}

// ==========================================
// CONSTANTS & HELPERS
// ==========================================
const getInitials = (name: string) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const getColorClass = (name: string) => {
  const colors = [
    'bg-emerald-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-indigo-500',
  ];
  const charCode = name.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

const formatDate = (isoString: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function SchedulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [resultFilter, setResultFilter] = useState('All Results');
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [isJobsLoading, setIsJobsLoading] = useState(true);

  const [invitedCandidates, setInvitedCandidates] = useState<Candidate[]>([]);
  const [completedResults, setCompletedResults] = useState<InterviewResult[]>([]);
  const [isCandidatesLoading, setIsCandidatesLoading] = useState(false);

  // 1. FETCH JOBS ON MOUNT
  useEffect(() => {
    const fetchJobs = async () => {
      setIsJobsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/jobs?limit=50`,
          { withCredentials: true }
        );
        const result = response.data.data.jobs;

        if (result) {
          const mappedJobs: Job[] = result.map((job: any) => ({
            id: job._id || job.id,
            title: job.title,
          }));
          setJobs(mappedJobs);
          if (mappedJobs.length > 0) setSelectedJobId(mappedJobs[0].id);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsJobsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 2. FETCH PENDING AND COMPLETED CANDIDATES WHEN JOB CHANGES
  useEffect(() => {
    if (!selectedJobId) return;

    const fetchData = async () => {
      setIsCandidatesLoading(true);
      try {
        // Fetch Pending Invites
        const pendingRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/interviews/pending/${selectedJobId}`,
          { withCredentials: true }
        );
        
        if (pendingRes.data.success) {
          const mappedPending: Candidate[] = pendingRes.data.data.map((item: any) => ({
            id: item.id || item._id,
            name: item.candidateName || 'Unknown',
            email: item.candidateEmail || '',
            role: item.role || 'Candidate',
            company: item.company || 'Company',
            type: item.type || 'Screening',
            status: 'Pending',
            dateSent: formatDate(item.invitedAt),
            initials: getInitials(item.candidateName),
            colorClass: getColorClass(item.candidateName),
          }));
          setInvitedCandidates(mappedPending);
        }

        // Fetch Completed Interviews
        // Make sure this endpoint exists in your Node.js backend!
        const completedRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/interviews/completed/${selectedJobId}`,
          { withCredentials: true }
        );

        if (completedRes.data.success) {
          const mappedCompleted: InterviewResult[] = completedRes.data.data.map((item: any) => ({
            id: item.id || item._id,
            name: item.candidateName || 'Unknown',
            email: item.candidateEmail || '',
            role: item.role || 'Candidate',
            company: item.company || 'Company',
            type: 'AI SCREENING',
            status: 'Completed',
            dateSent: formatDate(item.invitedAt),
            dateCompleted: formatDate(item.updatedAt),
            initials: getInitials(item.candidateName),
            colorClass: getColorClass(item.candidateName),
            score: typeof item.overallScore === 'number' ? (item.overallScore > 10 ? item.overallScore / 10 : item.overallScore) : 0,
            communicationScore: typeof item.communicationScore === 'number' ? (item.communicationScore > 10 ? item.communicationScore / 10 : item.communicationScore) : 0,
            technicalScore: typeof item.technicalScore === 'number' ? (item.technicalScore > 10 ? item.technicalScore / 10 : item.technicalScore) : 0,
            confidenceScore: typeof item.confidenceScore === 'number' ? (item.confidenceScore > 10 ? item.confidenceScore / 10 : item.confidenceScore) : 0,
            strengths: item.strengths || [],
            weaknesses: item.weaknesses || [],
            detailedFeedback: item.detailedFeedback || 'No feedback provided.',
            recommendation: item.hireRecommendation || 'Pending',
            transcript: item.transcript || []
          }));
          setCompletedResults(mappedCompleted);
        }

      } catch (error) {
        console.error('Error fetching interview data:', error);
      } finally {
        setIsCandidatesLoading(false);
      }
    };

    fetchData();
  }, [selectedJobId]);

  // FILTERING LOGIC
  const filteredInvited = useMemo(() => {
    return invitedCandidates.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'All Types' || c.type.toLowerCase().includes(typeFilter.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [invitedCandidates, searchQuery, typeFilter]);

  const filteredResults = useMemo(() => {
    return completedResults.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [completedResults, searchQuery]);

  // VIEW ROUTING
  if (selectedResultId) {
    const selectedData = completedResults.find(r => r.id === selectedResultId);
    if (selectedData) {
      return <InterviewAnalysisPage onBack={() => setSelectedResultId(null)} data={selectedData} />;
    }
  }

  // Calculate Average Score
  const avgScore = completedResults.length > 0 
    ? (completedResults.reduce((acc, curr) => acc + curr.score, 0) / completedResults.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-class page-reveal">
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
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-lg">work</span>
              </div>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                disabled={isJobsLoading || jobs.length === 0}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isJobsLoading ? (
                  <option value="">Loading jobs...</option>
                ) : jobs.length === 0 ? (
                  <option value="">No jobs found</option>
                ) : (
                  jobs.map((job) => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))
                )}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-lg">expand_more</span>
              </div>
            </div>

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
        </div>

        {/* --- METRICS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Invited</p>
              <h3 className="text-2xl font-bold text-slate-900">{invitedCandidates.length}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Completed</p>
              <h3 className="text-2xl font-bold text-slate-900">{completedResults.length}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Score</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {avgScore}/10
              </h3>
            </div>
          </div>
        </div>

        {/* --- MAIN GRID (2 COLUMNS) --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          {/* LEFT COLUMN: INVITED CANDIDATES */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px] md:h-[700px]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500 text-[20px]">mail</span>
                <h2 className="font-bold text-slate-800">Invited Candidates</h2>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                {filteredInvited.length}
              </span>
            </div>

            <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full relative">
              {isCandidatesLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/80 z-10">
                  <span className="material-symbols-outlined animate-spin text-3xl text-indigo-500 mb-2">progress_activity</span>
                  <p className="text-sm font-medium">Fetching candidates...</p>
                </div>
              ) : !selectedJobId ? (
                <div className="text-center py-10 text-slate-400">Please select a job to view candidates.</div>
              ) : filteredInvited.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No candidates found for this job.</div>
              ) : (
                filteredInvited.map((candidate) => (
                  <div key={candidate.id} className="border border-slate-100 rounded-xl p-3 sm:p-4 hover:border-slate-300 transition-colors bg-white shadow-sm hover:shadow flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="flex items-start gap-3 min-w-0 w-full sm:w-auto">
                      <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${candidate.colorClass}`}>
                        {candidate.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-start sm:block">
                          <h3 className="font-bold text-slate-900 text-sm truncate pr-2 sm:pr-0">{candidate.name}</h3>
                          <div className="sm:hidden shrink-0">
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                              <span className="material-symbols-outlined text-[12px]">schedule</span>
                              {candidate.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{candidate.email}</p>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{candidate.role} <span className="mx-1">@</span> {candidate.company}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="inline-block border border-blue-200 text-blue-600 bg-blue-50 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            {candidate.type}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">Sent {candidate.dateSent}</span>
                        </div>
                      </div>
                    </div>
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
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
                <h2 className="font-bold text-slate-800">Interview Results</h2>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                {filteredResults.length}
              </span>
            </div>

            <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full relative">
              {isCandidatesLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/80 z-10">
                  <span className="material-symbols-outlined animate-spin text-3xl text-emerald-500 mb-2">progress_activity</span>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No results found yet.</div>
              ) : (
                filteredResults.map((result) => (
                  <div key={result.id} className="border border-slate-100 rounded-xl p-3 sm:p-4 hover:border-slate-300 transition-colors bg-white shadow-sm hover:shadow relative group">
                    <button
                      onClick={() => setSelectedResultId(result.id)}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-300 hover:text-indigo-600 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                      title="View Full Analysis"
                    >
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">open_in_new</span>
                    </button>

                    <div className="flex flex-col sm:flex-row items-start gap-3">
                      <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${result.colorClass}`}>
                        {result.initials}
                      </div>

                      <div className="flex-1 min-w-0 w-full pr-0 sm:pr-6">
                        <h3 className="font-bold text-slate-900 text-sm truncate pr-6 sm:pr-0">{result.name}</h3>
                        <p className="text-xs text-slate-500 truncate mb-4">{result.email}</p>

                        <div>
                          <div className="flex justify-between items-end mb-1.5">
                            <span className="font-bold text-blue-600 text-lg leading-none">{result.score}/10</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
                            <div
                              className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${(result.score / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
                          <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                            {result.recommendation || 'Pending'}
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