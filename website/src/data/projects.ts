export type Category = "web" | "data" | "writing";
export interface SectionImage {
  src: string;
  darkSrc?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}
export interface ProjectSection {
  title: string;
  text: string;
  images?: SectionImage[];
  columns?: 2 | 3;
  mobileColumns?: 1 | 2;
}
export interface Project {
  slug: string;
  name: string;
  year: string;
  category: Category;
  role: string;
  summary: string;
  stack: string[];
  languages: string[];
  links: { label: string; url: string }[];
  image?: string;
  imageAlt?: string;
  fullImage?: string;
  video?: { src: string; poster: string };
  beforeAfter?: { before: SectionImage; after: SectionImage };
  featuredOrder?: number;
  markdown?: string;
  sections?: ProjectSection[];
}
export const resumeUrl = "/resume/Pierce-Seigne-Resume.pdf";
export const resumePages = 1;
export const projects: Project[] = [
  {
    slug: "brainforge-coder-cards",
    languages: ["React", "JavaScript", "HTML", "CSS"],
    name: "Coder Cards",
    year: "2026",
    category: "web",
    role: "Product design & frontend development",
    featuredOrder: 1,
    summary:
      "I came up with Coder Cards, sketched it, built the first prototype, and designed the frontend with a small team at Neon.ai. Developers have made nearly 1,000 unique cards since it launched in early September 2026.",
    stack: [],
    links: [{ label: "Generate your card", url: "https://codercards.ai/" }],
    image: "/images/coder-card.webp",
    fullImage: "/images/coder-card-original.png",
    imageAlt:
      "An example Coder Card for pseigne, with coding style, activity, and language visualizations.",
    video: {
      src: "/projects/coder-cards/flow.mp4",
      poster: "/projects/coder-cards/flow-poster.png",
    },
    sections: [
      {
        title: "The problem",
        text: "My high school computer science teacher used to say code is like a writing style. Everyone has their own vocabulary, structure, and rhythm. This summer at Neon.ai, [Roger Wiebe](https://www.linkedin.com/in/rjwiebe) showed a demo that read your GitHub repositories to learn how you code, so an AI agent could write code that matched your style. After playing with it, I wanted to know how my profile compared to everyone else's. There was no simple way to see it, let alone share it. That became the question: what would a developer's coding identity look like on one card?",
      },
      {
        title: "Sketches",
        text: "I started on paper. The first wireframe put every stat in a box on one page: commits, repos, naming style, tech stack, peak hour, work-life balance, and a predicted role. Then I drew a phone version to see what someone would actually look at first. Those sketches decided the main rule for the card: one idea per tile.",
        columns: 2,
        images: [
          {
            src: "/projects/coder-cards/wireframe-v0.1-sketch.webp",
            alt: "Hand-drawn phone wireframe sketch for Coder Cards from July 2026 with layout notes",
            caption: "First wireframe, July 2026.",
            width: 1200,
            height: 1228,
          },
          {
            src: "/projects/coder-cards/wireframe-tile-grid-sketch.webp",
            alt: "Hand-drawn tile grid sketch mapping stats, behavioral vibe, repositories, and tech stack into separate boxes",
            caption: "Tile layout, before any styling.",
            width: 902,
            height: 566,
          },
        ],
      },
      {
        title: "How the design changed",
        text: 'I built the first prototype in Cursor from my sketches and kept iterating. Early versions tried a lot of directions: a tall gradient "persona" card, a dark dashboard, a stacked mobile list. By version 0.2 (mid-August) I settled on a bento grid inspired by SaaS dashboards, which was the first version I showed the team. From there, each version fixed something specific: clearer numbers, a calmer color palette, better spacing on small screens, and a loading state so people weren\'t staring at a blank page while their repos were analyzed.',
        columns: 3,
        images: [
          {
            src: "/projects/coder-cards/card01-jul22.webp",
            alt: "Early July prototype showing a tall gradient persona card with minimal data",
            caption: "Early prototype, July: one big persona, not much data.",
            width: 844,
            height: 1630,
          },
          {
            src: "/projects/coder-cards/v0.2-aug13.webp",
            alt: "Coder Cards version 0.2 from August 13 arranged as a bento grid",
            caption: "v0.2, August 13: the bento grid I presented to the team.",
            width: 1200,
            height: 940,
          },
          {
            src: "/projects/coder-cards/v0.7-aug27.webp",
            alt: "Coder Cards version 0.7 from late August with pastel tiles and prominent headline numbers",
            caption: "v0.5–v0.7, late August: pastel tiles, the number as the headline.",
            width: 1200,
            height: 753,
          },
          {
            src: "/projects/coder-cards/loading-state-v0.1-aug28.webp",
            alt: "Terminal-style loading console showing repository analysis progress",
            caption: "Loading state, August 28: a terminal-style progress console.",
            width: 1200,
            height: 1096,
          },
          {
            src: "/projects/coder-cards/final-sep13.webp",
            alt: "Final shipped Coder Card design from September 2026",
            caption: "Final, September: the card that shipped.",
            width: 1200,
            height: 900,
          },
        ],
      },
      {
        title: "Built with a small team",
        text: "Coder Cards was a small-team project. Neon.ai's launch announcement credits the work to three interns: [Roger Wiebe](https://www.linkedin.com/in/rjwiebe), [Charlie Bailey](https://www.linkedin.com/in/charliebailey24), and me. I owned the concept, the prototype, and the frontend: layouts, color palettes, and the tile designs. The engineering side built the backend that analyzes a GitHub profile and produces the numbers on the card, and Daniel McKnight, Neon's CTO, set up the codercards.ai deployment. I also built the product's About page, about.codercards.ai, in Framer for launch day. We worked through pull requests and design reviews, and I folded their feedback into each version. Working that way taught me to explain design decisions clearly enough that an engineer could build against them, and to cut features that didn't earn their space.",
      },
      {
        title: "Launch and outcome",
        text: "Coder Cards launched in early September 2026 at [codercards.ai](https://codercards.ai/). Since then developers have generated nearly 1,000 unique cards. Anyone can sign in with GitHub, make a card, and then copy the image, download it, or post it to X and Reddit.\n\nThe card shown here is an example output; its scores and predictions are product-generated descriptions, not independently verified measures of ability.",
        columns: 2,
        images: [
          {
            src: "/projects/coder-cards/card-mac-light.webp",
            darkSrc: "/projects/coder-cards/card-mac-dark.webp",
            alt: "Coder Cards desktop view showing a generated developer card",
            caption: "Final card on desktop.",
            width: 1200,
            height: 900,
          },
          {
            src: "/projects/coder-cards/card-phone.webp",
            alt: "Coder Cards mobile view on a phone screen",
            caption: "Final card on a phone.",
            width: 780,
            height: 1688,
          },
        ],
      },
      {
        title: "What I learned",
        text: "Taking something from a sketch to a public product showed me how much of design is deciding what to leave out. The first versions tried to show everything. The final card shows a few things clearly, and lets people dig into the rest.",
      },
    ],
  },
  {
    slug: "neon-ai",
    languages: ["React", "TypeScript", "HTML", "CSS"],
    name: "Neon.ai Website",
    year: "2026",
    category: "web",
    role: "Website design",
    featuredOrder: 2,
    summary:
      "I redesigned Neon.ai's public website, and I manage it now. Early in the summer I updated the site Neon had when I started, but it still missed the mark, so I redesigned it from the ground up. The new design is in A/B testing now. The site gets thousands of visitors a month.",
    stack: [],
    image: "/images/neon-site-current.webp",
    imageAlt:
      "Neon.ai website featuring the headline Own your AI. Don’t rent it.",
    beforeAfter: {
      before: {
        src: "/projects/neon-ai/june-2026-hero.webp",
        alt: "Neon.ai homepage in June 2026 before the redesign",
        caption: "June 2026",
        width: 1200,
        height: 860,
      },
      after: {
        src: "/projects/neon-ai/redesign-oct-2026.webp",
        alt: "Redesigned Neon.ai homepage in October 2026 with Unbounded headlines and blueprint grid",
        caption: "Redesign, October 2026",
        width: 1200,
        height: 750,
      },
    },
    links: [
      { label: "Visit Neon.ai", url: "https://www.neon.ai/" },
      {
        label: "Try the prototype",
        url: "https://satisfied-bookings-273423.framer.app",
      },
      { label: "See it on neon.ai", url: "https://neon.ai/v2/home" },
    ],
    sections: [
      {
        title: "Why I started over",
        text: "Early in the summer I updated the website Neon had when I started in June. Once it was done, I felt it still missed the mark. The site needed to be mobile first, more informative, and able to grow with the company. The team had backed itself into a corner, especially while building and releasing other products, and the site didn't show who Neon is as a company. Fixing that first version felt like fixing something that had missed the mark conceptually, many layers below anything I was changing. So I stopped patching it, researched, and worked out a complete redesign from the ground up.",
        columns: 2,
        images: [
          {
            src: "/projects/neon-ai/june-2026-hero.webp",
            alt: "Neon.ai homepage as it looked in June 2026",
            caption: "June 2026",
            width: 1200,
            height: 860,
          },
          {
            src: "/projects/neon-ai/summer-2026-hero.webp",
            alt: "First summer 2026 update to the Neon.ai homepage with a purple hero section",
            caption: "My first update, summer 2026",
            width: 1200,
            height: 833,
          },
        ],
      },
      {
        title: "Exploring directions",
        text: 'Before building anything, I mocked up the homepage in six visual directions, from a clean Swiss grid to a warm, paper-like research journal, and compared them side by side. The one we kept, "Dimensional Patent," came from something specific to Neon: the company holds 17 granted patents in conversational AI, so the background became a quiet blueprint grid, like a patent drawing.',
        columns: 3,
        mobileColumns: 2,
        images: [
          {
            src: "/projects/neon-ai/01-living-patent.webp",
            alt: "Direction board 1: Living Patent homepage concept",
            caption: "Living Patent",
            width: 1200,
            height: 2333,
          },
          {
            src: "/projects/neon-ai/02-swiss-industrial.webp",
            alt: "Direction board 2: Swiss Industrial homepage concept",
            caption: "Swiss Industrial",
            width: 1200,
            height: 2333,
          },
          {
            src: "/projects/neon-ai/03-research-journal.webp",
            alt: "Direction board 3: Research Journal homepage concept",
            caption: "Research Journal",
            width: 1200,
            height: 2333,
          },
          {
            src: "/projects/neon-ai/04-dimensional-night.webp",
            alt: "Direction board 4: Dimensional Night homepage concept",
            caption: "Dimensional Night",
            width: 1200,
            height: 2333,
          },
          {
            src: "/projects/neon-ai/05-warm-document.webp",
            alt: "Direction board 5: Warm Document homepage concept",
            caption: "Warm Document",
            width: 1200,
            height: 2333,
          },
          {
            src: "/projects/neon-ai/06-dimensional-patent.webp",
            alt: "Direction board 6: Dimensional Patent homepage concept, chosen direction",
            caption: "Dimensional Patent ← chosen",
            width: 1200,
            height: 2333,
          },
        ],
      },
      {
        title: "Decisions I made",
        text: "- **Mobile first:** every text style now has a phone size. In the old site, none did, so headlines on a phone were far too big.\n- **Built to grow:** one shared spacing scale, a 1200px content width, and three breakpoints (desktop, tablet, phone), so a new page or product lines up the same way as the rest.\n- **Type:** Unbounded ExtraBold for headlines so the main message reads in one glance; Geist for body text; Geist Mono for small labels and numbers.\n- **Color with a job:** four colors, each with one meaning. Near-black background, purple for actions, cyan for data, red for things the system catches. Nothing is colored just for decoration.\n- **Accessibility:** WCAG AA contrast, visible keyboard focus, 44px tap targets, and reduced-motion support.",
      },
      {
        title: "Where it is now",
        text: "The new design is in A/B testing right now, running against the old homepage and measured on how many visitors reach out to the team. You can [try the prototype](https://satisfied-bookings-273423.framer.app) or see it on Neon's site at [neon.ai/v2/home](https://neon.ai/v2/home). The site gets thousands of visitors a month. I work on it with the sales and marketing team, and I keep a written list of every design decision so anyone picking it up later knows why things look the way they do.",
      },
    ],
  },
  {
    slug: "tfrrs-monitor",
    languages: ["React", "JavaScript", "Python", "HTML", "CSS"],
    name: "TFRRS Monitor",
    year: "2026",
    category: "web",
    role: "Design & development",
    featuredOrder: 3,
    summary:
      "A qualification tracker that helps athletes and fans follow NCAA standings and the times on the bubble.",
    stack: ["Python", "Pandas", "JavaScript"],
    image: "/images/tfrrs.webp",
    imageAlt:
      "TFRRS Monitor showing the NCAA Division I men’s indoor qualifying marks, with the 16th-place bubble time for each event from the 60 meters to the distance medley relay.",
    markdown: "/projects/tfrrs-monitor.md",
    links: [
      {
        label: "Open tracker",
        url: "https://pierceseigne.com/ncaa-indoor-qualification/",
      },
    ],
  },
  {
    slug: "syllabus-analyzer",
    languages: ["React", "JavaScript", "Python", "HTML", "CSS"],
    name: "AI Syllabus Analyzer",
    year: "2026",
    category: "web",
    role: "Full-stack development",
    featuredOrder: 4,
    summary:
      "Turns course syllabi into an organized view of schedules, grading, staff, and course expectations.",
    stack: ["React", "Python", "Flask"],
    image: "/images/syllabus.webp",
    imageAlt: "Syllabus Analyzer showing the CS571 demo course overview, with course information, an AI-generated summary and learning outcomes",
    markdown: "/projects/syllabus-analyzer.md",
    links: [
      {
        label: "Try the analyzer",
        url: "/syllabus-analyzer/",
      },
    ],
  },
  {
    slug: "resource-allocation-model",
    languages: ["Python", "SQL"],
    name: "Beyond the Ballot Box: Small Donations and Voter Turnout",
    year: "2026",
    category: "data",
    role: "Data analysis & modeling",
    summary:
      "Built a regression workflow around 58 million rows of Federal Election Commission data to study political donor behavior.",
    stack: ["Python", "SQL", "Regression"],
    links: [
      {
        label: "Read the research",
        url: "/documents/resource-allocation.pdf",
      },
    ],
  },
  {
    slug: "ncaa-performance-analysis",
    languages: ["Python"],
    name: "NCAA Performance Trend Analysis",
    year: "2026",
    category: "data",
    role: "Research & statistical modeling",
    summary:
      "Looked at how temperature, altitude, and school selectivity relate to year-over-year improvement across more than 70,000 NCAA Division I distance performances.",
    stack: ["Python", "scikit-learn", "OLS"],
    links: [
      { label: "View source", url: "https://github.com/pseigne/tffrs-scraper" },
    ],
  },
  {
    slug: "time-progress",
    languages: ["JavaScript", "HTML", "CSS"],
    name: "Time Progress Visualizer",
    year: "2026",
    category: "web",
    role: "Design & development",
    summary:
      "A small browser utility for seeing how far you are through a day, month, year, or custom period.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/images/time.webp",
    imageAlt: "Time Progress Visualizer showing 2026 as a grid of dots, with the elapsed days filled in red",
    markdown: "/projects/time-progress.md",
    links: [
      {
        label: "Open visualizer",
        url: "https://pierceseigne.com/time-progress-visualizer/",
      },
    ],
  },
  {
    slug: "running-utilities",
    languages: ["JavaScript", "HTML", "CSS"],
    name: "Running Utilities",
    year: "2026",
    category: "web",
    role: "Design & development",
    summary:
      "Two training tools: a weekly mileage planner and a calculator that turns a goal time into lap splits.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/images/running.webp",
    imageAlt: "Weekly Mileage Planner charting a week of training against a 55-mile goal",
    markdown: "/projects/running-utilities.md",
    links: [
      {
        label: "Mileage planner",
        url: "/running-utilities/#weekly-mileage",
      },
      {
        label: "Track-split calculator",
        url: "/running-utilities/#track-splits",
      },
      {
        label: "View source",
        url: "https://github.com/pseigne/running-utilities",
      },
    ],
  },
  {
    slug: "portfolio-archive",
    languages: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    name: "Personal Portfolio Archive",
    year: "2021–2026",
    category: "web",
    role: "Design & development",
    summary:
      "Four generations of this website, from the first high-school homepage in 2021 to the current V4 portfolio.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "Visit the archive", url: "/#/archive" }],
  },
  {
    slug: "medieval-history-capstone",
    languages: [],
    name: "A Heresy of Blood",
    year: "2025",
    category: "writing",
    role: "Historical research",
    summary:
      "A history capstone examining how the Spanish Inquisition became a political instrument and how ideas of religious faith shifted toward racial identity in early modern Spain.",
    stack: ["History", "Academic writing"],
    links: [
      {
        label: "Read the paper",
        url: "/documents/spanish-inquisition.pdf",
      },
    ],
  },
  {
    slug: "tiktok-song-duration",
    languages: ["Python"],
    name: "TikTok & Song Duration",
    year: "2025",
    category: "data",
    role: "Econometric analysis",
    summary:
      "Explored whether the rise of short-form audio trends is associated with changing song lengths.",
    stack: ["Python", "Spotify API", "Economics"],
    links: [
      {
        label: "Read the research",
        url: "/documents/song-duration.pdf",
      },
    ],
  },
];

export const featuredProjects = projects
  .filter((project) => project.featuredOrder != null)
  .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
export const featuredCount = featuredProjects.length;
export const projectCount = projects.length;

