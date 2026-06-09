import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { EmailIcon } from '../shared/components/EmailIcon';
import ContactIcon from '../shared/components/ContactIcon';
import { LocationIcon } from '../shared/components/LocationIcon';
import LinkedinIcon from '../shared/components/LinkedinIcon';
import GithubIcon from '../shared/components/GithubIcon';
import { InterviewResultCard } from '../components/job/InterviewResultCard';

//  Define the exact shape of our new backend response
// interface CandidateProfile {
//   applicationId: string;
//   name: string;
//   role: string;
//   company: string;
//   status: string;
//   contact: {
//     email: string;
//     phone: string;
//     location: string;
//     linkedin: string;
//     github: string;
//     resumeUrl: string;
//   };
//   aiAnalysis: {
//     matchScore: number;
//     matchedSkills: string[];
//     missingSkills: string[];
//     summary: string;
//     strengths: string[];
//     improvements: string[];
//     scoreReasoning: string;
//   };
// }

interface CandidateProfile {
  applicationId: string;
  name: string;
  role: string;
  company: string;
  status: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    resumeUrl: string;
  };
 aiAnalysis: {
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    summary: string;
    strengths: string[];
    improvements: string[];
    scoreReasoning: string;
    voiceInterview?: {
      status: string;
      overallScore: number;
      communicationScore: number;
      technicalScore: number;
      confidenceScore: number; // <--- Changed this from problemSolvingScore
    };
  };
}
export default function CandidateInfoPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Fetch Real Data
  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/applications/candidates/${id}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setCandidate(response.data.data);
        } else {
          throw new Error('Failed to load candidate.');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Server error.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCandidateData();
  }, [id]);

  // Loading & Error States
  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500 mt-10">
        Loading profile...
      </div>
    );
  if (error || !candidate)
    return <div className="p-8 text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Candidates
      </button>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-200 shrink-0">
            {candidate.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {candidate.name.toLowerCase()}
            </h1>
            <p className="text-gray-500 text-md mt-1 mb-3">
              {candidate.role} <span className="mx-1">@</span>{' '}
              {candidate.company}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full capitalize border border-yellow-200">
                {candidate.status}
              </span>
            </div>
          </div>
        </div>

        {/* Match Score Badge */}
        <div className="bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Resume Score
          </span>
          <span
            className={`text-3xl font-black ${candidate.aiAnalysis.matchScore >= 75 ? 'text-green-600' : candidate.aiAnalysis.matchScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}
          >
            {candidate.aiAnalysis.matchScore}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Contact & Skills */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">
              Contact Info
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <EmailIcon></EmailIcon>
                <span className="truncate">{candidate.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <ContactIcon></ContactIcon>
                {candidate.contact.phone}
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <LocationIcon></LocationIcon>
                <span className="truncate">{candidate.contact.location}</span>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                {candidate.contact.linkedin && (
                  <a
                    href={`https://${candidate.contact.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <LinkedinIcon />
                    LinkedIn Profile
                  </a>
                )}

                {candidate.contact.github && (
                  <a
                    href={`https://${candidate.contact.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-gray-800 hover:text-black text-sm font-medium"
                  >
                    <GithubIcon />
                    GitHub Profile
                  </a>
                )}
              </div>

              {/* Working Resume Button hooked to the Cloudinary URL */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <a
                  href={candidate.contact.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '20px' }}
                  >
                    open_in_new
                  </span>
                  View Full Resume
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Skills Evaluation
            </h2>

            <div className="mb-4">
              <span className="text-xs text-gray-500 mb-2 block">
                Matched Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {candidate.aiAnalysis.matchedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-lg border border-green-200"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {candidate.aiAnalysis.missingSkills.length > 0 && (
              <div>
                <span className="text-xs text-gray-500 mb-2 block">
                  Missing Required Skills
                </span>
                <div className="flex flex-wrap gap-2">
                  {candidate.aiAnalysis.missingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg border border-red-200 opacity-80"
                    >
                      ✗ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: AI Analysis */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              AI Resume Analysis
            </h2>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 mb-6 text-gray-700 text-sm leading-relaxed">
              <span className="font-semibold text-gray-900 block mb-1">
                Executive Summary:
              </span>
              {candidate.aiAnalysis.summary}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-green-700 flex items-center gap-2 mb-3">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '17px' }}
                  >
                    check_circle
                  </span>
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {candidate.aiAnalysis.strengths.map((str, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-green-500 mt-0.5">•</span> {str}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-yellow-700 flex items-center gap-2 mb-3">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '17px' }}
                  >
                    error
                  </span>
                  Areas to Improve
                </h3>
                <ul className="space-y-3">
                  {candidate.aiAnalysis.improvements.map((imp, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-yellow-500 mt-0.5">•</span> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Score Reasoning */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Score Deduction Breakdown
              </h3>
              <p className="text-xs text-gray-500 font-mono bg-gray-50 p-3 rounded">
                {candidate.aiAnalysis.scoreReasoning}
              </p>
            </div>
          </div>

          {/* AI Interview Results Card */}
          <InterviewResultCard candidate={candidate} />
        </div>
      </div>
    </div>
  );
}
