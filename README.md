# Pierce Seigne — Personal Portfolio

Personal portfolio website built with React 19, TypeScript, Vite, and Tailwind CSS. Built to deploy as a static site on GitHub Pages.

## Project Structure

```text
seigne.github.io/
├── website/                 React 19 + TypeScript + Tailwind portfolio application
│   ├── src/                 Components, pages, design tokens, and project data
│   ├── public/              Static media, project write-ups, and legacy archive
│   ├── scripts/             Asset preparation and Playwright verification scripts
│   └── docs/                Generated production output (not committed)
├── tasks.md                 Implementation checklist and progress
└── package.json             Root convenience scripts delegating to website/
```

## Quick Start

### Prerequisites
- Node.js (v20+)
- npm

### Development
Start the local development server:
```bash
npm run dev
```

### Production Build
Compile TypeScript and bundle for production:
```bash
npm run build
```
Build output is saved to `website/docs/`.

## Live Deployment

The live site is https://pierceseigne.com/ and the repository is https://github.com/pseigne/website.
Every push to `main` runs `.github/workflows/deploy-pages.yml`: it installs locked dependencies,
lints, builds, and deploys `website/docs/` to GitHub Pages. Deployment can also be started manually
from GitHub Actions. Pages must use **GitHub Actions** as its publishing source; the custom domain
remains `pierceseigne.com` with HTTPS enforced.

The app uses hash routes (for example, `/#/projects/brainforge-coder-cards`) so project links
and refreshes work on static hosting. The website archive at `/#/archive` links to all four generations:
V1 (2021), V2 (2025), V3 (2025–2026), and the current V4 (2026). V1 and V2 live under
`website/public/archive/`; V3 remains available at `/legacy/`.

### Linting
Run ESLint:
```bash
npm run lint
```

### Verification & Testing
Run the automated Playwright & Axe accessibility suite:
```bash
npm --prefix website run dev &
node website/scripts/verify.mjs
```
Visual audit screenshots are stored in `.portfolio-checks/`.

## Project explorer and hosted apps

The Links page groups projects in a sidebar. Routes such as /#/links/running-utilities/app open shareable previews. Visited app frames stay mounted until leaving Links. Existing homepage project dialogs remain available.

| Project | Live path | Source repository |
| --- | --- | --- |
| Running Utilities | /running-utilities/ | pseigne/running-utilities |
| TFRRS Monitor | /ncaa-indoor-qualification/ | pseigne/ncaa-indoor-qualification |
| Time Progress | /time-progress-visualizer/ | pseigne/time-progress-visualizer |
| Syllabus Analyzer | /syllabus-analyzer/ | pseigne/tldr-syllabus-frontend (private) |

The Pages build captures source commit hashes, builds the public apps, and overlays the TFRRS repository's canonical data folder into its app assets. Source push workflows update .deploy/triggers here using a write deployment key scoped to this repository. TFRRS also triggers after successful daily scraper runs, including bot commits. Daily reconciliation compares deployed version.json files with public source commits.

Syllabus builds in its private repository and publishes only its compiled bundle here. Its repository variable SYLLABUS_API_URL points to https://tldr-syllabus-backend.onrender.com. The backend runs on the existing Free Render service srv-d5r9vt8gjchc739mbkq0 from pseigne/tldr-syllabus-backend. Credentials belong only in Render settings. Upstash Free Redis enforces three attempts per IP per UTC day and twenty globally; missing settings or Redis failure block uploads while demos remain available.

Publications and a static export of the Resource Allocation notebook's saved outputs are in website/public/documents. Exporting did not execute notebook code. The earlier Syllabus URL redirects to its new path.

Run the explorer checks with PORTFOLIO_URL=https://pierceseigne.com node website/scripts/verify-explorer.mjs. They verify responsive layouts, accessibility, routes, lazy frames, retained app inputs, and publication URLs. For local production previews, also assemble public apps as the Pages workflow does.
