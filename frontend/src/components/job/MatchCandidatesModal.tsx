// // src/components/job/MatchCandidatesModal.tsx
// import { useEffect, useState } from 'react';
// import SendInviteModal from './SendInviteModal';

// interface MatchCandidatesModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   jobTitle: string;
//   jobId: string;
// }

// const DUMMY_CANDIDATES = [
//   {
//     id: '1',
//     name: 'Rahul Sanap',
//     initials: 'R',
//     avatarColor: 'bg-indigo-500',
//     badge: 'Top Match',
//     badgeColor: 'bg-yellow-100 text-yellow-800',
//     title: 'Software Developer',
//     company: 'Eastdil Secured',
//     quote:
//       '"Rahul has extensive full-stack experience with React, Node.js, and a proven track record of deploying scalable applications..."',
//     skills: [
//       'Full-Stack Development',
//       'Mobile App Dev',
//       'Cloud Services',
//       'DevOps',
//       'Database',
//     ],
//     matchScore: 95,
//   },
//   {
//     id: '2',
//     name: 'Sarah Johnson',
//     initials: 'S',
//     avatarColor: 'bg-indigo-500',
//     badge: '#2',
//     badgeColor: 'bg-slate-100 text-slate-600',
//     title: 'Senior Software Engineer',
//     company: 'Google',
//     quote:
//       '"Sarah demonstrates exceptional problem-solving skills and deep React knowledge..."',
//     skills: ['Frontend Architecture', 'State Management', 'Testing'],
//     matchScore: 90,
//   },
// ];

// interface Candidate {
//   id: string;
//   name: string;
//   initials: string;
//   avatarColor: string;
//   badge: string;
//   badgeColor: string;
//   title: string;
//   company: string;
//   quote: string;
//   skills: string[];
//   matchScore: number;
// }

// const AVATAR_COLORS = [
//   'bg-indigo-500',
//   'bg-blue-500',
//   'bg-emerald-500',
//   'bg-violet-500',
//   'bg-amber-500'
// ];

// export default function MatchCandidatesModal({
//   isOpen,
//   onClose,
//   jobTitle,
//   jobId,
// }: MatchCandidatesModalProps) {
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [currentView, setCurrentView] = useState<'match' | 'invite'>('match');

//   useEffect(() => {
//     if (!isOpen) {
//       setSelectedIds([]);
//       setCurrentView('match');
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleSelectAll = () => {
//     selectedIds.length === DUMMY_CANDIDATES.length
//       ? setSelectedIds([])
//       : setSelectedIds(DUMMY_CANDIDATES.map((c) => c.id));
//   };

//   const toggleCandidate = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
//     );
//   };

//   const handleSendInvites = (interviewType: string) => {
//     alert(
//       `Successfully sent ${interviewType} invites to ${selectedIds.length} candidates!`
//     );
//     setCurrentView('match');
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-class">
//       {currentView === 'match' ? (
//         // Modal Container: Flexible height, strict max width
//         <div className="bg-slate-50 w-full max-w-2xl max-h-[95vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 relative">
//           {/* Header (Fixed) */}
//           <header className="flex justify-between items-center bg-white border-b border-slate-200 px-5 sm:px-6 py-4 sm:py-5 shrink-0 z-20">
//             <div className="min-w-0 pr-4">
//               <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 truncate">
//                 <span className="material-symbols-outlined text-violet-600 text-[24px] sm:text-[28px] shrink-0">
//                   auto_awesome
//                 </span>
//                 <span className="truncate">Match Candidates</span>
//               </h2>
//               <p className="text-slate-500 mt-1 font-medium text-xs sm:text-sm truncate">
//                 AI-ranked candidates for{' '}
//                 <span className="text-slate-800 font-bold">{jobTitle}</span>
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
//               aria-label="Close modal"
//             >
//               <span className="material-symbols-outlined">close</span>
//             </button>
//           </header>

//           {/* Scrollable Body */}
//           {/* CSS classes applied to hide clunky default scrollbars while keeping functionality */}
//           <div className="overflow-y-auto flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
//             {/* Sticky Action Bar */}
//             <div className="sticky top-0 z-10 flex flex-wrap justify-between items-center gap-3 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <label className="flex items-center gap-2 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={
//                       selectedIds.length === DUMMY_CANDIDATES.length &&
//                       DUMMY_CANDIDATES.length > 0
//                     }
//                     onChange={handleSelectAll}
//                     className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer transition-all group-hover:border-violet-400"
//                   />
//                   <span className="font-bold text-slate-700 text-sm sm:text-base select-none group-hover:text-violet-700 transition-colors">
//                     Select All
//                   </span>
//                 </label>
//                 <span className="text-slate-400 text-xs sm:text-sm font-medium border-l border-slate-200 pl-3 sm:pl-4">
//                   {selectedIds.length} selected
//                 </span>
//               </div>

//               <button
//                 onClick={() => setCurrentView('invite')}
//                 disabled={selectedIds.length === 0}
//                 className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
//                   selectedIds.length > 0
//                     ? 'bg-linear-to-r from-violet-600 to-blue-600 text-white hover:shadow-md hover:opacity-95 active:scale-95 cursor-pointer'
//                     : 'bg-slate-100 text-slate-400 cursor-not-allowed'
//                 }`}
//               >
//                 <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
//                   mail
//                 </span>
//                 <span>
//                   Send Invite{' '}
//                   <span className="hidden sm:inline">
//                     ({selectedIds.length})
//                   </span>
//                 </span>
//               </button>
//             </div>

//             {/* Candidates List */}
//             <div className="flex flex-col gap-3 sm:gap-4">
//               {DUMMY_CANDIDATES.map((candidate) => {
//                 const isSelected = selectedIds.includes(candidate.id);
//                 return (
//                   <div
//                     key={candidate.id}
//                     className={`bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-200 flex gap-3 sm:gap-4 group ${
//                       isSelected
//                         ? 'border-violet-400 ring-1 ring-violet-400 shadow-sm'
//                         : 'border-slate-200 hover:border-violet-200 hover:shadow-md'
//                     }`}
//                   >
//                     {/* Left Col: Actions */}
//                     <div className="flex flex-col items-center gap-3 shrink-0 pt-1">
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={() => toggleCandidate(candidate.id)}
//                         className="w-5 h-5 rounded border-slate-300 text-violet-600 cursor-pointer transition-all"
//                       />
//                       <button
//                         className="text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
//                         aria-label="Favorite candidate"
//                       >
//                         <span
//                           className={`material-symbols-outlined text-[20px] sm:text-[22px] ${isSelected ? 'text-amber-400' : ''}`}
//                           style={{ fontVariationSettings: "'FILL' 1" }}
//                         >
//                           star
//                         </span>
//                       </button>
//                     </div>

//                     {/* Right Col: Full Content */}
//                     <div className="flex-1 flex flex-col gap-3 sm:gap-4 min-w-0">
//                       {/* Top Row: Avatar + Info + Score */}
//                       <div className="flex justify-between items-start gap-3">
//                         {/* Info Block */}
//                         <div className="flex items-start gap-3 sm:gap-4 min-w-0">
//                           <div
//                             className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shrink-0 shadow-sm ${candidate.avatarColor}`}
//                           >
//                             {candidate.initials}
//                           </div>
//                           <div className="min-w-0 pt-0.5">
//                             <div className="flex flex-wrap items-center gap-2 mb-0.5 sm:mb-1">
//                               <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
//                                 {candidate.name}
//                               </h3>
//                               <span
//                                 className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wide ${candidate.badgeColor}`}
//                               >
//                                 {candidate.badge}
//                               </span>
//                             </div>
//                             <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">
//                               {candidate.title} <span className="mx-1">·</span>{' '}
//                               {candidate.company}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Score Block */}
//                         <div className="flex flex-col items-end shrink-0 pl-2">
//                           <span className="text-emerald-500 font-extrabold text-lg sm:text-xl leading-none">
//                             {candidate.matchScore}%
//                           </span>
//                           <div className="w-12 sm:w-16 bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
//                             <div
//                               className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
//                               style={{ width: `${candidate.matchScore}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Bottom Row: Quote & Skills */}
//                       <div className="flex flex-col gap-3">
//                         <p className="text-xs sm:text-[13px] text-slate-600 italic bg-slate-50 p-3 sm:p-3.5 rounded-lg border border-slate-100 leading-normal">
//                           {candidate.quote}
//                         </p>

//                         <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                           {candidate.skills.map((skill, index) => (
//                             <span
//                               key={index}
//                               className="text-[11px] sm:text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 whitespace-nowrap"
//                             >
//                               {skill}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <SendInviteModal
//           onBack={() => setCurrentView('match')}
//           onClose={onClose}
//           selectedCount={selectedIds.length}
//           jobTitle={jobTitle}
//           onSend={handleSendInvites}
//         />
//       )}
//     </div>
//   );
// }

// src/components/job/MatchCandidatesModal.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SendInviteModal from './SendInviteModal';

interface MatchCandidatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId: string; // NEW PROP
}

// Define the shape of our mapped candidate data
interface Candidate {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  badge: string;
  badgeColor: string;
  title: string;
  company: string;
  quote: string;
  skills: string[];
  matchScore: number;
}

const AVATAR_COLORS = [
  'bg-indigo-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-amber-500'
];

export default function MatchCandidatesModal({
  isOpen,
  onClose,
  jobTitle,
  jobId,
}: MatchCandidatesModalProps) {
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'match' | 'invite'>('match');

  // FETCH DATA FROM BACKEND WHEN MODAL OPENS
  useEffect(() => {
    if (isOpen && jobId) {
      const id=jobId
      const fetchMatchedCandidates = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/applications/matched-candidates/${id}`,
            { withCredentials: true }
          );

          // Map the backend data to our UI format
          const formattedCandidates = data.data.candidates.map((backendData: any, index: number) => {
            
            // Generate initials (e.g. "Santu Pramanik" -> "SP")
            const names = backendData.candidateName ? backendData.candidateName.split(' ') : ['U'];
            const initials = names.length > 1 
              ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() 
              : names[0].substring(0, 2).toUpperCase();

            // Assign badge based on score and rank
            let badge = `#${index + 1}`;
            let badgeColor = 'bg-slate-100 text-slate-600';
            
            if (index === 0 && backendData.matchScore > 70) {
              badge = 'Top Match';
              badgeColor = 'bg-yellow-100 text-yellow-800';
            } else if (backendData.matchScore >= 80) {
              badge = 'Great Match';
              badgeColor = 'bg-emerald-100 text-emerald-800';
            }

            return {
              id: backendData.candidateEmail, // Use email as unique ID
              name: backendData.candidateName || 'Unknown Applicant',
              initials: initials,
              avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
              badge: badge,
              badgeColor: badgeColor,
              title: backendData.jobTitle || 'Applicant',
              company: backendData.candidateEmail, // Display email below name
              quote: backendData.summary || 'The AI is currently evaluating this candidate.',
              skills: ['AI Evaluated'], // Since your backend route was restricted, we show a default tag
              matchScore: backendData.matchScore || 0,
            };
          });

          setCandidates(formattedCandidates);
        } catch (error) {
          console.error(error);
          toast.error('Failed to load candidate matches.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchMatchedCandidates();
    } else {
      // Reset state when closed
      setSelectedIds([]);
      setCurrentView('match');
      setCandidates([]);
    }
  }, [isOpen, jobId]);

  if (!isOpen) return null;

  const handleSelectAll = () => {
    selectedIds.length === candidates.length && candidates.length > 0
      ? setSelectedIds([])
      : setSelectedIds(candidates.map((c) => c.id));
  };

  const toggleCandidate = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleSendInvites = (interviewType: string) => {
    alert(`Successfully sent ${interviewType} invites to ${selectedIds.length} candidates!`);
    setCurrentView('match');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-class">
      {currentView === 'match' ? (
        <div className="bg-slate-50 w-full max-w-2xl max-h-[95vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 relative">
          
          {/* Header */}
          <header className="flex justify-between items-center bg-white border-b border-slate-200 px-5 sm:px-6 py-4 sm:py-5 shrink-0 z-20">
            <div className="min-w-0 pr-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 truncate">
                <span className="material-symbols-outlined text-violet-600 text-[24px] sm:text-[28px] shrink-0">
                  auto_awesome
                </span>
                <span className="truncate">Match Candidates</span>
              </h2>
              <p className="text-slate-500 mt-1 font-medium text-xs sm:text-sm truncate">
                AI-ranked candidates for{' '}
                <span className="text-slate-800 font-bold">{jobTitle}</span>
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer shrink-0">
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          {/* Body */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            
            {/* Action Bar */}
            <div className="sticky top-0 z-10 flex flex-wrap justify-between items-center gap-3 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === candidates.length && candidates.length > 0}
                    onChange={handleSelectAll}
                    disabled={isLoading || candidates.length === 0}
                    className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer transition-all disabled:opacity-50"
                  />
                  <span className="font-bold text-slate-700 text-sm sm:text-base select-none">
                    Select All
                  </span>
                </label>
                <span className="text-slate-400 text-xs sm:text-sm font-medium border-l border-slate-200 pl-3 sm:pl-4">
                  {selectedIds.length} selected
                </span>
              </div>

              <button
                onClick={() => setCurrentView('invite')}
                disabled={selectedIds.length === 0}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
                  selectedIds.length > 0
                    ? 'bg-linear-to-r from-violet-600 to-blue-600 text-white hover:shadow-md hover:opacity-95 active:scale-95 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">mail</span>
                <span>Send Invite <span className="hidden sm:inline">({selectedIds.length})</span></span>
              </button>
            </div>

            {/* Candidates List / Loading State */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                 <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-slate-500 font-medium">Fetching best matches...</p>
              </div>
            ) : candidates.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl border border-slate-200">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">person_off</span>
                <p className="text-slate-500 font-medium">No candidates have applied for this job yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:gap-4">
                {candidates.map((candidate) => {
                  const isSelected = selectedIds.includes(candidate.id);
                  return (
                    <div
                      key={candidate.id}
                      className={`bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-200 flex gap-3 sm:gap-4 group ${
                        isSelected 
                          ? 'border-violet-400 ring-1 ring-violet-400 shadow-sm' 
                          : 'border-slate-200 hover:border-violet-200 hover:shadow-md'
                      }`}
                    >
                      {/* Checkbox / Star */}
                      <div className="flex flex-col items-center gap-3 shrink-0 pt-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCandidate(candidate.id)}
                          className="w-5 h-5 rounded border-slate-300 text-violet-600 cursor-pointer"
                        />
                        <button className="text-slate-300 hover:text-amber-400 transition-colors cursor-pointer">
                          <span className={`material-symbols-outlined text-[20px] sm:text-[22px] ${isSelected ? 'text-amber-400' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col gap-3 sm:gap-4 min-w-0">
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                            {/* Avatar */}
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shrink-0 shadow-sm ${candidate.avatarColor}`}>
                              {candidate.initials}
                            </div>
                            <div className="min-w-0 pt-0.5">
                              <div className="flex flex-wrap items-center gap-2 mb-0.5 sm:mb-1">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                                  {candidate.name}
                                </h3>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wide ${candidate.badgeColor}`}>
                                  {candidate.badge}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">
                                {candidate.title} <span className="mx-1">·</span> {candidate.company}
                              </p>
                            </div>
                          </div>

                          {/* Score */}
                          <div className="flex flex-col items-end shrink-0 pl-2">
                            <span className="text-emerald-500 font-extrabold text-lg sm:text-xl leading-none">
                              {candidate.matchScore}%
                            </span>
                            <div className="w-12 sm:w-16 bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                              <div
                                className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${candidate.matchScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* Summary Quote */}
                        <div className="flex flex-col gap-3">
                          <p className="text-xs sm:text-[13px] text-slate-600 italic bg-slate-50 p-3 sm:p-3.5 rounded-lg border border-slate-100 leading-normal">
                            {candidate.quote}
                          </p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {candidate.skills.map((skill, index) => (
                              <span key={index} className="text-[11px] sm:text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 whitespace-nowrap">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <SendInviteModal
          onBack={() => setCurrentView('match')}
          onClose={onClose}
          selectedCount={selectedIds.length}
          jobTitle={jobTitle}
          onSend={handleSendInvites}
        />
      )}
    </div>
  );
}