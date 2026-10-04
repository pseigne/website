export type Category = "web" | "data" | "writing";
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
  featuredOrder?: number;
  markdown?: string;
  sections?: { title: string; text: string }[];
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
      "Turned the idea of a personal coding identity into a shareable developer card. Designed the initial concept, built the prototype, and refined the frontend alongside Neon.ai’s engineering team.",
    stack: [],
    links: [{ label: "Generate your card", url: "https://codercards.ai/" }],
    image: "/images/coder-card.webp",
    fullImage: "/images/coder-card-original.png",
    imageAlt:
      "An example Coder Card for pseigne, with coding style, activity, and language visualizations.",
    sections: [
      {
        title: "The idea",
        text: "Code has a personal voice: vocabulary, structure, rhythm, and different ways of solving the same problem. During my summer internship at Neon.ai, a team prototype for personalized AI coding sparked a question: what would a visual identity for a developer look like?",
      },
      {
        title: "From sketch to prototype",
        text: "I developed the Coder Identity Card concept, sketched the first designs, and built a working prototype using Cursor. The layout brought coding characteristics together in a SaaS-inspired bento grid, which I presented to the team as v0.2.",
      },
      {
        title: "Built together",
        text: "I worked on the frontend layouts, color palettes, and visual presentation, incorporating feedback from the team. Neon.ai’s engineering team built out the backend that powers the analysis.",
      },
      {
        title: "A live product",
        text: "The result is Coder Cards: a way for developers to generate and share their coding identity. The card shown here is an example output; its scores and predictions are product-generated descriptions, not independently verified measures of ability.",
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
    image: "/images/syllabus-placeholder.svg",
    imageAlt: "Syllabus Analyzer placeholder — preview coming soon",
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
    imageAlt: "Time Progress Visualizer preview",
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
    links: [
      {
        label: "Mileage planner",
        url: "/running-utilities/#weekly-mileage",
      },
      {
        label: "Track-split calculator",
        url: "/running-utilities/#track-splits",
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
