'use client';

import { useEffect, useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import GlassCard from '@/components/ui/GlassCard';
import RetailDashboard from '@/components/dashboards/RetailDashboard';
import FinanceDashboard from '@/components/dashboards/FinanceDashboard';
import OperationsDashboard from '@/components/dashboards/OperationsDashboard';
import MarketingDashboard from '@/components/dashboards/MarketingDashboard';
import { prefetchCsv } from '@/lib/useCsvData';
import { prefetchPlotly } from '@/components/charts/PlotlyChart';

export default function DemosClient({ initialData }) {
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
    <div className="min-h-screen pt-32 pb-16 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0d1b2a]" />
      <div className="absolute -top-32 left-[-10%] w-[620px] h-[620px] bg-[#007AFF] rounded-full blur-[160px] opacity-20" />
      <div className="absolute bottom-0 right-[-5%] w-[520px] h-[520px] bg-[#34C759] rounded-full blur-[160px] opacity-15" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-center mb-6">Dashboard Demos</h1>
        <p className="text-lg text-white/60 text-center mb-12 max-w-2xl mx-auto">
          Explore interactive examples of what we can build for your business.
        </p>

        <Tabs
          tabs={['Retail', 'Finance', 'Operations', 'Marketing']}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-12">
          <GlassCard className="p-8" hover={false} tone="dark">
            {demos[activeTab]}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
