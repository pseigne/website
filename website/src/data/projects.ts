export type Category = "web" | "data" | "writing";
export interface Project {
  slug: string;
  name: string;
  year: string;
  category: Category;
  role: string;
  summary: string;
  stack: string[];
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
    name: "BrainForge Coder Cards",
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
      "An example BrainForge Coder Card for pseigne, with coding style, activity, and language visualizations.",
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
        text: "The result is BrainForge Coder Cards: a way for developers to generate and share their coding identity. The card shown here is an example output; its scores and predictions are product-generated descriptions, not independently verified measures of ability.",
      },
    ],
  },
  {
    slug: "neon-ai",
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
    name: "TFRRS Monitor",
    year: "2026",
    category: "web",
    role: "Design & development",
    summary:
      "A qualification tracker that helps athletes and fans follow NCAA standings and the times on the bubble.",
    stack: ["Python", "Pandas", "JavaScript"],
    image: "/images/tfrrs.webp",
    imageAlt: "TFRRS Monitor project preview",
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
    name: "AI Syllabus Analyzer",
    year: "2026",
    category: "web",
    role: "Full-stack development",
    summary:
      "Turns course syllabi into an organized view of schedules, grading, staff, and course expectations.",
    stack: ["React", "Python", "Flask"],
    image: "/images/syllabus.webp",
    imageAlt: "Syllabus Analyzer project preview",
    markdown: "/projects/syllabus-analyzer.md",
    links: [
      {
        label: "Try the analyzer",
        url: "https://pierceseigne.com/tldr-syllabus-frontend/",
      },
    ],
  },
  {
    slug: "resource-allocation-model",
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
        url: "https://drive.google.com/file/d/1eSgtvOA0Uex2MF7bXME-KVdHfH7MAkje/view",
      },
    ],
  },
  {
    slug: "ncaa-performance-analysis",
    name: "NCAA Performance Trend Analysis",
    year: "2026",
    category: "data",
    role: "Research & statistical modeling",
    summary:
      "Studied the relationship between institutional funding, environmental factors, and collegiate athletic performance.",
    stack: ["Python", "scikit-learn", "OLS"],
    links: [
      { label: "View source", url: "https://github.com/pseigne/ncaa-analysis" },
    ],
  },
  {
    slug: "time-progress",
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
        url: "https://pierceseigne.com/weekly-mileage-planner/",
      },
      {
        label: "Track-split calculator",
        url: "https://pierceseigne.com/track-split-calculator/",
      },
    ],
  },
  {
    slug: "portfolio-v1",
    name: "Personal Portfolio V1",
    year: "2025",
    category: "web",
    role: "Design & development",
    summary:
      "The original hand-coded portfolio, preserved as a snapshot of where this site began.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "Visit the archive", url: "/legacy/index.html" }],
  },
  {
    slug: "medieval-history-capstone",
    name: "Medieval History Capstone",
    year: "2025",
    category: "writing",
    role: "Historical research",
    summary:
      "A capstone paper examining medieval crime, punishment, and judicial practices through primary and secondary sources.",
    stack: ["History", "Academic writing"],
    links: [
      {
        label: "Read the paper",
        url: "https://drive.google.com/file/d/1KioHun1GVjmyse1EV8js8v1RV5qs5Jj3/view",
      },
    ],
  },
  {
    slug: "tiktok-song-duration",
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
        url: "https://drive.google.com/file/d/1eSgtvOA0Uex2MF7bXME-KVdHfH7MAkje/view",
      },
    ],
  },
];
