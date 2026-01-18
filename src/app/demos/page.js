import DemosClient from '@/app/demos/DemosClient';
import { getSampleData } from '@/lib/sampleData';

export const metadata = {
  title: 'Dashboard Demos',
  description: 'Explore interactive dashboard demos for Retail, Finance, Marketing, and Operations. See how custom analytics dashboards can transform your business data.',
};

export default async function DemosPage() {
  const data = await getSampleData();
  return <DemosClient initialData={data} />;
}
