// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Job {
//   id: string;
//   title: string;
//   description: string;
// }

// export default function GenerateQuestionsPage() {
//   // Data State
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [isJobsLoading, setIsJobsLoading] = useState(true);
  
//   // Form State
//   const [selectedJobId, setSelectedJobId] = useState('');
//   const [jobTitle, setJobTitle] = useState('');
//   const [jobDescription, setJobDescription] = useState('');
//   const [duration, setDuration] = useState('30');
  
//   // UI State
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);

//   // ==========================================
//   // 1. FETCH JOBS ON MOUNT
//   // ==========================================
//   useEffect(() => {
//     const fetchJobs = async () => {
//       setIsJobsLoading(true);
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/jobs?limit=50`,
//           { withCredentials: true }
//         );
        
//         const result = response.data.data.jobs;

//         if (result) {
//           const mappedJobs: Job[] = result.map((job: any) => ({
//             id: job._id || job.id,
//             title: job.title,
//             description: job.description || 'No description provided.', 
//           }));

//           setJobs(mappedJobs);

//           // Auto-select the first job and pre-fill the form
//           if (mappedJobs.length > 0) {
//             handleJobSelection(mappedJobs[0].id, mappedJobs);
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
//   // 2. HANDLE JOB SELECTION
//   // ==========================================
//   const handleJobSelection = (jobId: string, jobList: Job[] = jobs) => {
//     setSelectedJobId(jobId);
    
//     // Find the selected job and auto-fill the title and description
//     const selectedJob = jobList.find((j) => j.id === jobId);
//     if (selectedJob) {
//       setJobTitle(selectedJob.title);
//       setJobDescription(selectedJob.description);
//     } else {
//       setJobTitle('');
//       setJobDescription('');
//     }
//   };

//   // ==========================================
//   // 3. GENERATE QUESTIONS (INTEGRATED WITH AI BACKEND)
//   // ==========================================
//   const handleGenerate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedJobId || !jobDescription) return;

//     setIsGenerating(true);
//     setGeneratedQuestions([]);

//     try {
//       // 1. Prepare the payload matching your Python Pydantic Schema
//       const payload = {
//         job_id: selectedJobId,
//         duration: Number(duration), // Ensure this is sent as an integer
//         custom_context: jobDescription,
//         // TODO: Replace this hardcoded ID with the actual logged-in user's MongoDB ID
//         created_by: "64b9f9876543210fedcba987" 
//       };

//       // 2. Make the request to your FastAPI server
//       // Note: Make sure VITE_AI_API_BASE_URL points to http://127.0.0.1:8000 or similar
//       const response = await axios.post(
//         `${import.meta.env.VITE_AI_API_BASE_URL || 'http://localhost:7000'}/api/interview/setup`,
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true
//         }
//       );

//       // 3. Extract the generated questions from the Beanie document response
//       const questionsList = response.data.data.questions;
      
//       // 4. Update the UI
//       setGeneratedQuestions(questionsList);

//     } catch (error) {
//       console.error('Failed to generate questions:', error);
//       // Optional: Add a toast notification here to inform the user
//       alert("Failed to generate questions. Please ensure the AI backend is running.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-class">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* --- PAGE TITLE --- */}
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
//             Design the Interview
//           </h1>
//           <p className="text-slate-500 mt-1 text-sm sm:text-base">
//             Select a job, and our AI will generate targeted
//             technical and behavioral questions based on the requirements.
//           </p>
//         </div>

//         {/* --- MAIN CONTENT GRID --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
//           {/* LEFT COLUMN: Input Form */}
//           <div className="lg:col-span-5 flex flex-col gap-6">
//             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
//               <form onSubmit={handleGenerate} className="space-y-5">
                
//                 {/* Linked Job Selection */}
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-1.5">
//                     Select Job Role <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <span className="material-symbols-outlined text-slate-400 text-lg">
//                         work
//                       </span>
//                     </div>
//                     <select
//                       required
//                       value={selectedJobId}
//                       onChange={(e) => handleJobSelection(e.target.value)}
//                       disabled={isJobsLoading || jobs.length === 0}
//                       className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer disabled:opacity-60 disabled:bg-slate-50"
//                     >
//                       {isJobsLoading ? (
//                         <option value="">Loading your jobs...</option>
//                       ) : jobs.length === 0 ? (
//                         <option value="">No jobs found. Create one first.</option>
//                       ) : (
//                         <>
//                           <option value="" disabled>Select a role to base the interview on</option>
//                           {jobs.map((job) => (
//                             <option key={job.id} value={job.id}>
//                               {job.title}
//                             </option>
//                           ))}
//                         </>
//                       )}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <span className="material-symbols-outlined text-slate-400 text-lg">
//                         expand_more
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Duration */}
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-1.5">
//                     Interview Duration
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <span className="material-symbols-outlined text-slate-400 text-lg">
//                         schedule
//                       </span>
//                     </div>
//                     <select
//                       value={duration}
//                       onChange={(e) => setDuration(e.target.value)}
//                       className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
//                     >
//                       <option value="15">15 Minutes (Brief Screen)</option>
//                       <option value="30">30 Minutes (Standard)</option>
//                       <option value="45">45 Minutes (In-depth)</option>
//                       <option value="60">60 Minutes (Deep Dive)</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <span className="material-symbols-outlined text-slate-400 text-lg">
//                         expand_more
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Auto-filled Job Description */}
//                 <div>
//                   <div className="flex justify-between items-end mb-1.5">
//                     <label className="block text-sm font-bold text-slate-700">
//                       Context / Job Description <span className="text-red-500">*</span>
//                     </label>
//                     <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
//                       {jobDescription.length} chars
//                     </span>
//                   </div>
//                   <textarea
//                     required
//                     rows={6}
//                     placeholder="Select a job above to auto-fill this area, or paste custom context..."
//                     value={jobDescription}
//                     onChange={(e) => setJobDescription(e.target.value)}
//                     disabled={isJobsLoading}
//                     className="w-full bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm resize-y transition-all disabled:bg-slate-50 disabled:opacity-70"
//                   />
//                   <p className="text-[11px] text-slate-500 mt-1">
//                     Auto-filled from the job posting. You can edit this to give the AI specific focus areas for this interview without modifying the original posting.
//                   </p>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isGenerating || !selectedJobId || !jobDescription}
//                   className={`w-full mt-2 flex items-center justify-center gap-2 font-bold rounded-lg px-4 py-3 transition-all duration-200 shadow-sm
//                     ${
//                       isGenerating || !selectedJobId || !jobDescription
//                         ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
//                         : 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:-translate-y-0.5 shadow-indigo-600/25'
//                     }`}
//                 >
//                   {isGenerating ? (
//                     <>
//                       <span className="material-symbols-outlined animate-spin text-[20px]">
//                         progress_activity
//                       </span>
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <span className="material-symbols-outlined text-[20px]">
//                         magic_button
//                       </span>
//                       Generate Questions
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Output Area */}
//           <div className="lg:col-span-7">
//             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-150 lg:h-175">
              
//               {/* Output Header */}
//               <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
//                 <div className="flex items-center gap-2">
//                   <span className="material-symbols-outlined text-indigo-500 text-[20px]">
//                     format_list_bulleted
//                   </span>
//                   <h2 className="font-bold text-slate-800">Generated Output</h2>
//                 </div>
//                 {generatedQuestions.length > 0 && (
//                   <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full">
//                     {generatedQuestions.length} Ready
//                   </span>
//                 )}
//               </div>

//               {/* SCROLLABLE BODY AREA */}
//               <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full relative">
                
//                 {/* 1. EMPTY STATE */}
//                 {!isGenerating && generatedQuestions.length === 0 && (
//                   <div className="h-full flex flex-col items-center justify-center text-center">
//                     <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-200">
//                       <span className="material-symbols-outlined text-slate-400 text-3xl">
//                         assignment_add
//                       </span>
//                     </div>
//                     <p className="text-slate-700 font-bold text-lg">
//                       Awaiting Instructions
//                     </p>
//                     <p className="text-slate-500 text-sm max-w-sm mt-2">
//                       Select a job from the left and hit generate to create a
//                       custom AI interview script based on the JD.
//                     </p>
//                   </div>
//                 )}

//                 {/* 2. LOADING STATE */}
//                 {isGenerating && (
//                   <div className="space-y-4 pt-2">
//                     {[1, 2, 3, 4].map((i) => (
//                       <div
//                         key={i}
//                         className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm animate-pulse flex gap-4"
//                       >
//                         <div className="w-8 h-8 bg-slate-200 rounded-full shrink-0"></div>
//                         <div className="w-full space-y-3 mt-1.5">
//                           <div className="h-2.5 bg-slate-200 rounded w-3/4"></div>
//                           <div className="h-2.5 bg-slate-200 rounded w-full"></div>
//                           <div className="h-2.5 bg-slate-200 rounded w-5/6"></div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* 3. SUCCESS / RESULTS LIST */}
//                 {!isGenerating && generatedQuestions.length > 0 && (
//                   <div className="space-y-3">
//                     {generatedQuestions.map((q, index) => (
//                       <div
//                         key={index}
//                         className="group p-4 sm:p-5 bg-white border border-slate-100 hover:border-slate-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow flex gap-4 items-start relative"
//                       >
//                         <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-100">
//                           {index + 1}
//                         </div>
//                         <div className="flex-1 min-w-0 pr-8">
//                           <p className="text-slate-700 text-sm leading-relaxed font-medium">
//                             {q}
//                           </p>

//                           {/* Action Row - Appears on hover */}
//                           <div className="mt-3 flex gap-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
//                             <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer">
//                               <span className="material-symbols-outlined text-[16px]">
//                                 content_copy
//                               </span>
//                               Copy
//                             </button>
//                             <button className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer">
//                               <span className="material-symbols-outlined text-[16px]">
//                                 delete
//                               </span>
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* FIXED FOOTER AREA */}
//               {!isGenerating && generatedQuestions.length > 0 && (
//                 <div className="p-4 bg-white border-t border-slate-100 shrink-0">
//                   <div className="flex justify-end">
//                     <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2">
//                       <span className="material-symbols-outlined text-[18px]">
//                         save
//                       </span>
//                       Save Interview Setup
//                     </button>
//                   </div>
//                 </div>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Job {
//   id: string;
//   title: string;
//   description: string;
// }

// export default function GenerateQuestionsPage() {
//   // Data State
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [isJobsLoading, setIsJobsLoading] = useState(true);
  
//   // Form State
//   const [selectedJobId, setSelectedJobId] = useState('');
//   const [jobTitle, setJobTitle] = useState('');
//   const [jobDescription, setJobDescription] = useState('');
//   const [duration, setDuration] = useState('30');
  
//   // UI State
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  
//   // Edit State
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [editValue, setEditValue] = useState<string>('');

//   // ==========================================
//   // 1. FETCH JOBS ON MOUNT
//   // ==========================================
//   useEffect(() => {
//     const fetchJobs = async () => {
//       setIsJobsLoading(true);
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/jobs?limit=50`,
//           { withCredentials: true }
//         );
        
//         const result = response.data.data.jobs;

//         if (result) {
//           const mappedJobs: Job[] = result.map((job: any) => ({
//             id: job._id || job.id,
//             title: job.title,
//             description: job.description || 'No description provided.', 
//           }));

//           setJobs(mappedJobs);

//           if (mappedJobs.length > 0) {
//             handleJobSelection(mappedJobs[0].id, mappedJobs);
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
//   // 2. HANDLE JOB SELECTION
//   // ==========================================
//   const handleJobSelection = (jobId: string, jobList: Job[] = jobs) => {
//     setSelectedJobId(jobId);
    
//     const selectedJob = jobList.find((j) => j.id === jobId);
//     if (selectedJob) {
//       setJobTitle(selectedJob.title);
//       setJobDescription(selectedJob.description);
//     } else {
//       setJobTitle('');
//       setJobDescription('');
//     }
//   };

//   // ==========================================
//   // 3. EDIT & REMOVE HANDLERS
//   // ==========================================
//   const startEdit = (index: number, currentText: string) => {
//     setEditingIndex(index);
//     setEditValue(currentText);
//   };

//   const cancelEdit = () => {
//     setEditingIndex(null);
//     setEditValue('');
//   };

//   const saveEdit = (index: number) => {
//     if (!editValue.trim()) return; // Don't save empty questions
//     const updatedQuestions = [...generatedQuestions];
//     updatedQuestions[index] = editValue;
//     setGeneratedQuestions(updatedQuestions);
//     setEditingIndex(null);
//     setEditValue('');
//   };

//   const removeQuestion = (indexToRemove: number) => {
//     setGeneratedQuestions(prev => prev.filter((_, index) => index !== indexToRemove));
//   };

//   // ==========================================
//   // 4. GENERATE QUESTIONS 
//   // ==========================================
//   const handleGenerate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedJobId || !jobDescription) return;

//     setIsGenerating(true);
//     setGeneratedQuestions([]);
//     setEditingIndex(null); // Reset edit state if regenerating

//     try {
//       const payload = {
//         job_id: selectedJobId,
//         duration: Number(duration),
//         custom_context: jobDescription,
//       };

//       const response = await axios.post(
//         `${import.meta.env.VITE_AI_API_BASE_URL || 'http://localhost:7000'}/api/interview/setup`,
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true
//         }
//       );

//       const questionsList = response.data.data.questions;
//       setGeneratedQuestions(questionsList);

//     } catch (error) {
//       console.error('Failed to generate questions:', error);
//       alert("Failed to generate questions. Please ensure the AI backend is running.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-class">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* --- PAGE TITLE --- */}
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
//             Design the Interview
//           </h1>
//           <p className="text-slate-500 mt-1 text-sm sm:text-base">
//             Select a job, and our AI will generate targeted
//             technical and behavioral questions based on the requirements.
//           </p>
//         </div>

//         {/* --- MAIN CONTENT GRID --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
//           {/* LEFT COLUMN: Input Form */}
//           <div className="lg:col-span-5 flex flex-col gap-6">
//             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
//               <form onSubmit={handleGenerate} className="space-y-5">
                
//                 {/* Linked Job Selection */}
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-1.5">
//                     Select Job Role <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <span className="material-symbols-outlined text-slate-400 text-lg">
//                         work
//                       </span>
//                     </div>
//                     <select
//                       required
//                       value={selectedJobId}
//                       onChange={(e) => handleJobSelection(e.target.value)}
//                       disabled={isJobsLoading || jobs.length === 0}
//                       className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer disabled:opacity-60 disabled:bg-slate-50"
//                     >
//                       {isJobsLoading ? (
//                         <option value="">Loading your jobs...</option>
//                       ) : jobs.length === 0 ? (
//                         <option value="">No jobs found. Create one first.</option>
//                       ) : (
//                         <>
//                           <option value="" disabled>Select a role to base the interview on</option>
//                           {jobs.map((job) => (
//                             <option key={job.id} value={job.id}>
//                               {job.title}
//                             </option>
//                           ))}
//                         </>
//                       )}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <span className="material-symbols-outlined text-slate-400 text-lg">
//                         expand_more
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Duration */}
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-1.5">
//                     Interview Duration
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <span className="material-symbols-outlined text-slate-400 text-lg">
//                         schedule
//                       </span>
//                     </div>
//                     <select
//                       value={duration}
//                       onChange={(e) => setDuration(e.target.value)}
//                       className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
//                     >
//                       <option value="15">15 Minutes (Brief Screen)</option>
//                       <option value="30">30 Minutes (Standard)</option>
//                       <option value="45">45 Minutes (In-depth)</option>
//                       <option value="60">60 Minutes (Deep Dive)</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <span className="material-symbols-outlined text-slate-400 text-lg">
//                         expand_more
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Auto-filled Job Description */}
//                 <div>
//                   <div className="flex justify-between items-end mb-1.5">
//                     <label className="block text-sm font-bold text-slate-700">
//                       Context / Job Description <span className="text-red-500">*</span>
//                     </label>
//                     <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
//                       {jobDescription.length} chars
//                     </span>
//                   </div>
//                   <textarea
//                     required
//                     rows={6}
//                     placeholder="Select a job above to auto-fill this area, or paste custom context..."
//                     value={jobDescription}
//                     onChange={(e) => setJobDescription(e.target.value)}
//                     disabled={isJobsLoading}
//                     className="w-full bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm resize-y transition-all disabled:bg-slate-50 disabled:opacity-70"
//                   />
//                   <p className="text-[11px] text-slate-500 mt-1">
//                     Auto-filled from the job posting. You can edit this to give the AI specific focus areas for this interview without modifying the original posting.
//                   </p>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isGenerating || !selectedJobId || !jobDescription}
//                   className={`w-full mt-2 flex items-center justify-center gap-2 font-bold rounded-lg px-4 py-3 transition-all duration-200 shadow-sm
//                     ${
//                       isGenerating || !selectedJobId || !jobDescription
//                         ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
//                         : 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:-translate-y-0.5 shadow-indigo-600/25'
//                     }`}
//                 >
//                   {isGenerating ? (
//                     <>
//                       <span className="material-symbols-outlined animate-spin text-[20px]">
//                         progress_activity
//                       </span>
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <span className="material-symbols-outlined text-[20px]">
//                         magic_button
//                       </span>
//                       Generate Questions
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Output Area */}
//           <div className="lg:col-span-7">
//             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-150 lg:h-175">
              
//               {/* Output Header */}
//               <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
//                 <div className="flex items-center gap-2">
//                   <span className="material-symbols-outlined text-indigo-500 text-[20px]">
//                     format_list_bulleted
//                   </span>
//                   <h2 className="font-bold text-slate-800">Generated Output</h2>
//                 </div>
//                 {generatedQuestions.length > 0 && (
//                   <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full">
//                     {generatedQuestions.length} Ready
//                   </span>
//                 )}
//               </div>

//               {/* SCROLLABLE BODY AREA */}
//               <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full relative">
                
//                 {/* 1. EMPTY STATE */}
//                 {!isGenerating && generatedQuestions.length === 0 && (
//                   <div className="h-full flex flex-col items-center justify-center text-center">
//                     <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-200">
//                       <span className="material-symbols-outlined text-slate-400 text-3xl">
//                         assignment_add
//                       </span>
//                     </div>
//                     <p className="text-slate-700 font-bold text-lg">
//                       Awaiting Instructions
//                     </p>
//                     <p className="text-slate-500 text-sm max-w-sm mt-2">
//                       Select a job from the left and hit generate to create a
//                       custom AI interview script based on the JD.
//                     </p>
//                   </div>
//                 )}

//                 {/* 2. LOADING STATE */}
//                 {isGenerating && (
//                   <div className="space-y-4 pt-2">
//                     {[1, 2, 3, 4].map((i) => (
//                       <div
//                         key={i}
//                         className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm animate-pulse flex gap-4"
//                       >
//                         <div className="w-8 h-8 bg-slate-200 rounded-full shrink-0"></div>
//                         <div className="w-full space-y-3 mt-1.5">
//                           <div className="h-2.5 bg-slate-200 rounded w-3/4"></div>
//                           <div className="h-2.5 bg-slate-200 rounded w-full"></div>
//                           <div className="h-2.5 bg-slate-200 rounded w-5/6"></div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* 3. SUCCESS / RESULTS LIST */}
//                 {!isGenerating && generatedQuestions.length > 0 && (
//                   <div className="space-y-3">
//                     {generatedQuestions.map((q, index) => (
//                       <div
//                         key={index}
//                         className="group p-4 sm:p-5 bg-white border border-slate-100 hover:border-slate-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow flex gap-4 items-start relative"
//                       >
//                         <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-100 mt-0.5">
//                           {index + 1}
//                         </div>
                        
//                         {editingIndex === index ? (
//                           // === EDIT MODE ===
//                           <div className="flex-1 min-w-0 pr-2">
//                             <textarea
//                               value={editValue}
//                               onChange={(e) => setEditValue(e.target.value)}
//                               className="w-full p-2.5 text-sm text-slate-700 bg-slate-50 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y transition-all"
//                               rows={3}
//                               autoFocus
//                             />
//                             <div className="mt-2.5 flex gap-2">
//                               <button 
//                                 onClick={() => saveEdit(index)}
//                                 className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
//                               >
//                                 Save Changes
//                               </button>
//                               <button 
//                                 onClick={cancelEdit}
//                                 className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold rounded shadow-sm transition-colors"
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           // === READ MODE ===
//                           <div className="flex-1 min-w-0 pr-8">
//                             <p className="text-slate-700 text-sm leading-relaxed font-medium mt-1">
//                               {q}
//                             </p>

//                             {/* Action Row - Appears on hover */}
//                             <div className="mt-3 flex gap-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
//                               <button 
//                                 onClick={() => startEdit(index, q)}
//                                 className="text-xs font-bold text-slate-400 hover:text-blue-500 flex items-center gap-1 transition-colors cursor-pointer"
//                               >
//                                 <span className="material-symbols-outlined text-[16px]">
//                                   edit
//                                 </span>
//                                 Edit
//                               </button>
//                               <button 
//                                 onClick={() => navigator.clipboard.writeText(q)}
//                                 className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer"
//                               >
//                                 <span className="material-symbols-outlined text-[16px]">
//                                   content_copy
//                                 </span>
//                                 Copy
//                               </button>
//                               <button 
//                                 onClick={() => removeQuestion(index)}
//                                 className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
//                               >
//                                 <span className="material-symbols-outlined text-[16px]">
//                                   delete
//                                 </span>
//                                 Remove
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* FIXED FOOTER AREA */}
//               {!isGenerating && generatedQuestions.length > 0 && (
//                 <div className="p-4 bg-white border-t border-slate-100 shrink-0">
//                   <div className="flex justify-end">
//                     <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2">
//                       <span className="material-symbols-outlined text-[18px]">
//                         save
//                       </span>
//                       Save Interview Setup
//                     </button>
//                   </div>
//                 </div>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Job {
  id: string;
  title: string;
  description: string;
}

export default function GenerateQuestionsPage() {
  // Data State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  
  // Form State
  const [selectedJobId, setSelectedJobId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [duration, setDuration] = useState('30');
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  
  // Edit State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // ==========================================
  // 1. FETCH JOBS ON MOUNT
  // ==========================================
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
            description: job.description || 'No description provided.', 
          }));

          setJobs(mappedJobs);

          if (mappedJobs.length > 0) {
            handleJobSelection(mappedJobs[0].id, mappedJobs);
          }
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsJobsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ==========================================
  // 2. HANDLE JOB SELECTION
  // ==========================================
  const handleJobSelection = (jobId: string, jobList: Job[] = jobs) => {
    setSelectedJobId(jobId);
    
    const selectedJob = jobList.find((j) => j.id === jobId);
    if (selectedJob) {
      setJobTitle(selectedJob.title);
      setJobDescription(selectedJob.description);
    } else {
      setJobTitle('');
      setJobDescription('');
    }
  };

  // ==========================================
  // 3. EDIT & REMOVE HANDLERS (Frontend Only)
  // ==========================================
  const startEdit = (index: number, currentText: string) => {
    setEditingIndex(index);
    setEditValue(currentText);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const saveEdit = (index: number) => {
    if (!editValue.trim()) return; // Don't save empty questions
    const updatedQuestions = [...generatedQuestions];
    updatedQuestions[index] = editValue;
    setGeneratedQuestions(updatedQuestions);
    setEditingIndex(null);
    setEditValue('');
  };

  const removeQuestion = (indexToRemove: number) => {
    setGeneratedQuestions(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // ==========================================
  // 4. GENERATE QUESTIONS 
  // ==========================================
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobId || !jobDescription) return;

    setIsGenerating(true);
    setGeneratedQuestions([]);
    setEditingIndex(null); // Reset edit state if regenerating

    try {
      const payload = {
        job_id: selectedJobId,
        duration: Number(duration),
        custom_context: jobDescription,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_AI_API_BASE_URL || 'http://localhost:7000'}/api/interview/setup`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      const questionsList = response.data.data.questions;
      setGeneratedQuestions(questionsList);

    } catch (error) {
      console.error('Failed to generate questions:', error);
      alert("Failed to generate questions. Please ensure the AI backend is running.");
    } finally {
      setIsGenerating(false);
    }
  };

  // ==========================================
  // 5. SAVE FINALIZED INTERVIEW TO DB
  // ==========================================
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        job_id: selectedJobId,
        duration: Number(duration),
        custom_context: jobDescription,
        questions: generatedQuestions, // Sends the edited/filtered array!
      };

      const response = await axios.post(
        `${import.meta.env.VITE_AI_API_BASE_URL || 'http://localhost:7000'}/api/interview/save`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        toast.success("Success! Interview setup has been saved to the database.");
       
      }
    } catch (error) {
      console.error('Failed to save interview setup:', error);
      toast.error("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-class">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* --- PAGE TITLE --- */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Design the Interview
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Select a job, and our AI will generate targeted
            technical and behavioral questions based on the requirements.
          </p>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
              <form onSubmit={handleGenerate} className="space-y-5">
                
                {/* Linked Job Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Select Job Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        work
                      </span>
                    </div>
                    <select
                      required
                      value={selectedJobId}
                      onChange={(e) => handleJobSelection(e.target.value)}
                      disabled={isJobsLoading || jobs.length === 0}
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer disabled:opacity-60 disabled:bg-slate-50"
                    >
                      {isJobsLoading ? (
                        <option value="">Loading your jobs...</option>
                      ) : jobs.length === 0 ? (
                        <option value="">No jobs found. Create one first.</option>
                      ) : (
                        <>
                          <option value="" disabled>Select a role to base the interview on</option>
                          {jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                              {job.title}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Interview Duration
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        schedule
                      </span>
                    </div>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none outline-none shadow-sm cursor-pointer"
                    >
                      <option value="15">15 Minutes (Brief Screen)</option>
                      <option value="30">30 Minutes (Standard)</option>
                      <option value="45">45 Minutes (In-depth)</option>
                      <option value="60">60 Minutes (Deep Dive)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Auto-filled Job Description */}
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <label className="block text-sm font-bold text-slate-700">
                      Context / Job Description <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {jobDescription.length} chars
                    </span>
                  </div>
                  <textarea
                    required
                    rows={6}
                    placeholder="Select a job above to auto-fill this area, or paste custom context..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    disabled={isJobsLoading}
                    className="w-full bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm resize-y transition-all disabled:bg-slate-50 disabled:opacity-70"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Auto-filled from the job posting. You can edit this to give the AI specific focus areas for this interview without modifying the original posting.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isGenerating || !selectedJobId || !jobDescription}
                  className={`w-full mt-2 flex items-center justify-center gap-2 font-bold rounded-lg px-4 py-3 transition-all duration-200 shadow-sm
                    ${
                      isGenerating || !selectedJobId || !jobDescription
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:-translate-y-0.5 shadow-indigo-600/25'
                    }`}
                >
                  {isGenerating ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">
                        progress_activity
                      </span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">
                        magic_button
                      </span>
                      Generate Questions
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Output Area */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-150 lg:h-175">
              
              {/* Output Header */}
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-500 text-[20px]">
                    format_list_bulleted
                  </span>
                  <h2 className="font-bold text-slate-800">Generated Output</h2>
                </div>
                {generatedQuestions.length > 0 && (
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full">
                    {generatedQuestions.length} Ready
                  </span>
                )}
              </div>

              {/* SCROLLABLE BODY AREA */}
              <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full relative">
                
                {/* 1. EMPTY STATE */}
                {!isGenerating && generatedQuestions.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-200">
                      <span className="material-symbols-outlined text-slate-400 text-3xl">
                        assignment_add
                      </span>
                    </div>
                    <p className="text-slate-700 font-bold text-lg">
                      Awaiting Instructions
                    </p>
                    <p className="text-slate-500 text-sm max-w-sm mt-2">
                      Select a job from the left and hit generate to create a
                      custom AI interview script based on the JD.
                    </p>
                  </div>
                )}

                {/* 2. LOADING STATE */}
                {isGenerating && (
                  <div className="space-y-4 pt-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm animate-pulse flex gap-4"
                      >
                        <div className="w-8 h-8 bg-slate-200 rounded-full shrink-0"></div>
                        <div className="w-full space-y-3 mt-1.5">
                          <div className="h-2.5 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-2.5 bg-slate-200 rounded w-full"></div>
                          <div className="h-2.5 bg-slate-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. SUCCESS / RESULTS LIST */}
                {!isGenerating && generatedQuestions.length > 0 && (
                  <div className="space-y-3">
                    {generatedQuestions.map((q, index) => (
                      <div
                        key={index}
                        className="group p-4 sm:p-5 bg-white border border-slate-100 hover:border-slate-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow flex gap-4 items-start relative"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-100 mt-0.5">
                          {index + 1}
                        </div>
                        
                        {editingIndex === index ? (
                          // === EDIT MODE ===
                          <div className="flex-1 min-w-0 pr-2">
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-full p-2.5 text-sm text-slate-700 bg-slate-50 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y transition-all"
                              rows={3}
                              autoFocus
                            />
                            <div className="mt-2.5 flex gap-2">
                              <button 
                                onClick={() => saveEdit(index)}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
                              >
                                Save Changes
                              </button>
                              <button 
                                onClick={cancelEdit}
                                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold rounded shadow-sm transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // === READ MODE ===
                          <div className="flex-1 min-w-0 pr-8">
                            <p className="text-slate-700 text-sm leading-relaxed font-medium mt-1">
                              {q}
                            </p>

                            {/* Action Row - Appears on hover */}
                            <div className="mt-3 flex gap-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => startEdit(index, q)}
                                className="text-xs font-bold text-slate-400 hover:text-blue-500 flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  edit
                                </span>
                                Edit
                              </button>
                              <button 
                                onClick={() => navigator.clipboard.writeText(q)}
                                className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  content_copy
                                </span>
                                Copy
                              </button>
                              <button 
                                onClick={() => removeQuestion(index)}
                                className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  delete
                                </span>
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FIXED FOOTER AREA */}
              {!isGenerating && generatedQuestions.length > 0 && (
                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                  <div className="flex justify-end">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className={`px-5 py-2.5 text-white text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2 ${
                        isSaving 
                          ? 'bg-emerald-400 cursor-not-allowed' 
                          : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[18px]">
                            progress_activity
                          </span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">
                            save
                          </span>
                          Save Interview Setup
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}