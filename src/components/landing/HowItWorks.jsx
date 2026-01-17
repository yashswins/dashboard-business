import GlassCard from '@/components/ui/GlassCard';

export default function HowItWorks() {
  const steps = [
    { number: '01', title: 'Tell Us About Your Data', description: 'Share what data you have and what insights you need.' },
    { number: '02', title: 'Get a Custom Proposal', description: 'We analyze your needs and design a tailored dashboard.' },
    { number: '03', title: 'Launch Your Dashboard', description: 'Get your interactive dashboard delivered and deployed.' },
  ];

  return (
    <section id="process" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 text-xs uppercase tracking-[0.3em] mb-5">
            Our process
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">How It Works</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From discovery to delivery, every step is built around speed, clarity, and measurable outcomes.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <GlassCard key={idx} tone="dark" className="p-8 text-left relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
              <div className="relative">
                <div className="text-5xl font-semibold text-white/30 mb-4">{step.number}</div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
