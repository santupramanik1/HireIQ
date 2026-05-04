'use client';
import { Mic } from 'lucide-react';
import { GoogleIcon } from '../icon/GoogleIcon';
import { google_login } from '../../utils/googleAuth';

export default function LoginModel() {
  return (
    // Changed absolute positioning to drop down from the parent container
    <div className="absolute top-[calc(100%+12px)] md:right-0 md:left-auto left-1/2 md:translate-x-0 -translate-x-1/2 z-50 w-[320px] max-w-[90vw] bg-white border border-gray-200 p-8 shadow-2xl rounded-2xl">
      {/* Subtle Top Inner Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      {/* Logo Integration */}
      <div className="flex flex-col items-center mb-3">
        <a
          href="/"
          className="flex items-center gap-2.5 no-underline mb-3 group"
        >
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#6c63ff] to-[#9b59b6] flex items-center justify-center shadow-[0_0_20px_rgba(108,99,255,0.4)] group-hover:shadow-[0_0_25px_rgba(108,99,255,0.6)] transition-all duration-300">
            <Mic size={22} className="text-white" />
          </div>
          <span className="font-['Syne',sans-serif] font-extrabold text-xl text-gray-900 tracking-tight">
            HireIQ<span className="text-[#6c63ff]">AI</span>
          </span>
        </a>

        <h1 className="font-['Syne',sans-serif] text-xl font-extrabold text-gray-900 tracking-tight mb-1">
          Welcome back
        </h1>
        <p className="text-gray-500 text-sm text-center">
          Sign in to continue to your dashboard
        </p>
      </div>

      {/* Auth Button */}
      <button
        onClick={google_login}
        className="flex items-center justify-center gap-3 w-full py-4 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium group relative overflow-hidden shadow-sm mt-4"
      >
        {/* Hover gradient effect inside button */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#6c63ff]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

        <GoogleIcon />
        <span className="text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors cursor-pointer">
          Continue with Google
        </span>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-4">
        <div className="h-px bg-gray-200 flex-1" />
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          Secure Login
        </span>
        <div className="h-px bg-gray-200 flex-1" />
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center gap-1.5 text-[12px] text-gray-400">
        <span>Secured by</span>
        <span className="font-medium text-gray-500">HireIQ</span>
      </div>
    </div>
  );
}
