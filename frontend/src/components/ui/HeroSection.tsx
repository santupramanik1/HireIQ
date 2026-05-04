'use client';

import { Play, ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';

function VoiceWaveVisual() {
  const bars = [
    0.3, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.85, 0.6, 0.3, 0.75, 0.95, 0.5, 0.65, 0.4,
    0.8, 0.55, 0.35, 0.9, 0.7,
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto animate-float">
      <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="rounded-[24px] p-8 sm:p-10 relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl animate-pulse-glow shadow-2xl">
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[#6c63ff]/10 blur-[40px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
          <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">
            Live Screening
          </span>
        </div>
        <div className="flex items-center gap-4 mb-7">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center text-xl shrink-0">
            👩‍💼
          </div>
          <div className="flex-1">
            <div className="font-bold text-base text-white mb-0.5">
              Sarah Chen
            </div>
            <div className="text-white/50 text-xs">
              Senior Product Manager · Applied 2h ago
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center">
            <PhoneCall size={16} className="text-[#a78bfa]" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 h-16 mb-6">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-white/80 animate-wave origin-bottom"
              style={{
                height: `${h * 100}%`,
                animationDelay: `${i * 0.06}s`,
                opacity: 0.6 + h * 0.4,
              }}
            />
          ))}
        </div>
        <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/5">
          <div className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider mb-2">
            AI Agent
          </div>
          <div className="text-white/80 text-sm leading-relaxed">
            "Tell me about your experience leading cross-functional product
            teams..."
          </div>
        </div>
        <div className="flex items-center justify-between p-3.5 bg-[#6c63ff]/10 rounded-xl border border-[#6c63ff]/20">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#a78bfa]" />
            <span className="text-white/70 text-sm">Screening Score</span>
          </div>
          <div className="font-['Syne',sans-serif] font-extrabold text-lg text-[#a78bfa]">
            87 / 100
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute -top-32 -left-48 w-[600px] h-[600px] rounded-full bg-[#6c63ff]/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-24 w-[400px] h-[400px] rounded-full bg-[#a78bfa]/10 blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10 w-full">
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-sm">🎙</span>
            <span className="text-sm text-white/80 font-medium">
              AI-Powered Recruiting
            </span>
          </div>
          <h1 className="font-['Syne',sans-serif] text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-tight text-white mb-6">
            Automate Candidate{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6c63ff] to-[#a78bfa]">
              Screening
            </span>{' '}
            with AI Voice Agents
          </h1>
          <p className="text-lg leading-relaxed text-white/55 mb-10 max-w-lg">
            Import candidates, let your AI voice agent conduct screening calls
            24/7, then review ranked transcripts and auto-schedule top
            performers.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#6c63ff] hover:bg-[#5b54e6] text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all flex items-center justify-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#6c63ff]/30 flex items-center justify-center">
                <Play size={10} className="fill-white text-white ml-0.5" />
              </div>
              Watch Demo
            </button>
          </div>
        </div>
        <div className="order-first lg:order-last w-full px-4 sm:px-0">
          <VoiceWaveVisual />
        </div>
      </div>
    </section>
  );
}
