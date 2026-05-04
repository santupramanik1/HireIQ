'use client';

import { Mic } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Product: ['Features', 'How It Works', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
    Resources: [
      'Documentation',
      'API Reference',
      'Status',
      'Support',
      'Community',
    ],
    Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'GDPR'],
  };

  return (
    <footer className="border-t border-white/10 pt-20 pb-10 px-6 relative bg-[#05070f]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[280px_repeat(4,1fr)] gap-12 lg:gap-8 mb-16">
          <div className="lg:pr-8">
            <a href="/" className="flex items-center gap-2.5 no-underline mb-4">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#6c63ff] to-[#9b59b6] flex items-center justify-center">
                <Mic size={18} className="text-white" />
              </div>
              <span className="font-['Syne',sans-serif] font-extrabold text-[1.1rem] text-white tracking-tight">
                HireIQ<span className="text-[#a78bfa]">AI</span>
              </span>
            </a>
            <p className="text-white/35 text-sm leading-relaxed mb-6">
              Automate your candidate screening with AI voice agents. Hire
              faster, smarter.
            </p>
            <div className="flex gap-3">
              {[
                {
                  name: 'Twitter',
                  href: '#',
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  ),
                },
                {
                  name: 'LinkedIn',
                  href: '#',
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
                {
                  name: 'GitHub',
                  href: '#',
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  ),
                },
              ].map(({ svg, href, name }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#a78bfa] hover:bg-[#6c63ff]/20 hover:border-[#6c63ff]/30 transition-all duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-bold tracking-wider mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © 2026 HireIQ AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-white/30 text-xs">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
