import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  DollarSign,
  ArrowLeft,
  Sparkles,
  UploadCloud,
  Mail,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Check
} from 'lucide-react';

type SubmissionMethod = 'upload' | 'manual';

interface JobDetails {
  _id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: {
    min: string;
    max: string;
    currency: string;
  };
  skills: string[];
  responsibilities: string[];
}

const currencySymbol: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export default function ApplyJobPage() {
  const navigate = useNavigate();

  const [job, setJob] = useState<JobDetails | null>(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [jobError, setJobError] = useState<string | null>(null);

  const [method, setMethod] = useState<SubmissionMethod>('upload');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isParsing, setIsParsing] = useState(false);
  const [parsingStep, setParsingStep] = useState(0);

  const [resumeUrl, setResumeUrl] = useState('');
  const [rawResumeText, setRawResumeText] = useState('');
  const [fileName, setFileName] = useState('');

  const { jobId } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedInUrl: '',
    githubUrl: '',
    location: '',
    skills: [] as string[],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsingMessages = [
    'Uploading document securely...',
    'Scanning resume structure & layout...',
    'Extracting primary contact info...',
    'Identifying key skills & expertise...',
    'Mapping profile to job requirements...',
    'Form auto-population complete!',
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isParsing) {
      interval = setInterval(() => {
        setParsingStep((prev) =>
          prev < parsingMessages.length - 1 ? prev + 1 : prev
        );
      }, 700);
    }

    return () => clearInterval(interval);
  }, [isParsing, parsingMessages.length]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsParsing(true);
      setParsingStep(0);

      try {
        const formDataObj = new FormData();
        formDataObj.append('resume', file);

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}/applications/extract-resume`,
          formDataObj,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        const parsedData = data.candidate_data;

        setRawResumeText(data.raw_resume_text);
        setResumeUrl(data.resumeUrl);

        setIsParsing(false);

        const name = (parsedData.candidate_name || '').split(' ');
        const firstName = name[0] || '';
        const lastName = name.slice(1).join(' ') || '';

        setFormData({
          firstName,
          lastName,
          email: parsedData.email || '',
          phone: parsedData.phone || '',
          linkedInUrl: parsedData.linkedInUrl || '',
          githubUrl: parsedData.githubUrl || '',
          location: parsedData.location || '',
          skills: parsedData.skills || [],
        });
        toast.success('Resume parsed successfully! Form fields have been filled.');
      } catch (error) {
        setIsParsing(false);
        setFileName('');
        console.error('Error parsing resume:', error);
        toast.error('Failed to parse resume automatically. Please fill manually or try again.');

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const payload = {
      verifiedFormData: {
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        linkedInUrl: formData.linkedInUrl,
        githubUrl: formData.githubUrl,
        location: formData.location,
        skills: formData.skills,
      },
      rawResumeText: rawResumeText,
      resumeURL: resumeUrl,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}/applications`,
        payload,
        {
          withCredentials: true,
        }
      );
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success(data.message || 'Application submitted successfully!');
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error(error.response?.data?.message || 'Application submission failed');
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoadingJob(true);
        setJobError(null);

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`,
          { withCredentials: true }
        );
        setJob(data.data);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          'This job is no longer available or does not exist.';
        setJobError(errorMessage);
      } finally {
        setIsLoadingJob(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 font-class text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-7xl mx-auto">
        {/* Top Header with Back button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors bg-white px-4 py-2.5 rounded-full border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-slate-200 duration-200"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Job Board
          </button>
        </div>

        {/* === STATE 1: LOADING SKELETON === */}
        {isLoadingJob ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-8 animate-pulse">
              <div className="h-10 bg-slate-200 rounded-lg w-3/4"></div>
              <div className="flex gap-4">
                <div className="h-6 bg-slate-200 rounded-full w-24"></div>
                <div className="h-6 bg-slate-200 rounded-full w-24"></div>
                <div className="h-6 bg-slate-200 rounded-full w-40"></div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-100 rounded-3xl p-8 h-96 animate-pulse flex flex-col gap-4 shadow-sm">
                <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-slate-200 rounded w-full"></div>
                <div className="h-32 bg-slate-200 rounded w-full mt-4"></div>
              </div>
            </div>
          </div>
        ) : /* === STATE 2: ERROR / JOB NOT FOUND === */
        jobError || !job ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl max-w-3xl mx-auto text-center px-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6 border border-rose-100">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Job Opportunity Unavailable
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
              {jobError ||
                "This listing might have expired or the link is incorrect. Please contact support if you think this is an error."}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              Return to Listings
            </button>
          </div>
        ) : (
          /* === STATE 3: JOB RENDERED SUCCESSFULLY === */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Job Details */}
            <div className="lg:col-span-7 space-y-8 bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100/50 mb-4">
                  <Briefcase className="w-3.5 h-3.5" />
                  {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                </span>
                
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                  {job.title}
                </h1>

                {/* Job Metadata Panel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-slate-50/80 border border-slate-100 p-3.5 rounded-2xl">
                    <div className="p-2 bg-white rounded-xl border border-slate-100 text-indigo-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Location</p>
                      <p className="text-sm font-bold text-slate-700">{job.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50/80 border border-slate-100 p-3.5 rounded-2xl">
                    <div className="p-2 bg-white rounded-xl border border-slate-100 text-emerald-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Salary Package</p>
                      <p className="text-sm font-bold text-slate-700">
                        {currencySymbol[job.salary?.currency] || ''}
                        {Number(job.salary?.min).toLocaleString()} -{' '}
                        {Number(job.salary?.max).toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ yr</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Role Description
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {job.description}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Required Competencies
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {job.skills?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-50 text-slate-700 border border-slate-200/60 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all hover:border-indigo-200 hover:bg-indigo-50/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-3.5">
                    {job.responsibilities?.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm sm:text-base">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                        <span className="pt-0.5">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-5 sticky top-8">
              <div className="bg-white border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] rounded-3xl p-6 sm:p-8">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                      Application Submitted!
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                      Thank you for applying. Our AI recruiting system is currently analyzing your credentials against the role profile. Look out for an email response shortly.
                    </p>
                    <button
                      onClick={() => navigate(-1)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100 cursor-pointer shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Listings
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                        Apply Now
                      </h2>
                      <p className="text-slate-500 text-xs mb-4">
                        Submit your details to start the screening process.
                      </p>
                      
                      {/* Method Switcher */}
                      <div className="flex bg-slate-100/80 p-1 rounded-xl mb-4 border border-slate-200/30">
                        <button
                          type="button"
                          onClick={() => setMethod('upload')}
                          className={`flex-grow flex items-center justify-center gap-1.5 py-2.5 cursor-pointer text-xs font-semibold rounded-lg transition-all duration-200 ${
                            method === 'upload'
                              ? 'bg-white shadow-sm text-indigo-600 border border-slate-200/20'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          AI Auto-Fill
                        </button>
                        <button
                          type="button"
                          onClick={() => setMethod('manual')}
                          className={`flex-grow flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold cursor-pointer rounded-lg transition-all duration-200 ${
                            method === 'manual'
                              ? 'bg-white shadow-sm text-indigo-600 border border-slate-200/20'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Fill Manually
                        </button>
                      </div>
                    </div>

                    {/* Conditional UI: Upload Dropzone OR Parsing Animation */}
                    {method === 'upload' && (
                      <div className="mb-4">
                        {isParsing ? (
                          <div className="h-44 w-full border border-indigo-200 bg-indigo-50/30 rounded-2xl flex flex-col items-center justify-center p-6 shadow-inner relative overflow-hidden">
                            {/* Scanning Laser Line Animation Effect */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500/80 animate-pulse"></div>
                            
                            <div className="mb-3">
                              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                            </div>
                            <p className="text-sm font-bold text-indigo-900 animate-pulse text-center">
                              {parsingMessages[parsingStep]}
                            </p>
                            <p className="text-xs text-indigo-500/80 mt-1.5">
                              Extracting info from {fileName}
                            </p>
                          </div>
                        ) : (
                          <label className="group relative h-40 w-full border border-dashed border-slate-200 bg-slate-50/50 hover:bg-indigo-50/10 hover:border-indigo-300 rounded-2xl flex flex-col items-center justify-center p-6 transition-all cursor-pointer shadow-sm hover:shadow-md">
                            <div className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 group-hover:text-indigo-600 shadow-sm transition-colors duration-200">
                              <UploadCloud className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-bold text-slate-700 mt-3 group-hover:text-indigo-700">
                              {fileName ? fileName : 'Upload Resume / CV'}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              PDF only (Max 5MB)
                            </p>
                            <input
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              ref={fileInputRef}
                              onChange={handleFileUpload}
                            />
                          </label>
                        )}
                      </div>
                    )}

                    {/* Shared Form Fields */}
                    <div
                      className={`space-y-4 transition-opacity duration-300 ${
                        isParsing ? 'opacity-30 pointer-events-none' : 'opacity-100'
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">
                            First Name
                          </label>
                          <input
                            required
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50/40 text-sm font-medium"
                            placeholder="Jane"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">
                            Last Name
                          </label>
                          <input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50/40 text-sm font-medium"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-4 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50/40 text-sm font-medium"
                            placeholder="jane@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-4 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50/40 text-sm font-medium"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      {/* Display extracted data badge details when AI is done parsing */}
                      {method === 'upload' && !isParsing && (formData.skills.length > 0 || formData.linkedInUrl || formData.githubUrl || formData.location) && (
                        <div className="bg-indigo-50/20 border border-indigo-100/50 rounded-2xl p-4 mt-4 space-y-3.5">
                          <p className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                            Extracted Profile Details
                          </p>

                          {formData.location && (
                            <p className="text-xs text-slate-600 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <strong className="text-slate-700">Location:</strong> {formData.location}
                            </p>
                          )}

                          {(formData.linkedInUrl || formData.githubUrl) && (
                            <div className="flex flex-wrap gap-3">
                              {formData.linkedInUrl && (
                                <a
                                  href={formData.linkedInUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold"
                                >
                                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                  </svg>
                                  LinkedIn Profile
                                </a>
                              )}
                              {formData.githubUrl && (
                                <a
                                  href={formData.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-slate-700 hover:text-slate-900 flex items-center gap-1 font-semibold"
                                >
                                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                  </svg>
                                  GitHub Profile
                                </a>
                              )}
                            </div>
                          )}

                          {formData.skills.length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Extracted Skills</p>
                              <div className="flex flex-wrap gap-1.5">
                                {formData.skills.slice(0, 8).map((skill, idx) => (
                                  <span key={idx} className="bg-white border border-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                                    {skill}
                                  </span>
                                ))}
                                {formData.skills.length > 8 && (
                                  <span className="text-[10px] text-slate-400 font-semibold pt-0.5">
                                    +{formData.skills.length - 8} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Manual Mode Specific Fields */}
                    {method === 'manual' && (
                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-slate-500 mb-2.5">
                          Attach Resume (Required)
                        </label>
                        <div className="relative">
                          <input
                            required
                            type="file"
                            accept=".pdf"
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100/80 transition-all outline-none border border-slate-200/80 rounded-xl bg-slate-50/20"
                          />
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isParsing}
                      className="w-full bg-indigo-600 cursor-pointer text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition-all flex justify-center items-center shadow-lg shadow-indigo-100 hover:shadow-indigo-200 disabled:bg-indigo-400 mt-6 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin w-4 h-4" />
                          Submitting application...
                        </span>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

