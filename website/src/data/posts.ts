export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  markdown: string;
}

export const posts: Post[] = [
  {
    slug: "welcome",
    title: "Welcome to my website",
    date: "2026-10-01",
    summary: "What this site is, who I am, and what I'll write about here.",
    markdown: "/blog/welcome.md",
  },
  {
    slug: "how-coder-cards-started",
    title: "How Coder Cards started",
    date: "2026-09-15",
    summary:
      "Where the idea for Coder Cards came from, and how it went from a sketch to a live product.",
    markdown: "/blog/how-coder-cards-started.md",
  },
];

export function formatPostDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
