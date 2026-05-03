import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function GoogleLogin() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  // 1. Manually manage loading and error states (replacing Apollo)
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth();

  // 2. Prevent React Strict Mode from firing the API call twice
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const loginWithGoogle = async () => {
      if (!code || hasCalledAPI.current) return;

      hasCalledAPI.current = true;
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/google/login`,
          { code },
          { withCredentials: true }
        );

        const result = response.data;

        console.log(result);

        if (result.success) {
          const userData = result.data;
          toast.success(result.data.message || "Login is Successfull");

          //  Save to localStorage before navigating
          if (userData) {
            login({
              firstname: userData.user.firstname,
              lastname: userData.user.lastname,
              email: userData.user.email,
              role: userData.role,
              profilePicture: userData.user.profilePicture
            });
          }

          // Route based on role
          if (userData?.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          setErrorMessage(result.message || "Authentication failed.");
        }
      } catch (err: any) {
        // Handle network errors or HTTP 4xx/5xx responses from the backend
        const serverError =
          err.response?.data?.message ||
          err.message ||
          "Network error occurred";
        setErrorMessage(serverError);
        toast.error(serverError);
      } finally {
        setIsLoading(false);
      }
    };

    loginWithGoogle();
  }, [code, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white font-sans">
        {/* 3. FIXED SVG COLORS: Replaced custom variables with standard Tailwind colors */}
        <svg className="w-14 h-14 animate-spin" viewBox="0 0 50 50">
          {/* Background track of the spinner */}
          <circle
            className="stroke-slate-200"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
          />
          {/* Animated spinning part */}
          <circle
            className="stroke-blue-600"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            strokeDasharray="30 100"
            strokeLinecap="round"
          />
        </svg>

        <h2 className="mt-6 text-xl font-bold text-slate-900">
          Authenticating...
        </h2>
        <p className="mt-2 text-slate-500">
          Please wait while we log you securely in.
        </p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-white px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Authentication Error
        </h1>
        <p className="mt-2 text-gray-600">
          Something went wrong. Please try logging in again:{" "}
          <span className="font-semibold">{errorMessage}</span>
        </p>
      </div>
    );
  }

  return null;
}
