import { useState } from "react";
import { Link } from "react-router-dom";
import { Code, Database, BookOpen } from "lucide-react";
import DetailIndicator from "./DetailIndicator";
import { projects, type Category } from "../data/projects";
const filters: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "web", label: "Web & products" },
  { id: "data", label: "Data & research" },
  { id: "writing", label: "Writing" },
];
export default function ProjectBrowser() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const visible = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );
  return (
    <>
      <p className="lead">A collection of ideas taken a little further.</p>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {filters.map((item) => (
          <button
            key={item.id}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {visible.length} projects
      </p>
      <div className="project-list">
        {visible.map((project) => {
          const Icon =
            project.category === "data"
              ? Database
              : project.category === "writing"
                ? BookOpen
                : Code;
          return (
            <Link
              className="project-list-item"
              key={project.slug}
              to={`/projects/${project.slug}`}
              state={{ fromPortfolio: true }}
            >
              <div className="project-list-heading">
                {project.slug === "neon-ai" ||
                project.slug === "brainforge-coder-cards" ? (
                  <img
                    src={
                      project.slug === "neon-ai"
                        ? "/logos/neon.png"
                        : "/logos/coder.svg"
                    }
                    alt=""
                    width="24"
                    height="24"
                  />
                ) : (
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                )}
                <h2>{project.name}</h2>
                <DetailIndicator />
              </div>
              <div className="project-list-image">
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                ) : (
                  <Icon size={60} strokeWidth={1} aria-hidden="true" />
                )}
              </div>
              <p>{project.summary}</p>
              <span className="small-label">
                {project.year} · {project.role}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
