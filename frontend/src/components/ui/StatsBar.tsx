'use client';

export default function StatsBar() {
  const stats = [
    { value: '10,000+', label: 'Interviews Conducted' },
    { value: '500+', label: 'Recruiters Onboarded' },
    { value: '80%', label: 'Faster Time-to-Hire' },
    { value: '4.9★', label: 'Average Rating' },
  ];
  const companies = ['Stripe', 'Notion', 'Linear', 'Vercel', 'Figma', 'Loom'];

  return (
    <section className="border-y border-white/5 py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6c63ff]/5 auto transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-['Syne',sans-serif]">
                {stat.value}
              </div>
              <div className="text-white/45 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white/25 text-xs font-bold tracking-[0.1em] uppercase mb-8">
            Trusted by teams at
          </p>
          <div className="flex justify-center items-center gap-6 sm:gap-10 flex-wrap opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {companies.map((name) => (
              <span
                key={name}
                className="font-['Syne',sans-serif] font-bold text-lg sm:text-xl text-white tracking-tight cursor-default hover:text-[#a78bfa] transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
