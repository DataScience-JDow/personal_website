# Decisions

Use this file to capture choices that should remain easy to find later.

## 2026-06-14

### Context docs starter pack

- Decision: Add `docs/PROJECT_CONTEXT.md`, `docs/DECISIONS.md`, and `docs/HANDOFF.md`.
- Reason: Repo context, durable decisions, and active working state should be explicit instead of spread across chat history.

### Portfolio maintenance rule

- Decision: Treat recruiter-relevant project changes as potential website updates in the same round of work.
- Reason: The site is only useful if it reflects current proof instead of stale project summaries.

### Contact form dependency

- Decision: Keep the contact flow aligned with a Postgres-backed `portfolio.messages` insert path.
- Reason: The website relies on a server action and database connection rather than a third-party form service.
## 2026-06-17

### Private visit counter

- Decision: Track personal website visits with a first-party hidden beacon and private admin dashboard instead of adding a public counter or third-party analytics display.
- Rationale: Jeremy only needs a non-public count of visits from people other than himself. A first-party route keeps the UI unchanged for external visitors and lets his browser opt out through a private cookie.
- Implementation: `src/components/VisitTracker.tsx` posts to `src/app/api/visits/route.ts`; visit events are stored in `portfolio.visit_events`; `/admin/authorize` sets the admin cookie; `/admin/exclude-me` sets the ignore cookie; `/admin/visits` renders the private dashboard.
- Privacy: The implementation stores path, host, referrer host, country, environment, timestamp, and an anonymous visitor hash. It does not store raw IP addresses or raw user-agent strings.
