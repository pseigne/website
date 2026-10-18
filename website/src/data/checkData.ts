import { directory } from "./directory";
import { featuredProjects, projects } from "./projects";

export function checkPortfolioData() {
  const projectSlugs = new Set(projects.map((project) => project.slug));
  const directorySlugs = new Set(directory.map((entry) => entry.slug));

  for (const slug of projectSlugs) {
    if (!directorySlugs.has(slug)) {
      console.warn(`[portfolio] Project slug "${slug}" is missing from directory.ts`);
    }
  }
  for (const slug of directorySlugs) {
    if (!projectSlugs.has(slug)) {
      console.warn(`[portfolio] Directory slug "${slug}" is missing from projects.ts`);
    }
  }

  const orders = new Set<number>();
  for (const project of featuredProjects) {
    if (project.featuredOrder != null) {
      if (orders.has(project.featuredOrder)) {
        console.warn(
          `[portfolio] Duplicate featuredOrder ${project.featuredOrder} on "${project.slug}"`,
        );
      }
      orders.add(project.featuredOrder);
    }
  }
}
