"use client";

export default function GlobalStyles() {
  return (
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
      @keyframes wave {
        0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
        50% { transform: scaleY(1); opacity: 1; }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 15px rgba(108,99,255,0.2); }
        50% { box-shadow: 0 0 30px rgba(108,99,255,0.6); }
      }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-wave { animation: wave 1.2s ease-in-out infinite; }
      .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      .shimmer-text {
        background: linear-gradient(90deg, #fff 0%, #a78bfa 50%, #fff 100%);
        background-size: 200% auto;
        color: transparent;
        -webkit-background-clip: text;
        animation: shimmer 3s linear infinite;
      }
      @keyframes shimmer { to { background-position: 200% center; } }
    `}</style>
  );
}