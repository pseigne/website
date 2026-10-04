export interface ProjectPreview {
  id: string;
  label: string;
  url: string;
  type: "app" | "pdf" | "notebook";
}
export interface DirectoryEntry {
  slug: string;
  label: string;
  group: "Web Apps" | "Websites" | "Data Analysis" | "Writing";
  source?: string;
  previews: ProjectPreview[];
}
export const directory: DirectoryEntry[] = [
  { slug: "brainforge-coder-cards", label: "Coder Cards", group: "Web Apps", previews: [{ id: "app", label: "Try app", url: "https://codercards.ai/", type: "app" }] },
  { slug: "syllabus-analyzer", label: "Syllabus", group: "Web Apps", previews: [{ id: "app", label: "Try app", url: "/syllabus-analyzer/", type: "app" }] },
  { slug: "running-utilities", label: "Running Utilities", group: "Web Apps", source: "https://github.com/pseigne/running-utilities", previews: [{ id: "app", label: "Try app", url: "/running-utilities/", type: "app" }] },
  { slug: "tfrrs-monitor", label: "TFRRS Monitor", group: "Web Apps", source: "https://github.com/pseigne/ncaa-indoor-qualification", previews: [{ id: "app", label: "Try app", url: "/ncaa-indoor-qualification/", type: "app" }] },
  { slug: "time-progress", label: "Time Progress", group: "Web Apps", source: "https://github.com/pseigne/time-progress-visualizer", previews: [{ id: "app", label: "Try app", url: "/time-progress-visualizer/", type: "app" }] },
  { slug: "neon-ai", label: "Neon.ai", group: "Websites", previews: [{ id: "app", label: "Website", url: "https://www.neon.ai/", type: "app" }] },
  { slug: "portfolio-archive", label: "My Portfolio", group: "Websites", source: "https://github.com/pseigne/website", previews: [{ id: "app", label: "Website", url: "/", type: "app" }] },
  { slug: "resource-allocation-model", label: "Resource Allocation", group: "Data Analysis", previews: [{ id: "paper", label: "Paper", url: "/documents/resource-allocation.pdf", type: "pdf" }, { id: "analysis", label: "Analysis", url: "/documents/resource-allocation-analysis.html", type: "notebook" }] },
  { slug: "ncaa-performance-analysis", label: "NCAA Performance Trends", group: "Data Analysis", source: "https://github.com/pseigne/tffrs-scraper", previews: [{ id: "analysis", label: "Seasonal analysis", url: "/legacy/pages/seasonal_eda.html", type: "notebook" }, { id: "distance", label: "Distance analysis", url: "/legacy/pages/tffrs_distance_eda.html", type: "notebook" }] },
  { slug: "tiktok-song-duration", label: "TikTok & Song Duration", group: "Data Analysis", previews: [{ id: "paper", label: "Paper", url: "/documents/song-duration.pdf", type: "pdf" }] },
  { slug: "medieval-history-capstone", label: "History Capstone", group: "Writing", previews: [{ id: "paper", label: "Paper", url: "/documents/spanish-inquisition.pdf", type: "pdf" }] },
];
export const directoryGroups = ["Web Apps", "Websites", "Data Analysis", "Writing"] as const;
