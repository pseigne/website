# Pierce Seigne — Personal Portfolio

Personal portfolio website built with React 19, TypeScript, Vite, and Tailwind CSS. Built to deploy as a static site on GitHub Pages.

## Project Structure

```text
seigne.github.io/
├── website/                 React 19 + TypeScript + Tailwind portfolio application
│   ├── src/                 Components, pages, design tokens, and project data
│   ├── public/              Static media, project write-ups, and legacy archive
│   ├── scripts/             Asset preparation and Playwright verification scripts
│   └── docs/                Production build output served by GitHub Pages
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
