# Vijayraj Palanisamy — Portfolio

Live: **https://vijayrajpalanisamy88.github.io/**

A personal portfolio for a C#/.NET engineer and AI product builder, covering career timeline, an evidence-based skills
explorer, product case studies, an interactive architecture explorer, the delivery lifecycle, the AI engineering journey
and contact details.

## Stack

| Concern | Choice | Why |
|---|---|---|
| UI | React 19 + TypeScript | Typed, component-based, easy to maintain |
| Build | Vite 7 | Fast builds, static output |
| Styling | Tailwind CSS 4 + CSS tokens | Dark/light themes from one set of variables |
| Rendering | Build-time prerender (`scripts/prerender.mjs`) | Every route is real HTML: SEO, link previews, deep links and refresh work on GitHub Pages |
| Motion | CSS + IntersectionObserver | No animation library; respects `prefers-reduced-motion` plus an on-page toggle |
| Fonts | Self-hosted Inter / JetBrains Mono (Fontsource) | No third-party requests |
| Tests | Vitest (content/privacy/SEO) + Playwright (journeys, axe accessibility, 5 browser profiles) | |
| Hosting | GitHub Pages via GitHub Actions | |

There is no backend, no analytics, no cookies and no secrets. Theme and animation preferences go in `localStorage`
and are optional.

## Project layout

```
src/data/          ← ALL CONTENT LIVES HERE (edit these, not the components)
  profile.ts         name, headline, contact links, hero facts
  experience.ts      jobs and professional development
  skills.ts          skills grouped by category, tagged by evidence
  projects.ts        case studies + architecture-explorer diagrams
  journey.ts         AI journey milestones, delivery lifecycle, AI-native lifecycle
src/components/    sections and UI
src/seo.ts         per-route titles, descriptions, Open Graph, JSON-LD
scripts/           prerender, product screenshots, social-image generator
public/            images, favicon, og-image
tests/unit/        content integrity, privacy and SEO checks
tests/e2e/         user journeys, accessibility, cross-browser
```

## Run locally

Requires Node 22+.

```bash
npm ci
npm run dev          # http://localhost:5173 (client-rendered, for editing)
npm run build        # dist/ with prerendered pages, sitemap.xml, robots.txt, 404.html
npm run preview      # http://localhost:4173 (serves the production build)
npm test             # unit tests
npx playwright install chromium firefox webkit   # once
npm run test:e2e     # end-to-end (starts the preview server itself; run `npm run build` first)
npm run check        # lint + unit + build + e2e
```

## Updating content

**Rule: only state what can be verified.** The unit tests enforce some of this: role titles and dates, IIT Madras
shown as in progress, no phone numbers, no resume file, no current-employer or internal project names, no private-repo
links, https-only links.

### Add a project
1. Add an entry to `projects` in `src/data/projects.ts`. Fill every field. Keep shipped work in `features` and
   anything unshipped in `roadmap`. Pick an honest `status.kind`: `live`, `beta`, `development`, `demo` or `enterprise`.
2. Optional: a screenshot at `public/images/<slug>.jpg` (1280×720). For a public site, add it to
   `scripts/capture-screenshots.mjs` and run `node scripts/capture-screenshots.mjs <slug>`.
3. Optional: an `architecture` block with layers and nodes. It appears automatically in the Architecture Explorer
   and on the case-study page.
4. `npm run build`. The page `/projects/<slug>/` and its sitemap entry are generated automatically.

### Add or change a job
Edit `experience` in `src/data/experience.ts`, then update the expected list in `tests/unit/content.test.ts`.
The 2016 – present employer is deliberately shown as "Global life-sciences company"; keep that work generic.

### Add a skill
Add it to the right group in `src/data/skills.ts` with `evidence`: `production` (used in employment), `projects`
(used in my own products) or `learning`. Fill `usedIn`. There are no proficiency percentages, by design.

### Add LinkedIn
Set `linkedin` in `src/data/profile.ts`. Buttons, the contact card and the `sameAs` structured data pick it up.

### Social preview image
`node scripts/make-og.mjs` regenerates `public/og-image.png` and `public/apple-touch-icon.png`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`:
lint → typecheck → unit tests → build → Playwright (5 browser profiles) → deploy to GitHub Pages → live smoke test.
Pull requests run every step except the deploy.

One-time setup (already done): repository **Settings → Pages → Source: GitHub Actions**.

### Rollback
- **Preferred:** `git revert <bad-commit> && git push`. The pipeline tests and redeploys the previous state.
- **Fast:** in **Actions**, open the last good *Build, test and deploy* run on `main` and choose **Re-run all jobs**.
  It rebuilds that commit and redeploys it.

## Privacy and confidentiality

- No phone number or address is published. Contact is by email and GitHub, as approved.
- Product source repositories are private. Case studies describe them but never link to their code.
- The current employer is not named, and no internal project names, lab details or internal metrics are published.
- No resume is published on the site.
- Architecture diagrams leave out secrets, private hostnames and internal network details.
