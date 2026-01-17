import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section id="cta" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/sales_2.png"
          alt=""
          fill
          className="object-cover opacity-30 blur-2xl"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f23]/10 via-[#0f0f23]/70 to-[#0f0f23]" />
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="glass-card-dark p-10 md:p-14 rounded-3xl text-center border border-white/10">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
            Ready to Transform Your Data?
          </h2>
          <p className="text-lg text-white/60 mb-10">
            Start a conversation with our AI assistant to explore what we can build for you.
          </p>
          <Button href="/chat" variant="primary" className="px-10 py-4">
            Get Started Free
          </Button>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <span>Design in 48 hours</span>
            <span>Hands-on data modeling</span>
            <span>Dedicated launch team</span>
          </div>
        </div>
      </div>
    </section>
  );
}
