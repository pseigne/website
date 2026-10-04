import { Link } from "react-router-dom";
import { ArrowRight, Code } from "lucide-react";
import DetailIndicator from "./DetailIndicator";
import { projects } from "../data/projects";
const selectedSlugs = [
  "brainforge-coder-cards",
  "neon-ai",
  "tfrrs-monitor",
  "syllabus-analyzer",
];
export default function ProjectBrowser() {
  const visible = projects.filter((project) =>
    selectedSlugs.includes(project.slug),
  );
  return (
    <>
      <p className="lead">A collection of ideas taken a little further.</p>
      <div className="selected-work-summary">
        <p className="result-count">{visible.length} projects</p>
        <Link to="/links">
          See all <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <ul className="project-list">
        {visible.map((project) => {
          const Icon = Code;
          return (
            <li key={project.slug}>
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
            </li>
          );
        })}
      </ul>
    </>
  );
}
