import Hero from '@/components/landing/Hero';
import ValueProps from '@/components/landing/ValueProps';
import DemoShowcase from '@/components/landing/DemoShowcase';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0d1b2a]" />
        <div className="absolute -top-40 left-[-10%] w-[720px] h-[720px] bg-[#007AFF] rounded-full blur-[160px] opacity-25" />
        <div className="absolute top-[10%] right-[-5%] w-[620px] h-[620px] bg-[#5856D6] rounded-full blur-[160px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[20%] w-[720px] h-[720px] bg-[#34C759] rounded-full blur-[180px] opacity-15" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      <Hero />
      <ValueProps />
      <DemoShowcase />
      <HowItWorks />
      <CTASection />
    </div>
  );
}
