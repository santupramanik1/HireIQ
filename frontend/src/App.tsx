import { Route, Routes } from "react-router-dom";
import LayoutPage from "./app/LayoutPage";
import DashboardPage from "./pages/DashboardPage";
import GoogleLoginPage from "./components/auth/GoogleLoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <> 
    <Toaster position="top-right"></Toaster>
    <Routes>
      {/* Anyone can see the landing page, logged in or not */}
      <Route path="/" element={<LayoutPage />} />

      {/* --- PUBLIC ROUTES --- */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LayoutPage/>} />
        <Route path="/auth/google" element={<GoogleLoginPage />} />
      </Route>

      {/* --- PROTECTED ROUTES --- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
    </>
    
  );
};
