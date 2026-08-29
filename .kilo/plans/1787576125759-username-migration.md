# Username Migration Plan: litebanana → dominic-torres

## Context
User is changing GitHub username from `litebanana` to `Dominic-Torres` (which becomes `dominic-torres` on GitHub).

## Scope
Update all hardcoded `litebanana` references across 8 files to `dominic-torres`.

## Files Affected
1. `index.html` — canonical, OG URLs, JSON-LD schemas
2. `public/sitemap.xml` — all `<loc>` URLs
3. `public/robots.txt` — sitemap URL
4. `src/data/links.ts` — GitHub profile link
5. `src/data/projects.ts` — 5 repo URLs
6. `src/components/ProjectDetails.tsx` — schema URLs
7. `scripts/resume/resume.html` — GitHub link
8. `scripts/og-image/og.html` — GitHub link

## Total replacements: 33 occurrences

## Steps
1. Replace all `litebanana` with `dominic-torres` in each file
2. Run `tsc --noEmit` to verify no type errors
3. Run `vite build` to verify build succeeds
4. Commit with message: "update username from litebanana to dominic-torres"
5. Push to trigger GitHub Actions deployment

## Post-deployment
User must also update GitHub Pages settings if custom domain was used.
