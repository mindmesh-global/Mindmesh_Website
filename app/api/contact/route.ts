import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY?.trim());
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = (formData.get('email') as string)?.trim();
    const query = (formData.get('query') as string)?.trim();
    const attachment = formData.get('attachment') as File | null;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    if (attachment && attachment.size > 0) {
      if (attachment.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Attachment must be less than 5MB' }, { status: 400 });
      }
      if (!ALLOWED_TYPES.includes(attachment.type)) {
        return NextResponse.json({ error: 'Invalid file type for attachment' }, { status: 400 });
      }
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error('CONTACT_EMAIL is not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    if (attachment && attachment.size > 0) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      attachments.push({ filename: attachment.name, content: buffer });
    }

    // Use verified domain (e.g. contact@mindmesh.global) to send to any recipient.
    // onboarding@resend.dev only allows sending to your Resend account email.
    const fromAddress = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: contactEmail,
      replyTo: email,
      subject: `Contact Form: ${email}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${query.replace(/\n/g, '<br>')}</p>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (sendError) {
      const errMsg = sendError?.message || JSON.stringify(sendError);
      console.error('Resend error:', errMsg);
      return NextResponse.json(
        { error: 'Failed to send email', details: errMsg },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
