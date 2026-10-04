import { ArrowUpRight } from "lucide-react";
import { projects, resumeUrl } from "../data/projects";

const links = [
  { name: "GitHub", detail: "pseigne", href: "https://github.com/pseigne" },
  { name: "X", detail: "@KingSeigne", href: "https://x.com/KingSeigne" },
  {
    name: "LinkedIn",
    detail: "Pierce Seigne",
    href: "https://www.linkedin.com/in/pierce-seigne-b310a0305/",
  },
  {
    name: "Email",
    detail: "pierceseigne@icloud.com",
    href: "mailto:pierceseigne@icloud.com",
  },
  { name: "Résumé", detail: "View PDF", href: resumeUrl },
];

export default function NavigationPages({ page }: { page: "blog" | "links" }) {
  return (
    <main id="main-content" tabIndex={-1} className="navigation-page">
      <h1>{page === "blog" ? "Blog" : "Links"}</h1>
      {page === "blog" ? (
        <p className="lead">No posts yet.</p>
      ) : (
        <>
          <section aria-labelledby="project-links-title">
            <h2 id="project-links-title">Projects</h2>
            <ul className="directory-links">
              {projects.flatMap((project) =>
                project.links.map((link) => (
                  <li key={`${project.slug}-${link.url}`}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      <span>
                        <strong>
                          {project.name}
                          {project.links.length > 1 ? ` · ${link.label}` : ""}
                        </strong>
                        <span>
                          {project.year} · {link.label}
                        </span>
                      </span>
                      <ArrowUpRight size={20} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )),
              )}
            </ul>
          </section>
          <section aria-labelledby="personal-links-title">
            <h2 id="personal-links-title">Elsewhere</h2>
            <ul className="directory-links">
              {links.map(({ name, detail, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target={name === "Email" ? undefined : "_blank"}
                    rel="noreferrer"
                  >
                    <span>
                      <strong>{name}</strong>
                      <span>{detail}</span>
                    </span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                    {name !== "Email" && (
                      <span className="sr-only"> (opens in a new tab)</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
