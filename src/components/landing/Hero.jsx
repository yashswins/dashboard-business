'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import DashboardMockup from '@/components/ui/DashboardMockup';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#34C759]/40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34C759]" />
              </span>
              <span className="text-sm text-white/80">Consultations now open. Book yours today.</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-center mb-6">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Weave data into
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#7CC9FF] via-[#7B7CFF] to-[#34C759] bg-clip-text text-transparent">
              structured decisions.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Custom analytics dashboards built specifically for your business.
            Real-time visualizations. Automated reporting. Zero complexity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button href="/#samples" variant="primary" className="text-lg px-10 py-5">
              View Samples
            </Button>
            <Button href="/chat" variant="secondary" className="text-lg px-10 py-5 border-white/30 text-white hover:bg-white/10">
              Start Free Consultation
            </Button>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-6 bg-gradient-to-r from-[#007AFF]/30 via-[#5856D6]/30 to-[#34C759]/30 rounded-3xl blur-2xl opacity-70" />

            <div className="absolute -left-16 top-8 hidden lg:block">
              <div className="glass-card-dark p-2 rounded-2xl shadow-2xl -rotate-3">
                <Image
                  src="/images/ceo-overview-dashboard-example.png"
                  alt="CEO overview dashboard"
                  width={340}
                  height={220}
                  className="rounded-xl object-cover"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>

            <div className="absolute -right-16 top-12 hidden lg:block">
              <div className="glass-card-dark p-2 rounded-2xl shadow-2xl rotate-2">
                <Image
                  src="/images/CMO-dashboard.png"
                  alt="CMO dashboard sample"
                  width={320}
                  height={210}
                  className="rounded-xl object-cover"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>

            <div className="absolute -right-6 -bottom-20 hidden xl:block">
              <div className="glass-card-dark p-2 rounded-2xl shadow-2xl rotate-1">
                <Image
                  src="/images/Cashflow-dashboard-example.png"
                  alt="Cashflow dashboard preview"
                  width={300}
                  height={190}
                  className="rounded-xl object-cover"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <DashboardMockup variant="analytics" />
            </div>

            <div className="absolute -left-4 top-1/4 transform -translate-x-full hidden xl:block">
              <div className="glass-card-dark px-4 py-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#007AFF]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#7CC9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Real-time</p>
                    <p className="text-white/50 text-xs">Live data sync</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-1/3 transform translate-x-full hidden xl:block">
              <div className="glass-card-dark px-4 py-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#34C759]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#34C759]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">99.9% Uptime</p>
                    <p className="text-white/50 text-xs">Enterprise reliability</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 transform translate-x-full hidden xl:block">
              <div className="glass-card-dark px-4 py-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FF9500]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#FFB86C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Secure</p>
                    <p className="text-white/50 text-xs">SOC 2 compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="glass-card-dark px-6 py-4 rounded-2xl text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Average build</p>
              <p className="text-2xl font-semibold text-white">14 days</p>
            </div>
            <div className="glass-card-dark px-6 py-4 rounded-2xl text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Data sources</p>
              <p className="text-2xl font-semibold text-white">40+ integrations</p>
            </div>
            <div className="glass-card-dark px-6 py-4 rounded-2xl text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Decision speed</p>
              <p className="text-2xl font-semibold text-white">3x faster</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
