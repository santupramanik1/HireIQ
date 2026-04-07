"use client";

import { Upload, Bot, CalendarCheck } from "lucide-react";
import React from "react";

export default function HowItWorks() {
  const steps = [
    { number: "01", icon: Upload, title: "Import Candidates", description: "Upload a CSV, connect your ATS...", color: "#6c63ff", tags: ["CSV Import", "ATS Sync", "Manual Entry"], visual: null },
    { number: "02", icon: Bot, title: "AI Calls Candidates", description: "Your AI voice agent calls each candidate automatically...", color: "#a78bfa", tags: ["Auto Calls", "Follow-ups", "24/7 Available"], visual: null },
    { number: "03", icon: CalendarCheck, title: "Review & Schedule", description: "Get full transcripts, AI-generated scores...", color: "#34d399", tags: ["Transcripts", "Scoring", "Auto-Schedule"], visual: null },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#a78bfa]/5 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-5">
            <span>🔄</span><span className="text-white/80 font-medium">How It Works</span>
          </div>
          <h2 className="font-['Syne',sans-serif] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
            Three steps to transform<br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6c63ff] to-[#a78bfa]">your hiring pipeline</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group">
                <div className="font-['Syne',sans-serif] text-6xl font-extrabold absolute top-4 right-6 leading-none pointer-events-none transition-transform group-hover:scale-110" style={{ color: `${step.color}15` }}>{step.number}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border" style={{ backgroundColor: `${step.color}18`, borderColor: `${step.color}35` }}>
                  <Icon size={24} color={step.color} />
                </div>
                <h3 className="font-['Syne',sans-serif] text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 relative z-10 min-h-[60px]">{step.description}</p>
                <div className="flex flex-wrap gap-2 mt-5 relative z-10">
                  {step.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full border text-[0.7rem] font-semibold" style={{ backgroundColor: `${step.color}12`, borderColor: `${step.color}25`, color: step.color }}>{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}