import DemosClient from '@/app/demos/DemosClient';
import { getSampleData } from '@/lib/sampleData';

export default async function DemosPage() {
  const data = await getSampleData();
  return <DemosClient initialData={data} />;
}
