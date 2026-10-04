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
├── temp-syllabus-frontend/  Standalone syllabus analyzer prototype
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
and refreshes work on static hosting. The previous site remains available at `/legacy/`.

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
