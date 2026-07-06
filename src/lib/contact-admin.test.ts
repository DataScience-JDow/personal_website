import test from 'node:test';
import assert from 'node:assert/strict';

import { NextRequest } from 'next/server';

import { submitContactForm } from '@/app/actions';
import { validateContactFormInput } from '@/lib/contact-form';
import { GET as authorizeAdmin } from '@/app/admin/authorize/route';
import { ADMIN_COOKIE, isAuthorizedAdmin, normalizePath } from '@/lib/visits';

test('submitContactForm accepts honeypot submissions without touching storage', async () => {
  const formData = new FormData();
  formData.set('name', 'Spam Bot');
  formData.set('email', 'bot@example.com');
  formData.set('message', 'This should never hit the database because the honeypot is filled.');
  formData.set('website', 'https://spam.example.com');

  const result = await submitContactForm(null, formData);

  assert.deepEqual(result, {
    success: true,
    message: 'Thanks. Your note was received.',
  });
});

test('validateContactFormInput rejects short or malformed recruiter notes', () => {
  assert.deepEqual(
    validateContactFormInput({
      name: 'Jeremy',
      email: 'not-an-email',
      message: 'too short',
      website: '',
    }),
    { success: false, error: 'Please include a short note with a little context.' },
  );

  assert.deepEqual(
    validateContactFormInput({
      name: 'Jeremy',
      email: 'jeremy@example.com',
      message: 'I would love to talk about this role and learn more about your recent projects.',
      website: '',
    }),
    null,
  );
});

test('isAuthorizedAdmin only accepts the configured admin token', () => {
  process.env.VISITS_ADMIN_TOKEN = 'super-secret-token';

  assert.equal(isAuthorizedAdmin('super-secret-token'), true);
  assert.equal(isAuthorizedAdmin(null, 'super-secret-token'), true);
  assert.equal(isAuthorizedAdmin('wrong-token'), false);
  assert.equal(isAuthorizedAdmin(undefined, undefined), false);
});

test('normalizePath strips fragments and falls back to root for invalid paths', () => {
  assert.equal(normalizePath('/projects/maze-dash?tab=stats#top'), '/projects/maze-dash?tab=stats');
  assert.equal(normalizePath('projects/maze-dash'), '/');
  assert.equal(normalizePath('   '), '/');
});

test('admin authorize route sets the admin cookie and redirects on a valid token', () => {
  process.env.VISITS_ADMIN_TOKEN = 'super-secret-token';

  const request = new NextRequest('https://portfolio.test/admin/authorize?token=super-secret-token&next=/admin/messages');
  const response = authorizeAdmin(request);

  assert.equal(response.status, 307);
  assert.equal(response.headers.get('location'), 'https://portfolio.test/admin/messages');
  const setCookie = response.headers.get('set-cookie') ?? '';
  assert.match(setCookie, new RegExp(`${ADMIN_COOKIE}=super-secret-token`));
});

test('admin authorize route returns 404 for an invalid token', () => {
  process.env.VISITS_ADMIN_TOKEN = 'super-secret-token';

  const request = new NextRequest('https://portfolio.test/admin/authorize?token=wrong-token');
  const response = authorizeAdmin(request);

  assert.equal(response.status, 404);
});