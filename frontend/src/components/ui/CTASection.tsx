"use client";

import { Sparkles, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <div className="rounded-[28px] p-10 md:p-[72px_60px] text-center relative overflow-hidden bg-gradient-to-br from-[#6c63ff]/15 via-[#a78bfa]/10 to-[#6c63ff]/10 border border-[#6c63ff]/25 shadow-2xl">
          <div className="absolute -top-24 -left-24 w-[350px] h-[350px] rounded-full bg-[#6c63ff]/20 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] rounded-full bg-[#a78bfa]/15 blur-[60px] pointer-events-none" />
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#9b59b6] flex items-center justify-center mx-auto mb-6 shadow-[0_0_24px_rgba(108,99,255,0.5)] relative z-10">
            <Sparkles size={24} className="text-white" />
          </div>
          <h2 className="font-['Syne',sans-serif] text-[clamp(2rem,5vw,3.2rem)] font-extrabold tracking-tight text-white leading-[1.15] mb-5 relative z-10">
            Ready to transform <br className="hidden sm:block" /><span className="shimmer-text">your hiring?</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10 relative z-10">
            Join 500+ recruiting teams using VoiceRecruit AI to screen candidates faster, reduce bias, and hire the best talent — all on autopilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-7 relative z-10">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#6c63ff] hover:bg-[#5b54e6] text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button className="w-full sm:w-auto px-7 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}