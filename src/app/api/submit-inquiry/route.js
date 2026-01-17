import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';

export async function POST(request) {
  const inquiry = await request.json();

  // Validate required fields
  if (!inquiry.name || !inquiry.email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Store in database (or send email for MVP)
  // For MVP, just send email notification
  await sendEmail({
    to: process.env.BUSINESS_EMAIL,
    subject: `New Dashboard Inquiry from ${inquiry.name}`,
    body: `
      Name: ${inquiry.name}
      Email: ${inquiry.email}
      Company: ${inquiry.company || 'Not provided'}
      Industry: ${inquiry.industry || 'Not provided'}
      Message: ${inquiry.message || 'Not provided'}

      Conversation Summary:
      ${inquiry.conversationSummary || 'Not available'}

      Potential Charts:
      ${Array.isArray(inquiry.potentialCharts) && inquiry.potentialCharts.length
        ? inquiry.potentialCharts.map((chart) => `- ${chart}`).join('\n')
        : 'Not available'}
    `
  });

  return NextResponse.json({ success: true });
}
