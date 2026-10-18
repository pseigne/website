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
  featuredOrder?: number;
  markdown?: string;
  sections?: ProjectSection[];
}
export const resumeUrl = "/resume/Pierce-Seigne-Resume.pdf";
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
      "Designed Neon.ai’s public website, presenting its AI products and technology through a cohesive visual experience.",
    stack: [],
    image: "/images/neon-site-current.webp",
    imageAlt:
      "Neon.ai website featuring the headline Own your AI. Don’t rent it.",
    links: [{ label: "Visit Neon.ai", url: "https://www.neon.ai/" }],
    sections: [
      {
        title: "Making the technology approachable",
        text: "The website brings Neon.ai’s products and technology into a unified public-facing experience. My contribution was the website design, with attention to visual hierarchy and how visitors move through the company’s offering.",
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
    summary:
      "A qualification tracker that helps athletes and fans follow NCAA standings and the times on the bubble.",
    stack: ["Python", "Pandas", "JavaScript"],
    image: "/images/tfrrs-placeholder.svg",
    imageAlt: "TFRRS Monitor placeholder — preview coming soon",
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
    name: "Strategic Resource Allocation Model",
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
      "Studied the relationship between institutional funding, environmental factors, and collegiate athletic performance.",
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
      "Practical tools for planning weekly mileage and calculating precise track splits.",
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
