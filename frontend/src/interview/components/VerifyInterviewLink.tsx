// src/pages/VerifyInterviewLink.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function VerifyInterviewLink() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  // Track the status and the specific error message
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage(
          'No secure token was found in this link. Please check your email and try again.'
        );
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/interviews/verify-magic-link?token=${token}`
        );
        const { data, success } = response.data;

        if (success) {
          navigate(`/start-interview/${data.interviewId}`);
        }
      } catch (error: any) {
        setStatus('error');
        const message =
          error.response?.data?.message ||
          'This interview link is invalid or has expired.';
        setErrorMessage(message);
      }
    };

    verifyToken();
  }, [token, navigate]);

  // ==========================================
  // ERROR STATE UI
  // ==========================================
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 font-class">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          {/* Red warning icon (SVG) */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Link Invalid or Expired
          </h2>

          <p className="text-gray-600 mb-8">
            {errorMessage} <br className="mt-2" />
            For security reasons, interview links expire after a certain period
            or after their first use. Please contact your recruiter to request a
            new one.
          </p>

          <Link
            to="/"
            className="inline-flex justify-center items-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // LOADING STATE UI
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="flex flex-col items-center">
        {/* Animated spinner */}
        <svg
          className="animate-spin h-10 w-10 text-blue-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-lg font-medium text-gray-900">
          Verifying your secure link...
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Please wait a moment while we set up your session.
        </p>
      </div>
    </div>
  );
}
