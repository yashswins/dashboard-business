import GlassCard from '@/components/ui/GlassCard';

const values = [
  {
    accent: 'from-[#7CC9FF] to-[#34C759]',
    title: "Tailored to Your Data",
    description: "Work with any data source, from spreadsheets to live databases"
  },
  {
    accent: 'from-[#5AE0C1] to-[#7B7CFF]',
    title: "Interactive & Real-time",
    description: "Built with modern visualization technology for instant insights"
  },
  {
    accent: 'from-[#FFB86C] to-[#7CC9FF]',
    title: "Automated Insights",
    description: "Smart analytics that save you time and surface what matters"
  }
];

export default function ValueProps() {
  return (
    <section id="value" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 text-xs uppercase tracking-[0.3em] mb-5">
            Built for clarity
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            A smarter way to see your business
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Every dashboard is engineered to highlight what matters most, with a polished,
            executive-ready finish that aligns with your brand.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <GlassCard key={idx} tone="dark" className="text-center p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
              <div className="relative">
                <div className="flex items-center justify-center mb-6">
                  <span className={`h-1 w-12 rounded-full bg-gradient-to-r ${value.accent}`} />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
