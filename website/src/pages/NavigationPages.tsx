import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import MarkdownArticle from "../components/MarkdownArticle";
import { emailAddress, linkedinUrl, mailtoUrl } from "../data/links";
import { formatPostDate, posts } from "../data/posts";
import { projects, resumeUrl } from "../data/projects";
import WebsiteArchive from "./WebsiteArchive";

const links = [
  { name: "GitHub", detail: "pseigne", href: "https://github.com/pseigne" },
  { name: "X", detail: "@KingSeigne", href: "https://x.com/KingSeigne" },
  {
    name: "LinkedIn",
    detail: "Pierce Seigne",
    href: linkedinUrl,
  },
  {
    name: "Email",
    detail: emailAddress,
    href: mailtoUrl,
  },
  { name: "Résumé", detail: "View PDF", href: resumeUrl },
];

const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export default function NavigationPages({
  page,
  postSlug,
}: {
  page: "blog" | "links" | "archive";
  postSlug?: string;
}) {
  const activePost =
    page === "blog" && postSlug
      ? posts.find((item) => item.slug === postSlug)
      : undefined;

  if (page === "blog" && postSlug) {
    return (
      <main id="main-content" tabIndex={-1} className="navigation-page">
        {activePost ? (
          <article className="prose blog-post">
            <Link to="/blog" className="blog-back-link">
              ← All posts
            </Link>
            <h1>{activePost.title}</h1>
            <p className="blog-post-date">
              <time dateTime={activePost.date}>
                {formatPostDate(activePost.date)}
              </time>
            </p>
            <MarkdownArticle
              key={activePost.markdown}
              url={activePost.markdown}
            />
          </article>
        ) : (
          <div className="prose blog-post">
            <Link to="/blog" className="blog-back-link">
              ← All posts
            </Link>
            <h1>Page not found</h1>
            <p>
              This page isn’t here. <Link to="/">Return to the homepage.</Link>
            </p>
          </div>
        )}
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1} className="navigation-page">
      <h1>
        {page === "blog"
          ? "Blog"
          : page === "archive"
            ? "Website archive"
            : "Links"}
      </h1>
      {page === "archive" ? (
        <WebsiteArchive />
      ) : page === "blog" ? (
        <ul className="directory-links blog-list">
          {sortedPosts.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>
                <span>
                  <strong>{post.title}</strong>
                  <time dateTime={post.date} className="blog-list-date">
                    {formatPostDate(post.date)}
                  </time>
                  <span className="blog-list-summary">{post.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
