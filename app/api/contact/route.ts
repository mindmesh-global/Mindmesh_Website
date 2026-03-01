import { NextRequest, NextResponse } from 'next/server';

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

    // Log for debugging (remove in production or use proper storage)
    console.log('Contact form submitted:', {
      email,
      queryLength: query.length,
      hasAttachment: !!attachment?.size,
    });

    // TODO: Integrate email service (Resend, SendGrid, etc.)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@yoursite.com',
    //   to: 'support@yoursite.com',
    //   subject: `Contact: ${email}`,
    //   html: `<p>${query}</p>`,
    //   attachments: attachment ? [{ filename: attachment.name, content: await attachment.arrayBuffer() }] : [],
    // });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
