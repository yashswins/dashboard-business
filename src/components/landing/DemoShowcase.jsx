import DemoShowcaseClient from '@/components/landing/DemoShowcaseClient';
import { getSampleData } from '@/lib/sampleData';

export default async function DemoShowcase() {
  const data = await getSampleData();
  return <DemoShowcaseClient initialData={data} />;
}
