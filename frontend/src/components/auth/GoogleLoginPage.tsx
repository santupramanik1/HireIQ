import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function GoogleLogin() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  
  // 1. Manually manage loading and error states (replacing Apollo)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 2. Prevent React Strict Mode from firing the API call twice
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const loginWithGoogle = async () => {
      if (!code || hasCalledAPI.current) return;
      
      hasCalledAPI.current = true;
      setIsLoading(true);
      setErrorMessage(null);

      try {
        // 3. Make the REST API POST request
        // Ensure you include withCredentials if your backend sets HttpOnly cookies
        const response = await axios.post(
          "http://localhost:5000/api/auth/google/login", 
          { code },
          { withCredentials: true } 
        );

        const result = response.data;

        console.log(result)

        if (result.success) {
          const userData = result.data;
          console.log("userdata",userData)
          console.log(userData.email);
          
          // 4. Save to localStorage before navigating
          if (userData) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                email: userData.user.email,
                role: userData.role,
              }),
            );
          }
          
          // Route based on role
          if (userData?.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          // Capture the specific REST validation message
          setErrorMessage(result.message || "Authentication failed.");
        }
      } catch (err: any) {
        // Handle network errors or HTTP 4xx/5xx responses from the backend
        const serverError = err.response?.data?.message || err.message || "Network error occurred";
        setErrorMessage(serverError);
      } finally {
        setIsLoading(false);
      }
    };

    loginWithGoogle();
  }, [code, navigate]);

  // --- The UI remains exactly the same ---

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background font-body">
        {/* Themed SVG Spinner */}
        <svg className="w-14 h-14 animate-spin" viewBox="0 0 50 50">
          <circle
            className="stroke-surface-container-highest"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
          />

          <circle
            className="stroke-primary"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            strokeDasharray="30 100"
            strokeLinecap="round"
          />
        </svg>

        <h2 className="mt-6 text-xl font-headline text-on-surface">
          Authenticating...
        </h2>
        <p className="mt-2 text-on-surface-variant">
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-white px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Auth Callback</h1>
      <p className="mt-2 text-gray-500">Processing code...</p>
    </div>
  );
}