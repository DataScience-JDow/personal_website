import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getRecruiterMessageInbox } from '@/lib/messages';
import { ADMIN_COOKIE, isAuthorizedAdmin } from '@/lib/visits';

export const dynamic = 'force-dynamic';

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default async function AdminMessagesPage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!isAuthorizedAdmin(adminCookie)) {
    notFound();
  }

  const inbox = await getRecruiterMessageInbox();

  return (
    <section className="admin-shell">
      <div className="admin-container">
        <div className="admin-kicker">Private dashboard</div>
        <div className="admin-header">
          <div>
            <h1>Recruiter Messages</h1>
            <p>
              Private inbox for contact-form submissions stored in <code>portfolio.messages</code>.
              This route is protected by the same admin cookie flow as the visits dashboard.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a className="admin-button" href="/admin/visits">
              View visits
            </a>
            <a className="admin-button" href="/admin/exclude-me">
              Exclude this browser
            </a>
          </div>
        </div>

        <div className="admin-metrics">
          <div className="admin-metric">
            <span>Inbox</span>
            <strong>{formatNumber(inbox.total)}</strong>
          </div>
          <div className="admin-metric">
            <span>Unread</span>
            <strong>{formatNumber(inbox.unread)}</strong>
          </div>
          <div className="admin-metric">
            <span>Archived</span>
            <strong>{formatNumber(inbox.archived)}</strong>
          </div>
        </div>

        <section className="admin-panel">
          <h2>Recent messages</h2>
          {inbox.messages.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>Sender</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {inbox.messages.map((message) => (
                  <tr key={`${message.createdAt}-${message.email}`}>
                    <td>{formatDate(message.createdAt)}</td>
                    <td>{message.name}</td>
                    <td>
                      <a href={`mailto:${message.email}`}>{message.email}</a>
                    </td>
                    <td>{message.readAt ? 'Read' : 'Unread'}</td>
                    <td style={{ whiteSpace: 'pre-wrap' }}>{message.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="admin-empty">No recruiter messages have been captured yet.</p>
          )}
        </section>
      </div>
    </section>
  );
}
