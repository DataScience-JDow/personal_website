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
