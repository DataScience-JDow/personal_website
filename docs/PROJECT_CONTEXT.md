# Project Context

## Overview

- Project name: `personal_website`
- Purpose: Personal portfolio site for Jeremy Dowdy, with recruiter-facing project proof and a contact workflow.
- Primary users: Recruiters, hiring managers, and collaborators evaluating Jeremy's work.
- Status: Active site with ongoing content and presentation updates.

## Stack

- Frameworks: Next.js 16 App Router, React 19
- Runtime: Node.js
- Database: Postgres via `postgres` package
- External services: Vercel deployment, database via `DATABASE_URL`
- Deployment target: Vercel

## Repo Layout

- App entrypoints: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/projects/[slug]/page.tsx`
- Key directories: `src/app`, `src/components`, `src/lib`, `public`, `docs`, `scripts`
- Generated code or files: `.next/`
- Areas that are risky to change: `src/app/actions.ts` contact form submission, `src/lib/db.ts` database connection handling, portfolio content in `src/lib/portfolio.ts`

## Local Workflow

- Install: `npm install`
- Run: `npm run dev`
- Test: No dedicated test suite currently documented
- Lint: `npm run lint`
- Build: `npm run build`

## Conventions

- Branching or release model: Not documented in-repo
- Code style constraints: Follow Next.js App Router patterns already in use; read `AGENTS.md` before changing app code
- Testing expectations: Run lint and relevant app verification for changes
- Logging or observability rules: Use console logging sparingly; server action errors currently log to the server console
- Migration or schema rules: Keep contact-form schema assumptions aligned with `portfolio.messages`

## Current Priorities

- Priority 1: Keep recruiter-facing portfolio content current when projects change
- Priority 2: Preserve a working contact flow backed by Postgres
- Priority 3: Improve or expand public proof pages under `src/app/projects/[slug]/`

## Known Issues

- `README.md` is still the default Next.js scaffold and does not describe the actual project
- No formal test suite is documented yet
- The repo currently has uncommitted local changes, so edits should stay tightly scoped

## Related Repos

- Jeremy-owned personal projects that may need portfolio updates when materially changed

## Read First

- `AGENTS.md`
- `README.md`
- `docs/portfolio-maintenance.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/DECISIONS.md`
- `docs/HANDOFF.md`

## Notes For Codex

- Files to inspect before editing: `AGENTS.md`, `docs/portfolio-maintenance.md`, `src/lib/portfolio.ts`, `src/app/page.tsx`, `src/app/actions.ts`
- Commands that usually matter: `npm run dev`, `npm run lint`, `npm run build`
- Things to avoid changing: Do not break the contact form, do not overwrite existing in-progress content updates, and do not regress recruiter-facing proof content
