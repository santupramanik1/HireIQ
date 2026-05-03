import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust your import path

export default function PublicRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or show your spinner
  }

  // If the user IS logged in, redirect them away from the login page
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
