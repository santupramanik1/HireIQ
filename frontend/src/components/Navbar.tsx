"use client";
import  { useState, useEffect } from "react";
import { Mic, Menu, X } from "lucide-react"; // Only imported what Navbar needs

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);



  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        scrolled
          ? "bg-[#05070f]/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#6c63ff] to-[#9b59b6] flex items-center justify-center shadow-[0_0_16px_rgba(108,99,255,0.5)]">
            <Mic size={18} className="text-white" />
          </div>
          <span className="font-['Syne',sans-serif] font-extrabold text-[1.1rem] text-white tracking-tight">
            VoiceRecruit<span className="text-[#a78bfa]">AI</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden md:block text-white/65 hover:text-white text-sm font-medium transition-colors"
          >
            Sign in
          </a>
          <button className="hidden md:flex bg-[#6c63ff] hover:bg-[#5b54e6] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors items-center gap-2">
            Start Free Trial
          </button>
          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#05070f]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white text-base font-medium py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <button className="bg-[#6c63ff] text-white px-5 py-3 rounded-xl text-base font-medium w-full text-center">
            Start Free Trial
          </button>
        </div>
      )}
    </nav>
  );
}