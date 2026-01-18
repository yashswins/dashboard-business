import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';

export async function POST(request) {
  const inquiry = await request.json();

  // Validate required fields
  if (!inquiry.name || !inquiry.email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Build file analysis section for email
  let fileAnalysisSection = 'No sample data uploaded';
  if (inquiry.fileAnalysis) {
    const fa = inquiry.fileAnalysis;
    const parts = [];
    if (fa.rowCount) parts.push(`Rows: ${fa.rowCount}`);
    if (fa.columnCount) parts.push(`Columns: ${fa.columnCount}`);
    if (fa.columns?.length) parts.push(`Column Names: ${fa.columns.join(', ')}`);
    if (fa.summary) parts.push(`Data Summary:\n${JSON.stringify(fa.summary, null, 2)}`);
    if (fa.sampleData?.length) {
      parts.push(`Sample Data (first ${fa.sampleData.length} rows):\n${JSON.stringify(fa.sampleData, null, 2)}`);
    }
    fileAnalysisSection = parts.join('\n');
  }

  // Store in database (or send email for MVP)
  // For MVP, just send email notification
  await sendEmail({
    to: process.env.BUSINESS_EMAIL,
    subject: `New Dashboard Inquiry from ${inquiry.name}`,
    body: `
NEW DASHBOARD INQUIRY
=====================

Contact Information:
- Name: ${inquiry.name}
- Email: ${inquiry.email}
- Company: ${inquiry.company || 'Not provided'}
- Industry: ${inquiry.industry || 'Not provided'}

Client Message:
${inquiry.message || 'No additional message'}

---

CONVERSATION NOTES (Internal):
${inquiry.conversationSummary || 'No conversation recorded'}

---

SUGGESTED CHARTS (AI-Generated):
${Array.isArray(inquiry.potentialCharts) && inquiry.potentialCharts.length
  ? inquiry.potentialCharts.map((chart, i) => `${i + 1}. ${chart}`).join('\n')
  : 'No chart suggestions available'}

---

SAMPLE DATA ANALYSIS:
${fileAnalysisSection}
    `.trim()
  });

  return NextResponse.json({ success: true });
}
