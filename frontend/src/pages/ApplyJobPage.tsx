import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

type SubmissionMethod = 'upload' | 'manual';

// Define Job data type
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
  // Navigation for the "Go Back" button
  const navigate = useNavigate();

  // Job details
  const [job, setJob] = useState<JobDetails | null>(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [jobError, setJobError] = useState<string | null>(null);

  // Form & UI States
  const [method, setMethod] = useState<SubmissionMethod>('upload');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // AI Parsing States
  const [isParsing, setIsParsing] = useState(false);
  const [parsingStep, setParsingStep] = useState(0);

  // Backend Resume Parsing State
  const [resumeUrl, setResumeUrl] = useState('');
  const [rawResumeText, setRawResumeText] = useState('');

  // Get Jobid from URL
  const { jobId } = useParams();

  // Form Data State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedInUrl: '', // Hidden background field
    githubUrl: '', // Hidden background field
    location: '', // Hidden background field
    skills: [], // Hidden background field
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Messages to cycle through during the loading state
  const parsingMessages = [
    'Uploading document...',
    'Scanning resume layout...',
    'Extracting key skills...',
    'Matching with job requirements...',
    'Populating application form...',
  ];

  // Handle the text animation sequence
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isParsing) {
      interval = setInterval(() => {
        setParsingStep((prev) =>
          prev < parsingMessages.length - 1 ? prev + 1 : prev
        );
      }, 800);
    }

    return () => clearInterval(interval);
  }, [isParsing, parsingMessages.length]);

  // Handle File Upload & Mock AI Process
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsParsing(true);
      setParsingStep(0);

      try {
        const formDataObj = new FormData();
        formDataObj.append('resume', file);

        // Send the PDF to the backend
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

        // Save the raw text and URL for the final submission
        setRawResumeText(data.raw_resume_text);
        setResumeUrl(data.resumeUrl);

        setIsParsing(false);

        // Split the name into firstname and lastname
        const name = parsedData.candidate_name.split(' ');
        const firstName = name[0];
        const lastName = name[1];

        setFormData({
          firstName: firstName || '',
          lastName: lastName || '',
          email: parsedData.email || '',
          phone: parsedData.phone || '',
          linkedInUrl: parsedData.linkedInUrl || '',
          githubUrl: parsedData.githubUrl || '',
          location: parsedData.location || '',
          skills: parsedData.skills || [],
        });
      } catch (error) {
        setIsParsing(false);
        console.error('Error parsing resume:', error);

        // Reset file input so they can try again if they want
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
        name: fullName, // <-- THIS IS THE FIX
        email: formData.email,
        phone: formData.phone,

        // Include your hidden fields from the AI parser
        linkedInUrl: formData.linkedInUrl,
        githubUrl: formData.githubUrl,
        location: formData.location,
        skills: formData.skills,
      },
      rawResumeText: rawResumeText, // Make sure this state exists from your upload step
      resumeURL: resumeUrl, // Make sure this state exists from your upload step
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

      toast.success(data.message);
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error(error.response?.data?.message || 'Application failed');
    }
  };

  // Fetch the job details from the backend
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 font-class">
      <div className="max-w-7xl mx-auto">
        {/* === STATE 1: LOADING SKELETON === */}
        {isLoadingJob ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-8 animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="flex gap-4">
                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                <div className="h-6 bg-gray-200 rounded-full w-40"></div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
            {/* Form Skeleton to keep layout stable while loading */}
            <div className="lg:col-span-5">
              <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-6 sm:p-8 h-96 animate-pulse flex flex-col gap-4">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-32 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          </div>
        ) : /* === STATE 2: ERROR / JOB NOT FOUND === */
        jobError || !job ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white shadow-sm border border-gray-100 rounded-2xl max-w-3xl mx-auto text-center px-6">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Job Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              {jobError ||
                "We couldn't find the job you're looking for. It might have expired, or the URL might be incorrect."}
            </p>
            <button
              onClick={() => navigate(-1)} // Or navigate('/jobs')
              className="bg-gray-900 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Go Back
            </button>
          </div>
        ) : (
          /* === STATE 3: JOB RENDERED SUCCESSFULLY === */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Job Details */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600 mb-6">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    {job.location}
                  </span>
                  <span className="flex items-center text-gray-500">
                    {currencySymbol[job.salary?.currency] || ''}{' '}
                    {Number(job.salary?.min).toLocaleString()} -{' '}
                    {Number(job.salary?.max).toLocaleString()} / year
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Overview
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {job.description}
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Responsibilities
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {job.responsibilities?.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-5">
              <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-6 sm:p-8 sticky top-8">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Application Submitted!
                    </h3>
                    <p className="text-gray-600">
                      Our AI is currently reviewing your profile. We will email
                      you the results shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header & Toggle at the Top */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Apply Now
                      </h2>
                      <div className="flex bg-gray-100 p-1 rounded-lg mb-2">
                        <button
                          type="button"
                          onClick={() => setMethod('upload')}
                          className={`flex-1 py-2 cursor-pointer text-sm font-medium rounded-md transition-all ${
                            method === 'upload'
                              ? 'bg-white shadow text-blue-600'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          ✨ AI Auto-Fill Resume
                        </button>
                        <button
                          type="button"
                          onClick={() => setMethod('manual')}
                          className={`flex-1 py-2 text-sm font-medium cursor-pointer rounded-md transition-all ${
                            method === 'manual'
                              ? 'bg-white shadow text-blue-600'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Fill Manually
                        </button>
                      </div>
                    </div>

                    {/* Conditional UI: Upload Dropzone OR Parsing Animation */}
                    {method === 'upload' && (
                      <div className="mb-6 h-40">
                        {isParsing ? (
                          <div className="h-full w-full border-2 border-blue-400 bg-blue-50 rounded-lg flex flex-col items-center justify-center p-6 shadow-inner">
                            <div className="relative mb-4">
                              <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                            </div>
                            <p className="text-sm font-bold text-blue-800 transition-opacity duration-300">
                              {parsingMessages[parsingStep]}
                            </p>
                          </div>
                        ) : (
                          <label className="h-full w-full border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg flex flex-col items-center justify-center p-6 hover:bg-blue-50 transition-colors cursor-pointer group">
                            <span
                              className="material-symbols-outlined  text-blue-400 group-hover:text-blue-600 mb-3 transition-transform group-hover:-translate-y-1"
                              style={{ fontSize: '40px' }}
                            >
                              cloud_upload
                            </span>
                            <p className="text-sm font-semibold text-blue-900">
                              Upload resume to auto-fill
                            </p>
                            <p className="text-xs text-blue-600/70 mt-1">
                              PDF only (MAX. 5MB)
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
                      className={`space-y-4 transition-opacity duration-500 ${
                        isParsing
                          ? 'opacity-40 pointer-events-none'
                          : 'opacity-100'
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            required
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                            placeholder="Jane"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                          placeholder="jane@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    {/* Manual Mode Specific Fields */}
                    {method === 'manual' && (
                      <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Attach Resume (Required)
                        </label>
                        <input
                          required
                          type="file"
                          accept=".pdf"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all outline-none"
                        />
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isParsing}
                      className="w-full bg-blue-600 cursor-pointer text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center disabled:bg-blue-400 mt-6 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <>
                            <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                            Sending Application...
                          </>
                        </>
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
