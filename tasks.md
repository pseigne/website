# Personal Bento Portfolio Checklist

Checklist tracking the implementation of the personal bento portfolio featuring Neon.ai and BrainForge Coder Cards.

## Single-viewport desktop board
- [x] Center a shortened introduction within a 12-column, six-row desktop bento.
- [x] Integrate navigation, theme controls, résumé download, GitHub, and footer links into the board.
- [x] Add a tools strip and a dedicated Syllabus Analyzer tile.
- [x] Retain the three-card BrainForge stack, supplied Neon screenshot, education books, and US map.
- [x] Keep a scrolling layout for tablets, phones, and short browser windows.
- [x] Verify desktop viewport fit, centered introduction, visible cards, accessibility, and existing detail navigation.

## Phase 1: Architecture & Workspace Setup
- [x] **Workspace Scripting**: Configure root `package.json` proxy scripts (`dev`, `build`, `lint`, `preview`) pointing to `website/`
- [x] **Core Stack**: Configure React 19, TypeScript, Vite 8, and Tailwind CSS v4
- [x] **Client Routing**: Implement `HashRouter` for GitHub Pages static compatibility
- [x] **Deployment Output**: Set Vite `outDir` to `docs` for GitHub Pages serving

## Phase 2: Bento Grid Layout & Design System
- [x] **Bento Grid Architecture**: 1200px max container with 4 desktop columns, 2 tablet columns, and 1 mobile column
- [x] **Design Tokens**: Self-hosted Satoshi typography with Black (900) display headings, color palettes, and surface tokens defined in `App.css`
- [x] **Theme System**: Dynamic light/dark mode with system `prefers-color-scheme` synchronization, `localStorage` persistence, and manual toggle
- [x] **Motion & Entrance**: GSAP entrance animations with full `prefers-reduced-motion` safety

## Phase 3: Content & Featured Projects
- [x] **BrainForge Coder Cards**: Lead 2×2 showcase tile, optimized preview asset, full-resolution dialog viewer, and structured case study
- [x] **Neon.ai**: Public website design feature tile, live screenshot asset, and case study
- [x] **Filterable Project Browser**: Category filters (`all`, `web`, `data`, `writing`) with live result counts
- [x] **Project Details**: Dynamic markdown renderer (`react-markdown`, `remark-gfm`) with graceful fallback
- [x] **Athletics Tile & Video**: Compact and full-width video player with play/pause controls, poster image, and intersection observer pause
- [x] **Education & Places**: Academic credentials (Wisconsin, UVA) and location journey tiles
- [x] **Contact & Footer**: Email, GitHub, LinkedIn links, and copyright footer

## Phase 4: Accessibility & Navigation
- [x] **Accessible Modal (`DetailDialog`)**: Native `<dialog>` element with `showModal()`, Tab key focus trapping/containment, Escape dismissal, and background scroll locking
- [x] **Focus Restoration**: Return focus to trigger elements or wordmark on dialog close
- [x] **Skip Navigation Link**: Accessible skip link targeting `#main-content`
- [x] **ARIA Compliance**: Zero WCAG 2.1 AA violations audited via axe-core

## Phase 5: Legacy Preservation, Verification & Cleanup
- [x] **Legacy Archive**: Static portfolio preserved and served from `website/public/legacy/`
- [x] **Standalone Prototypes**: Preserved `temp-syllabus-frontend` untouched
- [x] **Automated Verification**: Playwright test suite (`scripts/verify.mjs`) auditing 4 responsive viewports across light/dark themes
- [x] **Build Verification**: Zero TypeScript errors, zero ESLint warnings, successful production build
- [x] **Coder Cards Expansion**: Bundle project details with the app so a failed lazy-module request cannot blank the page when opening a project.

## Apple-inspired redesign
- [x] Unify card surfaces, typography, spacing, and light/dark colors.
- [x] Replace wordmark with Pierce Seigne and introduce compact inline biography.
- [x] Remove About modal and redirect its old route to the homepage.
- [x] Standardize project cards with logos, previews, taglines, and circular plus indicators.
- [x] Correct UVA to Public Policy and make Education informational with official university marks.
- [x] Restyle project browser, dialogs, contact, and personal cards.
- [x] Add restrained interaction feedback with reduced-motion support.
- [x] Validate build, lint, responsive visuals, accessibility, and navigation.
  - Build and lint pass. Vite retains a non-blocking 531 kB bundle-size advisory.
  - Playwright and Axe pass at 320, 375, 768, 1024, and 1440 pixels in light and dark themes.
  - Project collection passes mobile/desktop accessibility; project history, keyboard focus, Escape, video, theme persistence, About redirect, and motion-enabled navigation pass.

## Portfolio tile refinements

- [x] Replace experience monograms with language artwork and move the heading above the icons.
- [x] Integrate location names and dates into a zoomed US map.
- [x] Combine education credentials into book cover graphics.
- [x] Add corner arrows and GitHub profile photo to the shortcut tiles.
- [x] Use the final October 3 résumé, with PDF preview and PDF/Word downloads.
- [x] Remove requested photo/athletics captions and extra Neon logo.
- [x] Verify updated desktop/mobile layouts, accessibility, and résumé downloads.

## Location and education hover refinements

- [x] Keep Wisconsin fully inside the map viewport at every size.
- [x] Shorten and center the education books.
- [x] Add brief book lift/straightening and map pin/state feedback on pointer hover, with reduced-motion support.
- Microinteraction diagnostic: initial 6/10; missing distinct hover state, immediate feedback, and time adaptation. Added hover states and immediate feedback; retained consistent repeat behavior for these informational tiles.
- [x] Verify geometry, hover, reduced motion, and build.

## Trail and tile interactions

- [x] Draw Norwich → Madison → Charlottesville on hover, keeping labels visible at all times.
- [x] Keep the map readable without hover on touch devices and with reduced motion.
- [x] Add résumé paper artwork and GitHub mark alongside the profile photo.
- [x] Add muted athletics hover playback, with manual controls and pause on pointer exit.
- [x] Give each tile's header icons a distinct accent in both themes.
- [x] Verify trail timing/replay, hover playback, reduced motion, and responsive layout.

## Photo and experience hover polish

- [x] Blend the photo into the supplied Wisconsin image with a gentle zoom; reverse smoothly on pointer exit.
- [x] Add individual experience icon lift, neighboring dock movement, color feedback, and a soft halo.
- [x] Preserve static touch presentation and reduced-motion behavior.
- [x] Verify loaded photo, hover transitions, theme contrast, mobile layout, and build.

## Greeting, social profiles, and magnetic experience dock

- [x] Make the original greeting heavier and add a two-second serif → handwriting → italic serif → original sequence.
- [x] Preload the local typefaces and keep heading geometry stable during the sequence.
- [x] Replace the GitHub shortcut with GitHub, X (@pseigne), and LinkedIn links while retaining the profile photo.
- [x] Add a cursor-driven magnetic wave, responsive neighbors, and a traveling brand-colored light to the experience dock.
- [x] Keep reduced motion and touch presentations static.
- [x] Verify timing, typography at desktop/mobile sizes, links, magnetic motion, accessibility, and build.

## Simplified experience and icon-only socials

- [x] Remove the magnetic dock and keep only a slight icon scale.
- [x] Remove the Socials title, top profile photo, and visible link labels.
- [x] Enlarge the three network marks and reveal platform-specific portraits and new-tab arrows on hover/focus.
- [x] Correct X to the confirmed @KingSeigne profile and use its actual photo.
- [x] Make the photo swap snappier: outgoing image shrinks while the new one springs forward.
- [x] Use the local cropped headshot for LinkedIn after the user confirmed the local headshot option.
- [x] Verify hover/focus states, touch/reduced motion, photo timing, responsive fit, and build.

## Selected work list

- [x] Replace the modal's two-column project grid with a semantic list of rows, with thumbnails beside project details.
- [x] Verify desktop and mobile layouts without horizontal overflow and build successfully.

## Top navigation

- [x] Add Home, Blog, and Links tabs with active states above the bento.
- [x] Start Blog with no posts and add a Links page for social profiles, email, and résumé.
- [x] Preserve desktop viewport fit and verify navigation, mobile layout, accessibility, lint, and build.

## Project links directory

- [x] Add direct links for all 11 projects, including both Running Utilities tools, above personal links.
- [x] Verify desktop/mobile scrolling and layout; keep Selected Work unchanged pending the user's shortlist.

## Selected work shortlist

- [x] Show only Coder Cards, Neon.ai Website, TFRRS Monitor, and Syllabus Analyzer in a responsive grid.
- [x] Remove the name and divider from the modal toolbar.
- [x] Add See all linking to the complete Links directory.

## Project preview placeholders

- [x] Remove original TFRRS Monitor and Syllabus Analyzer screenshots and their WebP/build copies.
- [x] Replace all preview references with labeled SVG placeholders and stop regenerating the deleted screenshots.

## Doug the Duck

- [x] Prepare a transparent cutout of the supplied Doug illustration and place it beside the greeting.
- [x] Use Doug for browser favicons and the Apple touch icon.
- [x] Move Doug to the left and use matching transparent GIF-derived poses for five hover waves, ending wing-down.
- [x] Keep touch/reduced-motion static and clean up playback on unmount.
- [x] Start the font sequence and Doug's wave together on mount after assets load; hover over the greeting replays only Doug's wave.
- [x] Verify simultaneous start, font stability on hover, reduced motion, lint, and build.

## Live deployment

- [x] Preserve GitHub's existing custom-domain commit and use the canonical `pseigne/website` remote.
- [x] Add a GitHub Actions workflow to lint, build, and deploy the production site on pushes to `main`.
- [x] Publish and verify the production site at pierceseigne.com over HTTPS on mobile and desktop, including project refreshes, résumé downloads, media, and the legacy archive.

## Website history

- [x] Recover the May 2021 GitHub website as V1 and the Desktop snapshot as V2.
- [x] Label the previous live site V3 and the current site V4.
- [x] Add a website archive page and replace the homepage's earlier-version link.
- [x] Verify archived assets, previews, navigation, old project links, mobile, dark mode, accessibility, build, and lint.

## Links explorer and project hosting

- [x] Group projects in the sidebar with shareable case-study and preview routes.
- [x] Preserve visited preview sessions and provide mobile project navigation.
- [x] Import the latest classroom React frontend and its history into the private personal repository.
- [x] Add PDF publications and correct the history capstone description.
- [x] Implement a Render backend with temporary uploads, validation, and durable Upstash quotas; backend tests pass.
- [ ] Configure free Render/Upstash services and replacement OpenAI secret.
- [x] Publish project frontends and automatic source-repository deployment triggers.
- [x] Verify responsive layouts, accessibility, and live deployment.
