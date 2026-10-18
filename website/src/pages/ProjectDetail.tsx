import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Project } from "../data/projects";
import BeforeAfter from "../components/BeforeAfter";
import MarkdownArticle from "../components/MarkdownArticle";
export default function ProjectDetail({ project }: { project: Project }) {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const otherTools = project.stack.filter(
    (tool) => !project.languages.includes(tool),
  );
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
            rel="noopener noreferrer"
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
      {project.beforeAfter && (
        <BeforeAfter
          before={project.beforeAfter.before}
          after={project.beforeAfter.after}
        />
      )}
      {project.languages.length > 0 && (
        <ul className="stack-list language-tags" aria-label="Project languages">
          {project.languages.map((language) => (
            <li key={language}>
              <Link
                to={`/languages/${language.toLowerCase()}`}
                state={{ fromPortfolio: true }}
              >
                {language}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {otherTools.length > 0 && (
        <ul className="stack-list" aria-label="Tools and disciplines">
          {otherTools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      )}
      {project.sections?.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ children, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {section.text}
          </ReactMarkdown>
          {section.images && section.images.length > 0 && (
            <div
              className={[
                "section-gallery",
                (section.columns === 3 || section.images.length >= 3) &&
                  "section-gallery-3",
                section.mobileColumns === 2 && "section-gallery-mobile-2",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {section.images.map((img) => (
                <figure className="section-figure" key={img.src}>
                  {img.darkSrc ? (
                    <>
                      <img
                        className="theme-image-light"
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                      />
                      <img
                        className="theme-image-dark"
                        src={img.darkSrc}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                      />
                    </>
                  ) : (
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                    />
                  )}
                  <figcaption>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      ))}
      {project.video && (
        <figure className="case-image case-video">
          {reducedMotion ? (
            <img
              src={project.video.poster}
              alt={`${project.name} walkthrough preview`}
              width="1440"
              height="900"
              loading="lazy"
            />
          ) : (
            <video
              src={project.video.src}
              poster={project.video.poster}
              autoPlay
              muted
              loop
              playsInline
              width="1440"
              height="900"
            />
          )}
          <figcaption>
            <span>24-second product walkthrough</span>
          </figcaption>
        </figure>
      )}
      {project.markdown && (
        <MarkdownArticle key={project.markdown} url={project.markdown} />
      )}
    </article>
  );
}
