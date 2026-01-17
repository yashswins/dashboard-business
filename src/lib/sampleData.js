import fs from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';
import { cache } from 'react';

const readCsv = cache(async (filename) => {
  const filePath = path.join(process.cwd(), 'public', 'sample-data', filename);
  const csv = await fs.readFile(filePath, 'utf8');
  const parsed = Papa.parse(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  }).data;
  return parsed || [];
});

export const getSampleData = cache(async () => {
  const [retail, finance, operations, marketing] = await Promise.all([
    readCsv('sample_retail.csv'),
    readCsv('sample_finance.csv'),
    readCsv('sample_operations.csv'),
    readCsv('sample_marketing.csv')
  ]);

  return {
    retail,
    finance,
    operations,
    marketing
  };
});
