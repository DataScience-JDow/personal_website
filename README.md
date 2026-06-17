# Jeremy Dowdy Personal Website

Recruiter-facing portfolio site for Jeremy Dowdy. The site presents case studies, public proof pages, skills, and a contact workflow backed by Postgres.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Vercel
- Postgres via the `postgres` package

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create or update `.env.local` with:

```bash
DATABASE_URL=<your postgres connection string>
VISITS_ADMIN_TOKEN=<long random token for the private visits dashboard>
VISITS_HASH_SALT=<long random salt for anonymous visitor hashes>
```

3. Start the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Common Commands

```bash
npm run dev
npm run lint
npm run build
npm run setup:visits
npm run start
```

## Project Structure

```text
src/app/
  layout.tsx                  App shell
  page.tsx                    Homepage composition
  actions.ts                  Server actions, including contact form submission
  projects/[slug]/page.tsx    Public proof / case-study detail pages

src/components/
  Hero.tsx
  Projects.tsx
  PublicProof.tsx
  Skills.tsx
  ContactForm.tsx

src/lib/
  portfolio.ts                Core portfolio content and structured proof data
  db.ts                       Shared Postgres connection helper

docs/
  portfolio-maintenance.md    Rules for when project work should update the site
  PROJECT_CONTEXT.md          Repo operating context
  DECISIONS.md                Durable project decisions
  HANDOFF.md                  Current state and open work

public/
  jeremy-dowdy-resume.pdf
  jeremy-dowdy-headshot.jpg
```

## How The Site Works

- The homepage is assembled in `src/app/page.tsx`.
- Structured portfolio content lives in `src/lib/portfolio.ts`.
- Public proof pages are routed under `src/app/projects/[slug]/page.tsx`.
- The contact form submits through `src/app/actions.ts`.
- Database access is centralized in `src/lib/db.ts` and requires `DATABASE_URL`.

## Content Ownership

When a personal project changes materially, review whether the site should change in the same round of work.

Start with:

- `AGENTS.md`
- `docs/portfolio-maintenance.md`
- `docs/PROJECT_CONTEXT.md`

The main content touchpoints are:

- `src/lib/portfolio.ts`
- `src/app/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `public/jeremy-dowdy-resume.pdf`

## Contact Form Notes

The contact form writes to `portfolio.messages` in Postgres. Before changing that flow, verify:

- `DATABASE_URL` is present
- the target schema/table still exists
- any UI changes stay aligned with the server action in `src/app/actions.ts`

## Private Visit Counter

The site tracks non-public visit counts through a first-party `/api/visits` route and stores minimal events in `portfolio.visit_events`.

- The counter is not displayed on public pages.
- Admin access requires `VISITS_ADMIN_TOKEN`.
- Open `/admin/authorize?token=<VISITS_ADMIN_TOKEN>` to set the private admin cookie.
- Open `/admin/exclude-me?token=<VISITS_ADMIN_TOKEN>` from your own browser to set the ignore cookie so your visits are excluded.
- The visitor hash is anonymous. Set `VISITS_HASH_SALT` in Vercel for stable private hashing that does not depend on the admin token.
- Run `npm run setup:visits` to create the table explicitly; the app also verifies the table lazily at runtime.

## Current Gaps

- No dedicated automated test suite is documented yet
- The repo has active local changes, so edits should stay scoped and diff-aware
- This README should evolve as deployment, schema, or content workflows change
