"use client";

import { Mic2, FileSpreadsheet, Calendar, FileText, Globe2, BarChart3, Zap, Shield } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    { icon: Mic2, title: "AI Voice Screening", description: "Human-sounding voice agents conduct structured interviews...", color: "#6c63ff", badge: "Core" },
    { icon: FileSpreadsheet, title: "Candidate Import", description: "CSV upload, ATS integrations, or manual entry...", color: "#a78bfa" },
    { icon: Calendar, title: "Auto Scheduling", description: "Top-scored candidates are auto-scheduled for next rounds...", color: "#34d399" },
    { icon: FileText, title: "Transcripts & Scoring", description: "Full call transcripts with AI-generated scores...", color: "#f59e0b", badge: "Popular" },
    { icon: Globe2, title: "Multi-language Support", description: "Conduct interviews in 30+ languages...", color: "#60a5fa" },
    { icon: BarChart3, title: "Analytics Dashboard", description: "Track pipeline velocity, drop-off rates...", color: "#f472b6" },
    { icon: Zap, title: "Instant Notifications", description: "Get Slack or email alerts...", color: "#fb923c" },
    { icon: Shield, title: "SOC 2 Compliant", description: "Enterprise-grade security with SOC 2 Type II...", color: "#a78bfa", badge: "Enterprise" },
  ];

  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#6c63ff]/10 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-5">
            <span>✨</span><span className="text-white/80 font-medium">Features</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <h2 className="font-['Syne',sans-serif] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-white leading-[1.15] max-w-lg">
              Everything you need to <br className="hidden sm:block"/><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6c63ff] to-[#a78bfa]">hire smarter</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden hover:-translate-y-1 hover:border-[#6c63ff]/40 transition-all duration-300 flex flex-col group">
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#6c63ff]/15 blur-[60px] pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-[#6c63ff]/15 border border-[#6c63ff]/30 flex items-center justify-center mb-6">
              <Mic2 size={26} className="text-[#6c63ff]" />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#6c63ff]/15 border border-[#6c63ff]/30 text-[#a78bfa] text-xs font-bold tracking-widest uppercase mb-4 self-start">Core</div>
            <h3 className="font-['Syne',sans-serif] text-2xl font-extrabold text-white mb-3">AI Voice Screening</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">Human-sounding voice agents conduct structured interviews with follow-up questions, natural turn-taking, and genuine empathy.</p>
          </div>

          {features.slice(1).map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white/5 border border-white/10 rounded-2xl p-7 relative overflow-hidden hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${feature.color}15`, borderColor: `${feature.color}28` }}>
                    <Icon size={20} color={feature.color} />
                  </div>
                  {feature.badge && (
                    <span className="px-2.5 py-1 rounded-full border text-[0.65rem] font-bold tracking-widest uppercase" style={{ backgroundColor: `${feature.color}12`, borderColor: `${feature.color}25`, color: feature.color }}>
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-['Syne',sans-serif] text-[1.05rem] font-bold text-white mb-2 relative z-10">{feature.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed relative z-10">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}