'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import GlassCard from '@/components/ui/GlassCard';
import RetailDashboard from '@/components/dashboards/RetailDashboard';
import FinanceDashboard from '@/components/dashboards/FinanceDashboard';
import OperationsDashboard from '@/components/dashboards/OperationsDashboard';
import MarketingDashboard from '@/components/dashboards/MarketingDashboard';
import { prefetchCsv } from '@/lib/useCsvData';
import { prefetchPlotly } from '@/components/charts/PlotlyChart';

export default function DemoShowcaseClient({ initialData }) {
  const [activeTab, setActiveTab] = useState('retail');

  useEffect(() => {
    prefetchPlotly();
    prefetchCsv('/sample-data/sample_retail.csv');
    prefetchCsv('/sample-data/sample_finance.csv');
    prefetchCsv('/sample-data/sample_operations.csv');
    prefetchCsv('/sample-data/sample_marketing.csv');
  }, []);

  const demos = {
    retail: <RetailDashboard initialRows={initialData?.retail} />,
    finance: <FinanceDashboard initialRows={initialData?.finance} />,
    operations: <OperationsDashboard initialRows={initialData?.operations} />,
    marketing: <MarketingDashboard initialRows={initialData?.marketing} />
  };

  return (
    <section id="samples" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 text-xs uppercase tracking-[0.3em] mb-5">
            Interactive
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Interactive Dashboards</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Explore live dashboards and switch between industries to see how the data comes to life.
            The gallery below highlights recent builds at a glance.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
            <Tabs
              tabs={['Retail', 'Finance', 'Operations', 'Marketing']}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className="mt-8">
              <GlassCard tone="dark" className="relative overflow-hidden p-6 md:p-8">
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <Image
                    src="/images/Sales-YTD-dashboard-example-1efebb.png"
                    alt=""
                    fill
                    className="object-cover blur-xl scale-110"
                    sizes="100vw"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0f0f23]/80 via-[#0f0f23]/70 to-[#0f0f23]/40" />
                <div className="relative">
                  {demos[activeTab]}
                </div>
              </GlassCard>
            </div>
        </div>

        <div className="mt-12">
          <div className="text-center">
            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/60">Sample Gallery</p>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">
              Static snapshots for quick scanning, each tailored to a different executive view.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3 auto-rows-[200px] md:auto-rows-[240px]">
            {[
              { src: '/images/ceo-overview-dashboard-example.png', label: 'Executive Overview', span: 'lg:col-span-2 lg:row-span-2' },
              { src: '/images/sales%20dashboard.png', label: 'Sales Command' },
              { src: '/images/Sales-YTD-dashboard-example-1efebb.png', label: 'Sales YTD Snapshot', span: '' }
            ].map((item) => (
              <div
                key={item.src}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ${item.span || ''}`}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-white/70 uppercase tracking-[0.3em]">Sample</p>
                  <p className="text-lg font-semibold text-white">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { src: '/images/operations.png', label: 'Operations Command Center' },
              { src: '/images/CMO-dashboard.png', label: 'Marketing Performance Suite' },
              { src: '/images/sales_2.png', label: 'Revenue Pulse' }
            ].map((item) => (
              <div key={item.src} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="relative h-36 md:h-44 w-full">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs text-white/70 uppercase tracking-[0.25em]">Preview</p>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
