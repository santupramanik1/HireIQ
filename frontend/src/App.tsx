import { Route, Routes } from "react-router-dom";
import LayoutPage from "./app/LayoutPage";
import LoginModel from "./components/auth/LoginModel";
import DashboardPage from "./pages/DashboardPage";
import GoogleLoginPage from "./components/auth/GoogleLoginPage";


export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />} />
      <Route path="/login" element={<LoginModel />} />
      <Route path="/auth/google" element={<GoogleLoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};
