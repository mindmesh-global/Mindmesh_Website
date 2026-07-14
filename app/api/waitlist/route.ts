import { NextRequest, NextResponse, after } from 'next/server';
import { google } from 'googleapis';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Auth + Sheets client are built once per warm serverless instance instead
 * of per request, so repeat submissions skip re-signing the JWT client.
 */
let sheetsClient: ReturnType<typeof google.sheets> | null = null;

function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) return null;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  sheetsClient = google.sheets({ version: 'v4', auth });
  return sheetsClient;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body.email as string)?.trim();
    const name = (body.name as string)?.trim() || '';
    const platformRaw = String(body.platform ?? '')
      .trim()
      .toLowerCase();
    const platform =
      platformRaw === 'windows' || platformRaw === 'macos' ? platformRaw : '';

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (!platform) {
      return NextResponse.json({ error: 'Please select Windows or macOS' }, { status: 400 });
    }

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const sheets = getSheetsClient();

    if (!sheets || !spreadsheetId) {
      console.error('Missing Google Sheets env vars');
      return NextResponse.json(
        { error: 'Waitlist service not configured' },
        { status: 500 }
      );
    }

    /**
     * Respond to the client as soon as the entry is validated; the actual
     * Sheets append runs after the response is flushed so "Join waitlist"
     * doesn't sit on the Google API round-trip.
     */
    after(async () => {
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'Sheet1!A:D',
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          requestBody: {
            values: [[email, name, new Date().toISOString(), platform]],
          },
        });
      } catch (error) {
        console.error('Waitlist sheet append failed:', error);
      }
    });

    return NextResponse.json({ success: true, message: 'Joined waitlist successfully' });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
