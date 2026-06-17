import { recordVisit, IGNORE_COOKIE } from '@/lib/visits';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (request.cookies.get(IGNORE_COOKIE)?.value === 'true') {
    return new Response(null, { status: 204 });
  }

  let payload: { path?: unknown; referrer?: unknown } = {};

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const path = typeof payload.path === 'string' ? payload.path : '/';
  const referrer = typeof payload.referrer === 'string' ? payload.referrer : request.headers.get('referer');

  try {
    await recordVisit({
      path,
      referrer,
      userAgent: request.headers.get('user-agent'),
      ipAddress:
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        request.headers.get('x-vercel-forwarded-for'),
      host: request.headers.get('host'),
      country: request.headers.get('x-vercel-ip-country'),
    });
  } catch (error) {
    console.error('Error recording visit event:', error);
  }

  return new Response(null, { status: 204 });
}
