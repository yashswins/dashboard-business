// MVP: Log emails to console. Replace with actual email service (SendGrid, Resend, etc.) for production.
export async function sendEmail({ to, subject, body }) {
  console.log('--- EMAIL NOTIFICATION ---');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Body:', body);
  console.log('--- END EMAIL ---');

  // For production, integrate with:
  // - SendGrid: https://sendgrid.com
  // - Resend: https://resend.com
  // - AWS SES: https://aws.amazon.com/ses

  return { success: true };
}
