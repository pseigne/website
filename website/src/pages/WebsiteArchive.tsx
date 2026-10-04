import { ArrowUpRight } from "lucide-react";
import { siteVersions } from "../data/siteVersions";

export default function WebsiteArchive() {
  return (
    <>
      <p className="lead">
        Four versions, from a high-school homepage to this one.
      </p>
      <ol className="archive-list">
        {siteVersions.map((site) => (
          <li key={site.version}>
            <a
              href={site.href}
              className="archive-preview"
              aria-label={`Visit ${site.version}: ${site.name}`}
            >
              <img
                src={site.preview}
                alt={`${site.version} website homepage`}
                width="960"
                height="720"
                loading="lazy"
              />
            </a>
            <div className="archive-copy">
              <p className="archive-version">
                {site.version} · {site.year}
                {site.version === "V4" ? " · Current" : ""}
              </p>
              <h2>
                <a href={site.href}>
                  {site.name} <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              </h2>
              <p>{site.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="archive-note">
        Older versions preserve their original designs. Some unfinished pages
        and external links are no longer available.
      </p>
    </>
  );
}
