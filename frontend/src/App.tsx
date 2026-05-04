import { Route, Routes } from 'react-router-dom';
import LayoutPage from './app/LayoutPage';

import GoogleLoginPage from './components/auth/GoogleLoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './pages/DashboardLayoutPage';
import JobsPage from './pages/JobsPage';
import ApplyJobPage from './pages/ApplyJobPage';

export const App = () => {
  return (
    <>
      <Toaster position="top-right"></Toaster>
      <Routes>
        {/* Anyone can see the landing page, logged in or not */}
        <Route path="/" element={<LayoutPage />} />
        {/* Public Route for candidates */}
        <Route path="/apply/:jobId" element={<ApplyJobPage />} />

        {/* --- PUBLIC ROUTES --- */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LayoutPage />} />
          <Route path="/auth/google" element={<GoogleLoginPage />} />
        </Route>

        {/* --- PROTECTED ROUTES --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              index
              element={
                <div className="p-8 text-2xl font-bold">
                  Dashboard Report Coming Soon!!
                </div>
              }
            />
            <Route path="jobs" element={<JobsPage />} />

            {/* Placeholders for your future pages */}
            <Route
              path="candidates"
              element={
                <div className="p-8 text-2xl font-bold">
                  Candidates Page Coming Soon!
                </div>
              }
            />
            <Route
              path="schedules"
              element={
                <div className="p-8 text-2xl font-bold">
                  Schedules Page Coming Soon!
                </div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="p-8 text-2xl font-bold">
                  Settings Page Coming Soon!
                </div>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
