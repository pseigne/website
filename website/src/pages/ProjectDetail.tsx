import { useEffect, useState } from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Project } from "../data/projects";
function MarkdownCaseStudy({ url }: { url: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (
          !response.ok ||
          response.headers.get("content-type")?.includes("text/html")
        )
          throw new Error("Unavailable");
        return response.text();
      })
      .then(setContent)
      .catch((error) => {
        if (error.name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, [url]);
  if (failed)
    return (
      <p role="status">
        The full write-up couldn’t load. You can still explore the project using
        the link above.
      </p>
    );
  if (content === null) return <p role="status">Loading the write-up…</p>;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children, ...props }) => (
          <a {...props} target="_blank" rel="noreferrer">
            {children}
          </a>
        ),
        table: ({ children, ...props }) => (
          <div className="table-scroll">
            <table {...props}>{children}</table>
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="prose project-detail">
      <p className="project-role">
        {project.role} <span>· {project.year}</span>
      </p>
      <p className="lead">{project.summary}</p>
      <div className="project-actions">
        {project.links.map((link) => (
          <a
            className="primary-button"
            href={link.url}
            target="_blank"
            rel="noreferrer"
            key={link.url}
          >
            {link.label}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        ))}
      </div>
      {project.image && (
        <figure className="case-image">
          <img
            src={project.image}
            alt={project.imageAlt}
            width="1200"
            height="900"
          />
          {project.fullImage && (
            <figcaption>
              <span>Example product output</span>
              <a href={project.fullImage} target="_blank" rel="noreferrer">
                View full-size card <Expand size={15} aria-hidden="true" />
              </a>
            </figcaption>
          )}
        </figure>
      )}
      {project.stack.length > 0 && (
        <ul className="stack-list" aria-label="Tools and disciplines">
          {project.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      )}
      {project.sections?.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
      {project.markdown && (
        <MarkdownCaseStudy key={project.markdown} url={project.markdown} />
      )}
    </article>
  );
}
