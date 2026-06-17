import { ADMIN_COOKIE, isAuthorizedAdmin } from '@/lib/visits';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!isAuthorizedAdmin(null, token)) {
    return new Response('Not found', { status: 404 });
  }

  const redirectTo = request.nextUrl.searchParams.get('next') || '/admin/visits';
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  response.cookies.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
