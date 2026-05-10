import { useNavigate, useParams } from 'react-router-dom';

export default function CandidateInfoPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // DUMMY DATA: Replace this with your actual API fetch later
  const candidate = {
    id: id || '123',
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'TechCorp Inc.',
    status: 'interviewing',
    tags: ['senior', 'frontend', 'react'],
    contact: {
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/sarahj',
      portfolio: 'sarahj.dev'
    },
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Next.js', 'Tailwind'],
    aiAnalysis: {
      summary: 'Strong candidate with 5+ years of experience in full-stack development. Excellent communication skills and solid technical foundation.',
      strengths: [
        'Strong problem-solving skills',
        'Excellent communication',
        'React & Node.js expertise'
      ],
      improvements: [
        'Limited DevOps experience',
        'No team lead experience'
      ]
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      
      {/* --- Back Button --- */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
      >
        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Candidates
      </button>

      {/* --- Header Section --- */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-200 shrink-0">
          {candidate.name.charAt(0)}
        </div>
        
        {/* Title & Badges */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
          <p className="text-gray-500 text-md mt-1 mb-3">
            {candidate.role} <span className="mx-1">@</span> {candidate.company}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full capitalize border border-yellow-200">
              {candidate.status}
            </span>
            {candidate.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full lowercase border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- Grid Layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Contact & Skills (Smaller width on desktop) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Contact Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Contact Info</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                {candidate.contact.email}
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                {candidate.contact.phone}
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {candidate.contact.location}
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                {candidate.company}
              </div>
              
              <div className="pt-2 flex flex-col gap-3">
                <a href={`https://${candidate.contact.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn Profile
                </a>
                <a href={`https://${candidate.contact.portfolio}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                  Portfolio
                </a>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-lg border border-gray-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: AI Analysis & Interview Results (Larger width on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* AI Resume Analysis Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">AI Resume Analysis</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {candidate.aiAnalysis.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div>
                <h3 className="text-sm font-semibold text-green-700 flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {candidate.aiAnalysis.strengths.map((str, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span> {str}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas to Improve */}
              <div>
                <h3 className="text-sm font-semibold text-yellow-700 flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {candidate.aiAnalysis.improvements.map((imp, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-yellow-500 mt-0.5">•</span> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* AI Interview Results Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm min-h-[250px] flex flex-col">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
              AI Interview Results
            </h2>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center">
               {/* Placeholder for actual interview content */}
               <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                 <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
               </div>
               <p className="text-gray-500 text-sm">Voice screening analysis will appear here after the candidate completes their interview.</p>
               <button className="mt-4 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                 Schedule AI Interview
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}