import { ArrowUpRight } from "lucide-react";
import { GitHubMark } from "./TileArtwork";

function LinkedInMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function XMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26L22.827 21.75H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.173 2.25H8l4.713 6.231 5.531-6.231Zm-1.161 17.52h1.833L7.004 4.126H5.037L17.083 19.77Z" />
    </svg>
  );
}

export default function SocialsTile() {
  return (
    <section
      className="tile github-tile socials-tile"
      aria-label="Social profiles"
    >
      <nav className="social-links" aria-label="Social profiles">
        <a
          aria-label="GitHub (opens in a new tab)"
          className="social-github"
          href="https://github.com/pseigne"
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-mark">
            <GitHubMark />
          </span>
          <img
            className="social-portrait"
            src="/images/github-avatar.png"
            alt=""
            aria-hidden="true"
            width="32"
            height="32"
          />
          <ArrowUpRight
            className="social-tab-arrow"
            size={12}
            aria-hidden="true"
          />
        </a>
        <a
          aria-label="X (opens in a new tab)"
          className="social-x"
          href="https://x.com/KingSeigne"
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-mark">
            <XMark />
          </span>
          <img
            className="social-portrait"
            src="/images/x-avatar.jpg"
            alt=""
            aria-hidden="true"
            width="32"
            height="32"
          />
          <ArrowUpRight
            className="social-tab-arrow"
            size={12}
            aria-hidden="true"
          />
        </a>
        <a
          aria-label="LinkedIn (opens in a new tab)"
          className="social-linkedin"
          href="https://www.linkedin.com/in/pierce-seigne-b310a0305"
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-mark">
            <LinkedInMark />
          </span>
          <img
            className="social-portrait"
            src="/images/linkedin-avatar.jpg"
            alt=""
            aria-hidden="true"
            width="32"
            height="32"
          />
          <ArrowUpRight
            className="social-tab-arrow"
            size={12}
            aria-hidden="true"
          />
        </a>
      </nav>
    </section>
  );
}
