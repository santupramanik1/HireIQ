// import { useEffect, useState } from "react";
// import { JobCard, jobs } from "../components/job/JobCard";
// import CreateJobModal from "../components/job/CreateJobModal";
// import { useAuth } from "../context/AuthContext";

// // ==========================================
// // TYPES & INTERFACES
// // ==========================================

// interface NavItem {
//   icon: string;
//   label: string;
//   active?: boolean;
// }

// interface MetricCard {
//   title: string;
//   value: number;
//   icon: string;
//   colorClass: string;
//   bgClass: string;
// }

// // ==========================================
// // MOCK DATA
// // ==========================================

// const navItems: NavItem[] = [
//   { icon: "home", label: "Home", active: true },
//   { icon: "work", label: "Jobs" },
//   { icon: "group", label: "Candidates" },
//   { icon: "calendar_today", label: "Schedules" },
//   { icon: "settings", label: "Settings" }
// ];

// const metrics: MetricCard[] = [
//   {
//     title: "Total Jobs",
//     value: 7,
//     icon: "assignment",
//     colorClass: "text-blue-600",
//     bgClass: "bg-blue-50"
//   },
//   {
//     title: "Active",
//     value: 5,
//     icon: "check_circle",
//     colorClass: "text-emerald-600",
//     bgClass: "bg-emerald-50"
//   },
//   {
//     title: "Drafts",
//     value: 2,
//     icon: "edit_note",
//     colorClass: "text-amber-600",
//     bgClass: "bg-amber-50"
//   },
//   {
//     title: "Expired",
//     value: 0,
//     icon: "history",
//     colorClass: "text-slate-500",
//     bgClass: "bg-slate-100"
//   }
// ];

// export default function DashboardPage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

//   // Get user profile details form the auth context
//   const { user,logout } = useAuth();
//   const firstname = user?.firstname;
//   const lastname = user?.lastname;
//   const profilePicture = user?.profilePicture;

//   // Prevent to scroll the page if the sidebar is opened
//   useEffect(() => {
//     if (isSidebarOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isSidebarOpen]);

//   return (
//     <div className="min-h-screen bg-slate-100 text-slate-900 font-class">
//       <CreateJobModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//       />
//       {/* Mobile Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Responsive Sidebar */}
//       <aside
//         className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 shadow-sm py-8 px-4 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="mb-10 px-4 flex justify-between items-center">
//           <div className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
//             <span className="material-symbols-outlined text-blue-600">
//               architecture
//             </span>
//             HireIQ
//           </div>
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="lg:hidden text-slate-500 hover:text-slate-900"
//           >
//             <span className="material-symbols-outlined">close</span>
//           </button>
//         </div>

//         <nav className="flex-1 space-y-2">
//           {navItems.map((item) => (
//             <a
//               key={item.label}
//               href="#"
//               className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//                 item.active
//                   ? "bg-blue-50 text-blue-700 font-semibold"
//                   : "text-slate-600 hover:text-blue-600 hover:bg-slate-50 font-medium"
//               }`}
//             >
//               <span className="material-symbols-outlined">{item.icon}</span>
//               <span>{item.label}</span>
//             </a>
//           ))}
//         </nav>

//         {/* --- USER PROFILE & LOGOUT --- */}
//         <div className="mt-auto space-y-4">
//           <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 group">
//             {/* Left Side: Avatar and Info */}
//             <div className="flex items-center gap-3 overflow-hidden">
//               {profilePicture ? (
//                 <img
//                   src={profilePicture}
//                   alt={`${firstname} profile`}
//                   referrerPolicy="no-referrer"
//                   className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold uppercase shrink-0">
//                   {firstname?.charAt(0) || "U"}
//                 </div>
//               )}

//               <div className="overflow-hidden">
//                 <p className="text-sm font-bold truncate text-slate-900">
//                   {firstname || "New"} {lastname || "User"}
//                 </p>
//                 <p className="text-xs text-slate-500 capitalize">
//                   {user?.role || "Recruiter"}
//                 </p>
//               </div>
//             </div>

//             {/* Right Side: Logout Button */}
//             <button
//               onClick={() => {
//                  logout();
//               }}
//               title="Logout"
//               className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center cursor-pointer shrink-0"
//             >
//               <span className="material-symbols-outlined text-xl">logout</span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Top Navigation */}
//       <header className="sticky top-0 w-full z-30 bg-white border-b border-slate-200 shadow-sm lg:pl-64">
//         <div className="flex justify-between items-center px-4 sm:px-8 py-4 w-full">
//           <div className="flex items-center gap-4 flex-1">
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 transition-colors"
//             >
//               <span className="material-symbols-outlined text-2xl">menu</span>
//             </button>
//             <div className="relative w-full max-w-md hidden md:block">
//               <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
//                 search
//               </span>
//               <input
//                 className="w-full bg-slate-100 border-transparent rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all placeholder-slate-500"
//                 placeholder="Search jobs or candidates..."
//                 type="text"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-3 sm:gap-4">
//             <button className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 flex items-center justify-center">
//               <span className="material-symbols-outlined">notifications</span>
//             </button>
//             <button
//               onClick={() => setIsCreateModalOpen(true)}
//               className="flex cursor-pointer items-center gap-2 bg-[#4647D3] text-white px-5 sm:px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#4647D5] hover:shadow-md transition-all active:scale-95"
//             >
//               <span className="material-symbols-outlined text-xl">add</span>
//               <span className="hidden sm:inline">Create Job</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="lg:pl-64 pb-12 pt-8 font-class">
//         <div className="max-w-7xl mx-auto px-4 sm:px-8">
//           {/* Header Section */}
//           <section className="mb-10">
//             <h1 className="text-sm sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
//               Manage open positions
//             </h1>
//             <p className=" sm:text-lg text-slate-500 max-w-2xl">
//               Use AI to find the best candidates effortlessly with our curated
//               matching engine.
//             </p>
//           </section>

//           {/* Metrics Grid */}
//           <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
//             {metrics.map((metric, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white p-5 sm:p-6 rounded-xl flex flex-col gap-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div
//                   className={`w-12 h-12 rounded-2xl flex items-center justify-center ${metric.bgClass} ${metric.colorClass}`}
//                 >
//                   <span className="material-symbols-outlined">
//                     {metric.icon}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-slate-500 text-sm font-medium mb-1">
//                     {metric.title}
//                   </p>
//                   <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
//                     {metric.value}
//                   </h3>
//                 </div>
//               </div>
//             ))}
//           </section>

//           {/* List Header */}
//           <div className="flex justify-between items-end mb-6">
//             <div>
//               <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
//                 Showing {jobs.length} jobs
//               </h2>
//               <p className="text-slate-500 text-sm mt-1">
//                 Sort by:{" "}
//                 <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
//                   Recently Created
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* Job Cards Grid */}
//           <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {jobs.map((job) => (
//               <JobCard
//                 key={job.id}
//                 status={job.status}
//                 title={job.title}
//                 schedule={job.schedule}
//                 level={job.level}
//                 salary={job.salary}
//                 matchCount={job.matchCount}
//               />
//             ))}
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import CreateJobModal from "../components/job/CreateJobModal";
import { useAuth } from "../context/AuthContext";

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface NavItem {
  icon: string;
  label: string;
  path: string; // Changed from 'active' to 'path' for routing
}

// ==========================================
// NAV DATA
// ==========================================

const navItems: NavItem[] = [
  { icon: "home", label: "Home", path: "/dashboard" },
  { icon: "work", label: "Jobs", path: "/dashboard/jobs" },
  { icon: "group", label: "Candidates", path: "/dashboard/candidates" },
  { icon: "calendar_today", label: "Schedules", path: "/dashboard/schedules" },
  { icon: "settings", label: "Settings", path: "/dashboard/settings" }
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const location = useLocation();

  // Get user profile details form the auth context
  const { user, logout } = useAuth();
  const firstname = user?.firstname;
  const lastname = user?.lastname;
  const profilePicture = user?.profilePicture;

  // Auto-close sidebar on mobile when navigating to a new page
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Prevent to scroll the page if the sidebar is opened
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-class">
      <CreateJobModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Responsive Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 shadow-sm py-8 px-4 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-10 px-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600">
              architecture
            </span>
            HireIQ
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-500 hover:text-slate-900"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/dashboard"} // Ensures 'Home' only highlights on exact match
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50 font-medium"
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* --- USER PROFILE & LOGOUT --- */}
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 group">
            {/* Left Side: Avatar and Info */}
            <div className="flex items-center gap-3 overflow-hidden">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={`${firstname} profile`}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold uppercase shrink-0">
                  {firstname?.charAt(0) || "U"}
                </div>
              )}

              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-slate-900">
                  {firstname || "New"} {lastname || "User"}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {user?.role || "Recruiter"}
                </p>
              </div>
            </div>

            {/* Right Side: Logout Button */}
            <button
              onClick={() => {
                logout();
              }}
              title="Logout"
              className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Top Navigation */}
      <header className="sticky top-0 w-full z-30 bg-white border-b border-slate-200 shadow-sm lg:pl-64">
        <div className="flex justify-between items-center px-4 sm:px-8 py-4 w-full">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="relative w-full max-w-md hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                className="w-full bg-slate-100 border-transparent rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all placeholder-slate-500"
                placeholder="Search jobs or candidates..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 bg-[#4647D3] text-white px-5 sm:px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#4647D5] hover:shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">add</span>
              <span className="hidden sm:inline">Create Job</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Outlet renders the child pages here */}
      <main className="lg:pl-64 pb-12 pt-8 font-class">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
