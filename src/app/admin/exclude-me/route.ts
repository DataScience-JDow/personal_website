import { ADMIN_COOKIE, IGNORE_COOKIE, isAuthorizedAdmin } from '@/lib/visits';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const adminCookie = request.cookies.get(ADMIN_COOKIE)?.value;

  if (!isAuthorizedAdmin(adminCookie, token)) {
    return new Response('Not found', { status: 404 });
  }

  const response = NextResponse.redirect(new URL('/admin/visits?excluded=true', request.url));

  response.cookies.set(IGNORE_COOKIE, 'true', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });

  if (token && !adminCookie) {
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}
