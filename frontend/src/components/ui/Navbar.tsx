"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, Menu, X } from "lucide-react";
import LoginModel from "../auth/LoginModel";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginModelOpen, setLoginModelOpen] = useState(false);

  // For Outside click close the popup model
  const desktopLoginRef = useRef<HTMLDivElement>(null);
  const mobileLoginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // click outside effect
  useEffect(
    () => {
      const handleClickOutside = (event: MouseEvent) => {
        // Check if the click target is outside BOTH the desktop and mobile wrappers
        let isOutside = true;

        // Cast the event target to a DOM Node
        const target = event.target as Node;
        if (
          desktopLoginRef.current &&
          desktopLoginRef.current.contains(target)
        ) {
          isOutside = false;
        }

        if (mobileLoginRef.current && mobileLoginRef.current.contains(target)) {
          isOutside = false;
        }

        // If they clicked outside and the modal is open, close it
        if (isOutside && loginModelOpen) {
          setLoginModelOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup the event listener on unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [loginModelOpen]
  );

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" }
  ];

  // Check user logged-in state
  const {user}=useAuth()
  const navigate=useNavigate()

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${scrolled
        ? "bg-[#05070f]/90 backdrop-blur-md border-b border-white/10 py-3"
        : "bg-transparent border-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-transparent">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#6c63ff] to-[#9b59b6] flex items-center justify-center shadow-[0_0_16px_rgba(108,99,255,0.5)]">
            <Mic size={18} className="text-white" />
          </div>
          <span className="font-['Syne',sans-serif] font-extrabold text-[1.1rem] text-white tracking-tight">
            HireIQ<span className="text-[#a78bfa]">AI</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map(link =>
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          )}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* WRAPPER FOR DESKTOP SIGN IN & MODAL */}
          {user ? (
            // IF LOGGED IN: Show Dashboard Button & Profile Avatar
            <div className="hidden md:flex items-center gap-4">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  referrerPolicy="no-referrer"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/10"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#6c63ff]/20 border border-[#6c63ff]/50 flex items-center justify-center text-[#a78bfa] font-bold uppercase">
                  {user.firstname?.charAt(0) || "U"}
                </div>
              )}
            </div>
          ) : (
            //  IF LOGGED OUT: Show Sign In & Free Trial
            <div className="hidden md:flex items-center gap-4">
              <div ref={desktopLoginRef} className="relative">
                <button
                  onClick={() => setLoginModelOpen(!loginModelOpen)}
                  className="text-white/65 hover:text-white text-sm font-medium transition-colors cursor-pointer py-2 px-2"
                >
                  Sign in
                </button>
                {loginModelOpen && <LoginModel />}
              </div>
            </div>
          )}

          <button onClick={()=>navigate("/dashboard")} className="cursor-pointer hidden md:flex bg-[#6c63ff] hover:bg-[#5b54e6] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors items-center gap-2">
            Dashboard
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 text-white cursor-pointer"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen &&
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#05070f]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map(link =>
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white text-base font-medium py-2"
            >
              {link.label}
            </a>
          )}
          <div className="h-px bg-white/10 my-2" />

        {user ? (
            //  IF LOGGED IN (Mobile): Show Profile Card & Dashboard Link
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    referrerPolicy="no-referrer"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center text-[#a78bfa] font-bold uppercase">
                    {user.firstname?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <p className="text-white font-medium text-sm">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-white/50 text-xs capitalize">{user.role}</p>
                </div>
              </div>
              <a 
                href="/dashboard"
                className="bg-[#6c63ff] hover:bg-[#5b54e6] transition-colors text-white px-5 py-3 rounded-xl text-base font-medium w-full text-center cursor-pointer"
              >
                Go to Dashboard
              </a>
            </div>
          ) : (
            //  IF LOGGED OUT (Mobile): Show Sign In & Free Trial
            <div className="flex flex-col gap-4">
              <div ref={mobileLoginRef} className="relative flex flex-col items-center w-full">
                <button
                  onClick={() => setLoginModelOpen(!loginModelOpen)}
                  className="text-white/70 hover:text-white text-base font-medium py-2 w-full text-center cursor-pointer mb-2"
                >
                  Sign in
                </button>
                {loginModelOpen && <LoginModel />}
              </div>
            </div>
          )}

          <button className="bg-[#6c63ff] hover:bg-[#5b54e6] transition-colors text-white px-5 py-3 rounded-xl text-base font-medium w-full text-center cursor-pointer">
            Start Free Trial
          </button>
        </div>}
    </nav>
  );
}
