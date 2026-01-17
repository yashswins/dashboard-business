import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, body }) {
  // If no API key configured, fall back to console logging
  if (!process.env.RESEND_API_KEY) {
    console.log('--- EMAIL NOTIFICATION (no RESEND_API_KEY configured) ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('--- END EMAIL ---');
    return { success: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Dashboard Inquiries <onboarding@resend.dev>',
      to: to || process.env.BUSINESS_EMAIL,
      subject: subject,
      text: body,
      html: body.replace(/\n/g, '<br>')
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
}
