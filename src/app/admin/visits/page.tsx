import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { ADMIN_COOKIE, getVisitSummary, isAuthorizedAdmin } from '@/lib/visits';

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

export default async function AdminVisitsPage({
  searchParams,
}: {
  searchParams: Promise<{ excluded?: string }>;
}) {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!isAuthorizedAdmin(adminCookie)) {
    notFound();
  }

  const params = await searchParams;
  const summary = await getVisitSummary();

  return (
    <section className="admin-shell">
      <div className="admin-container">
        <div className="admin-kicker">Private dashboard</div>
        <div className="admin-header">
          <div>
            <h1>Visit Count</h1>
            <p>
              Counts browser visits that are not marked with your private ignore cookie. This
              dashboard is not linked anywhere public.
            </p>
          </div>
          <a className="admin-button" href="/admin/exclude-me">
            Exclude this browser
          </a>
        </div>

        {params.excluded === 'true' ? (
          <div className="admin-notice">
            This browser is now excluded from future visit tracking.
          </div>
        ) : null}

        <div className="admin-metrics">
          <div className="admin-metric">
            <span>Total visits</span>
            <strong>{formatNumber(summary.totalVisits)}</strong>
          </div>
          <div className="admin-metric">
            <span>Today</span>
            <strong>{formatNumber(summary.todayVisits)}</strong>
          </div>
          <div className="admin-metric">
            <span>Last 7 days</span>
            <strong>{formatNumber(summary.sevenDayVisits)}</strong>
          </div>
          <div className="admin-metric">
            <span>Last 30 days</span>
            <strong>{formatNumber(summary.thirtyDayVisits)}</strong>
          </div>
          <div className="admin-metric">
            <span>Unique today</span>
            <strong>{formatNumber(summary.uniqueToday)}</strong>
          </div>
          <div className="admin-metric">
            <span>Unique last 7 days</span>
            <strong>{formatNumber(summary.uniqueSevenDay)}</strong>
          </div>
        </div>

        <div className="admin-grid">
          <section className="admin-panel">
            <h2>Top pages, last 30 days</h2>
            {summary.topPages.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Visits</th>
                    <th>Unique</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.topPages.map((page) => (
                    <tr key={page.path}>
                      <td>{page.path}</td>
                      <td>{formatNumber(page.visits)}</td>
                      <td>{formatNumber(page.uniqueVisitors)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="admin-empty">No non-excluded visits have been recorded yet.</p>
            )}
          </section>

          <section className="admin-panel">
            <h2>Recent visits</h2>
            {summary.recentVisits.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Page</th>
                    <th>Referrer</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentVisits.map((visit) => (
                    <tr key={`${visit.createdAt}-${visit.path}`}>
                      <td>{formatDate(visit.createdAt)}</td>
                      <td>{visit.path}</td>
                      <td>{visit.referrerHost || 'Direct'}</td>
                      <td>{visit.country || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="admin-empty">Recent visits will appear here after deployment.</p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
