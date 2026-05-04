import React, { useState } from 'react';

type SubmissionMethod = 'upload' | 'manual';

export default function ApplyJobPage() {
  const [method, setMethod] = useState<SubmissionMethod>('upload');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call and background AI processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 font-class">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Job Details */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Senior MERN Stack Developer
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Full-Time</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Remote</span>
              <span className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                $90,000 - $130,000 / year
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              We are looking for an experienced Full Stack Developer to lead the development of our core AI-driven recruitment platform, HireIQ. You will be responsible for architecting robust backend services and creating seamless user experiences.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'System Design'].map((skill) => (
                <span key={skill} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm">
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsibilities</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Architect scalable backend services using Node.js and Express.</li>
              <li>Build responsive and accessible front-end interfaces with React and Tailwind.</li>
              <li>Integrate external LLM APIs for AI-driven candidate screening.</li>
              <li>Design and optimize MongoDB schemas for high performance.</li>
              <li>Mentor junior developers and participate in code reviews.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-5">
          <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-6 sm:p-8 sticky top-8">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600">
                  Our AI is currently reviewing your profile. We will email you the results shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Header & Toggle at the Top */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply Now</h2>
                  <div className="flex bg-gray-100 p-1 rounded-lg mb-2">
                    <button
                      type="button"
                      onClick={() => setMethod('upload')}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${method === 'upload' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      ✨ AI Auto-Fill Resume
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod('manual')}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${method === 'manual' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Fill Manually
                    </button>
                  </div>
                </div>

                {/* Conditional UI based on Tab Selection */}
                {method === 'upload' && (
                  <div className="border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer group mb-6">
                    <svg className="w-8 h-8 text-blue-400 group-hover:text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="text-sm font-semibold text-blue-900">Upload your resume to auto-fill the form</p>
                    <p className="text-xs text-blue-600/70 mt-1">PDF only (MAX. 5MB)</p>
                    <input type="file" accept=".pdf" className="hidden" />
                  </div>
                )}

                {/* Shared Form Fields (Always visible, but conceptually auto-filled in 'upload' mode) */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input required type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="jane@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input required type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                {/* Manual Mode Specific Fields (Resume upload at the bottom) */}
                {method === 'manual' && (
                  <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attach Resume (Required)</label>
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
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center disabled:bg-blue-400 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}