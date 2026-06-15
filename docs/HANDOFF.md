# Handoff

## Current State

- Personal portfolio site built with Next.js App Router and React 19
- Contact form submits through `src/app/actions.ts` using `DATABASE_URL` and `src/lib/db.ts`
- Portfolio content is maintained in `src/lib/portfolio.ts`
- Public project detail pages live under `src/app/projects/[slug]/`

## Active Local Changes Observed On 2026-06-14

- Modified: `AGENTS.md`
- Modified: `public/jeremy-dowdy-resume.pdf`
- Modified: `src/app/globals.css`
- Modified: `src/app/page.tsx`
- Modified: `src/components/ContactForm.tsx`
- Modified: `src/components/Projects.tsx`
- Modified: `src/lib/portfolio.ts`
- Untracked: `docs/`
- Untracked: `scripts/generate_resume.py`
- Untracked: `src/app/projects/`
- Untracked: `src/components/PublicProof.tsx`

## Open Work

- Replace the default `README.md` with a real project readme
- Keep `src/lib/portfolio.ts` and project detail pages aligned with current recruiter-facing proof
- Verify the contact form schema and environment assumptions remain correct
- Record future non-trivial architecture or content decisions in `docs/DECISIONS.md`

## Known Risks

- The site can become stale if personal project work is not reflected here
- Contact-form regressions may not be caught early because no dedicated test suite is documented
- Existing local changes mean future edits should be deliberate and diff-aware

## Recommended Next Step

- Update `README.md` so setup, architecture, content ownership, and deployment assumptions are documented in one place
