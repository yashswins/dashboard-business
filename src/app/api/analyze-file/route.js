import { NextResponse } from 'next/server';
import { analyzeDataFile } from '@/lib/file-analyzer';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type and size
    const extension = file.name?.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['csv', 'xlsx', 'xls'];
    if (!extension || !allowedExtensions.includes(extension)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    // Convert to buffer and analyze
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const analysis = await analyzeDataFile(buffer, file.name);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('File analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
