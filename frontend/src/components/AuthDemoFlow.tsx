"use client";

import React, { useState } from "react";

// --- SVGs ---
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

const GearIcon = () =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-neutral-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.094c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.524a1.125 1.125 0 011.593.26l1.094 1.894a1.125 1.125 0 01-.26 1.593l-.737.524a1.125 1.125 0 01-1.205.108 1.125 1.125 0 01-.78-.93l-.149-.894a1.125 1.125 0 00-1.11-.94h-1.094a1.125 1.125 0 00-1.11.94l-.149.894a1.125 1.125 0 01-.78.93 1.125 1.125 0 01-1.205-.108l-.737-.524a1.125 1.125 0 00-1.593.26L5.343 7.694a1.125 1.125 0 00.26 1.593l.737.524a1.125 1.125 0 001.205-.108 1.125 1.125 0 00.78-.93l.149-.894"
    />
  </svg>;

const LogOutIcon = () =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-neutral-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
    />
  </svg>;

const ClerkLogoText = () =>
  <div className="flex items-center gap-1 font-sans font-bold text-[15px] text-neutral-800 tracking-tight">
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18 6a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
      <path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
        opacity="0.3"
      />
    </svg>
    clerk
  </div>;

// --- Main Component ---
export default function AuthDemoFlow() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center p-6 font-sans">
      {/* This ternary operator switches between the Login Card 
        and the Profile Card based on the 'isLoggedIn' state.
      */}
      {!isLoggedIn
        ? /* ------------------------- */
          /* STATE 1: SIGN IN CARD     */
          /* ------------------------- */
          <div className="w-[400px] bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-8 pb-6 text-center">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">
                Sign in
              </h2>
              <p className="text-sm text-neutral-500 mb-8">
                to continue to your application
              </p>

              <button
                onClick={() => setIsLoggedIn(true)}
                className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 shadow-sm transition-all text-[15px] font-medium text-neutral-700"
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 bg-[#fafafa] border-t border-neutral-100 flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 text-[13px] text-neutral-500 font-medium">
                <span>Secured by</span>
                <ClerkLogoText />
              </div>
            </div>
          </div>
        : /* ------------------------- */
          /* STATE 2: PROFILE DROPDOWN */
          /* ------------------------- */
          <div className="w-[360px] bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden">
            {/* User Info Section */}
            <div className="flex items-center gap-4 p-6 border-b border-neutral-100">
              <div className="w-12 h-12 rounded-full bg-[#115e41] flex items-center justify-center shrink-0">
                <span className="text-white text-xl font-medium">S</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] font-semibold text-neutral-900 leading-snug">
                  Saloni Avhad
                </h3>
                <p className="text-[13px] text-neutral-500">
                  gameplayapp007@gmail.com
                </p>
              </div>
            </div>

            {/* Action Options */}
            <div className="py-2">
              <button className="flex items-center gap-3 w-full px-6 py-3.5 text-left group transition-colors hover:bg-neutral-50">
                <GearIcon />
                <span className="text-[14px] font-medium text-neutral-700">
                  Manage account
                </span>
              </button>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-3 w-full px-6 py-3.5 text-left border-t border-neutral-100 group transition-colors hover:bg-neutral-50"
              >
                <LogOutIcon />
                <span className="text-[14px] font-medium text-neutral-700">
                  Sign out
                </span>
              </button>
            </div>

            {/* Footer */}
            <div className="py-4 bg-[#fafafa] border-t border-neutral-100 flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1.5 text-[13px] text-neutral-500 font-medium">
                <span>Secured by</span>
                <ClerkLogoText />
              </div>
              <p className="text-[13px] font-semibold text-orange-500">
                Development mode
              </p>
            </div>
          </div>}
    </div>
  );
}
