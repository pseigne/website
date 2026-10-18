import { Link } from "react-router-dom";
import { ArrowRight, Code } from "lucide-react";
import DetailIndicator from "./DetailIndicator";
import {
  featuredCount,
  featuredProjects,
  projectCount,
} from "../data/projects";
export default function ProjectBrowser() {
  return (
    <>
      <p className="lead">The four projects I’d show you first.</p>
      <div className="selected-work-summary">
        <p className="result-count">{featuredCount} featured projects</p>
        <Link to="/links">
          See all {projectCount} in Links{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <ul className="project-list">
        {featuredProjects.map((project) => {
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
