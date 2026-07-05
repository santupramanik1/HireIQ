import { Route, Routes } from 'react-router-dom';
import LayoutPage from './app/LayoutPage';

import GoogleLoginPage from './components/auth/GoogleLoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './pages/DashboardLayoutPage';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import ApplyJobPage from './pages/ApplyJobPage';
import CandidateTable from './pages/CandidatesPage';
import CandidateInfo from './pages/CandidateInfoPage';
import SchedulesPage from './pages/SchedulesPage';
import StartInterviewPage from './interview/pages/StartInterviewPage';
import InterviewCompletePage from './interview/pages/InterviewCompletePage';
import ActiveInterviewRoom from './interview/components/ActiveInterviewRoom';
import VerifyInterviewLink from './interview/components/VerifyInterviewLink';
import GenerateQuestionsPage from './pages/GenerateQuestionsPage';

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
                <DashboardPage />
              }
            />
            <Route path="jobs" element={<JobsPage />} />

            {/* Placeholders for your future pages */}
            <Route path="candidates" element={<CandidateTable />} />
            <Route path="candidate-info/:id" element={<CandidateInfo />} />
            <Route path="schedules" element={<SchedulesPage></SchedulesPage>} />
            <Route
              path="settings"
              element={<GenerateQuestionsPage></GenerateQuestionsPage>}
            />
          </Route>
        </Route>

        <Route path="/interview/verify" element={<VerifyInterviewLink />} />

        {/* <Route path="/start-interview" element={<StartInterviewPage />} /> */}
        <Route
          path="/start-interview/:interviewId"
          element={<StartInterviewPage />}
        />
        <Route path="/complete-interview" element={<InterviewCompletePage />} />
        <Route
          path="/interview/room/:interviewId"
          element={<ActiveInterviewRoom />}
        />
      </Routes>
    </>
  );
};
