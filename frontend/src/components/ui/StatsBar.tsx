'use client';

export default function StatsBar() {
  const stats = [
    { value: '100%', label: 'Automated Resume Grading' },
    { value: '24/7', label: 'AI Voice Screening' },
    { value: '100%', label: 'Dynamic Performance Analytics' },
    { value: 'Instant', label: 'AI Candidate Evaluation' },
  ];

  return (
    <section className="border-y border-white/5 py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6c63ff]/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-class">
                {stat.value}
              </div>
              <div className="text-white/45 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
