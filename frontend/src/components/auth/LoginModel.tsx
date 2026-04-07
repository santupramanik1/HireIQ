"use client";

import { Mic } from "lucide-react";

// Standard Google SVG Logo
const GoogleIcon = () =>
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>;

export default function LoginModel() {
  return (
    <div className="min-h-screen bg-[#05070f] flex items-center justify-center p-6 font-sans relative overflow-hidden selection:bg-[#6c63ff]/30 selection:text-white">
      {/* Background Ambient Orbs matching the landing page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-[120%] -translate-y-1/2 w-125 h-125 rounded-full bg-[#6c63ff]/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 translate-x-[20%] -translate-y-[20%] w-100 h-100 rounded-full bg-[#a78bfa]/10 blur-[80px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_0%,transparent_70%)] pointer-events-none" />

      {/* Glassmorphic Sign In Card */}
      <div className="w-full max-w-105 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[28px] p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Subtle Top Inner Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* Logo Integration */}
        <div className="flex flex-col items-center mb-8">
          <a
            href="/"
            className="flex items-center gap-2.5 no-underline mb-6 group"
          >
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#6c63ff] to-[#9b59b6] flex items-center justify-center shadow-[0_0_20px_rgba(108,99,255,0.4)] group-hover:shadow-[0_0_25px_rgba(108,99,255,0.6)] transition-all duration-300">
              <Mic size={22} className="text-white" />
            </div>
            <span className="font-['Syne',sans-serif] font-extrabold text-xl text-white tracking-tight">
              HireIQ<span className="text-[#a78bfa]">AI</span>
            </span>
          </a>

          <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-white/50 text-sm text-center">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Auth Button */}
        <button className="flex items-center justify-center gap-3 w-full py-4 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-[#6c63ff]/10 hover:border-[#6c63ff]/30 transition-all duration-300 text-white font-medium group relative overflow-hidden">
          {/* Hover gradient effect inside button */}
          <div className="absolute inset-0 bg-linaer-to-r from-transparent via-[#6c63ff]/10 to-transparent translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

          <GoogleIcon />
          <span className="text-[15px] group-hover:text-white text-white/90 transition-colors cursor-pointer">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs text-white/30 font-medium uppercase tracking-wider">
            Secure Login
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-2 text-[13px] text-white/30">
          <span>Secured by</span>
          HireIQ
        </div>
      </div>
    </div>
  );
}
