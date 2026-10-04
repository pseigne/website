import type { ReactNode } from "react";
import { usStates, mapLocations } from "../data/usMap";

function BrowserFrame({
  children,
  className = "",
  address,
}: {
  children: ReactNode;
  className?: string;
  address: string;
}) {
  return (
    <div className={`art-browser ${className}`}>
      <div className="art-browser-bar" aria-hidden="true">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{address}</span>
      </div>
      {children}
    </div>
  );
}

export function CoderArtwork() {
  return (
    <div className="project-art coder-art">
      <div className="coder-scene">
        <img
          className="coder-back coder-back-one"
          src="/images/coder-card-octocat.webp"
          alt=""
          width="1440"
          height="1080"
          aria-hidden="true"
        />
        <img
          className="coder-back coder-back-two"
          src="/images/coder-card-karpathy.webp"
          alt=""
          width="1440"
          height="1080"
          aria-hidden="true"
        />
        <img
          className="coder-front"
          src="/images/coder-card.webp"
          alt="An example BrainForge Coder Card showing coding style, activity, and language visualizations."
          width="1200"
          height="900"
        />
      </div>
    </div>
  );
}

export function NeonArtwork() {
  return (
    <div className="project-art neon-art">
      <BrowserFrame className="neon-browser" address="neon.ai">
        <img
          src="/images/neon-site-current.webp"
          alt="Neon.ai’s website displayed in a browser, with the headline Own your AI. Don’t rent it."
          width="1440"
          height="1365"
          loading="lazy"
        />
      </BrowserFrame>
    </div>
  );
}

export function ProjectArtwork() {
  return (
    <div className="collection-art" aria-hidden="true">
      <BrowserFrame
        className="collection-window collection-time"
        address="Time Progress"
      >
        <img
          src="/images/time.webp"
          alt=""
          width="1024"
          height="1024"
          loading="lazy"
        />
      </BrowserFrame>
      <BrowserFrame
        className="collection-window collection-tfrrs"
        address="TFRRS Monitor"
      >
        <img
          src="/images/tfrrs-placeholder.svg"
          alt=""
          width="1024"
          height="1024"
          loading="lazy"
        />
      </BrowserFrame>
      <BrowserFrame
        className="collection-window collection-syllabus"
        address="Syllabus Analyzer"
      >
        <img
          src="/images/syllabus-placeholder.svg"
          alt=""
          width="1024"
          height="1024"
          loading="lazy"
        />
      </BrowserFrame>
    </div>
  );
}

export function SyllabusArtwork() {
  return (
    <div className="syllabus-art" aria-hidden="true">
      <div className="syllabus-paper">
        <span>COURSE OUTLINE</span>
        <i />
        <i />
        <i />
        <i />
      </div>
      <BrowserFrame className="syllabus-browser" address="Syllabus Analyzer">
        <img
          src="/images/syllabus-placeholder.svg"
          alt=""
          width="1024"
          height="1024"
          loading="lazy"
        />
      </BrowserFrame>
    </div>
  );
}

export function EducationArtwork() {
  return (
    <div className="education-art">
      <div className="education-book book-wisconsin">
        <img src="/logos/wisconsin.svg" alt="" width="44" height="54" />
        <h3>Economics</h3>
        <p>
          Computer Science
          <br />& History minors
        </p>
        <span className="book-school">Wisconsin–Madison</span>
        <span className="book-year">Class of 2026</span>
      </div>
      <div className="education-book book-uva">
        <img src="/logos/uva.ico" alt="" width="44" height="44" />
        <h3>Public Policy</h3>
        <p>Master’s studies</p>
        <span className="book-school">University of Virginia</span>
        <span className="book-year">Expected 2028</span>
      </div>
    </div>
  );
}

export function RouteArtwork() {
  const [norwich, madison, charlottesville] = mapLocations;
  return (
    <svg
      className="route-art us-map"
      viewBox="480 45 520 430"
      role="img"
      aria-labelledby="location-map-title"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="location-map-title">
        Norwich, VT (2003–2022), Madison, WI (2022–2026), Charlottesville, VA
        (2026–present)
      </title>
      <g className="map-states">
        {usStates.map((state) => (
          <path
            key={state.id}
            data-state={state.id}
            d={state.path}
            className={
              ["50", "55", "51"].includes(state.id) ? "map-home-state" : ""
            }
          />
        ))}
      </g>
      <path
        className="route-path route-leg route-leg-one"
        pathLength="1"
        fill="none"
        d={`M${norwich.x},${norwich.y} Q${(norwich.x + madison.x) / 2},${Math.min(norwich.y, madison.y) - 80} ${madison.x},${madison.y}`}
      />
      <path
        className="route-path route-leg route-leg-two"
        pathLength="1"
        fill="none"
        d={`M${madison.x},${madison.y} Q${madison.x + 30},${charlottesville.y + 40} ${charlottesville.x},${charlottesville.y}`}
      />
      {mapLocations.map((location, index) => (
        <g
          key={location.name}
          className={`location-stop location-stop-${index}`}
        >
          <circle
            className="map-pin-halo"
            cx={location.x}
            cy={location.y}
            r="14"
          />
          <circle className="map-pin" cx={location.x} cy={location.y} r="7" />
          <text
            className="map-label"
            x={[765, 562, 660][index]}
            y={[110, 260, 355][index]}
          >
            <tspan x={[765, 562, 660][index]}>{location.name}</tspan>
            <tspan className="map-year" x={[765, 562, 660][index]} dy="25">
              {["2003–2022", "2022–2026", "2026–present"][index]}
            </tspan>
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ResumeArtwork() {
  return (
    <div className="resume-art" aria-hidden="true">
      <div className="resume-sheet">
        <strong>PS</strong>
        <i />
        <i />
        <i />
        <div className="resume-sheet-section">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

export function GitHubMark() {
  return (
    <svg
      className="github-mark"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.3 1.8 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2 .7.8 .6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export function EnvelopeArtwork() {
  return (
    <div className="envelope-art" aria-hidden="true">
      <div className="envelope-note">
        <span>Hello,</span>
        <span>Pierce.</span>
      </div>
      <div className="envelope-body">
        <div className="envelope-flap" />
        <span className="envelope-seal">PS</span>
      </div>
    </div>
  );
}

export function TrackArtwork() {
  return (
    <svg
      className="track-art"
      viewBox="0 0 160 85"
      fill="none"
      aria-hidden="true"
    >
      <path d="M-20 77H91a32 32 0 0 0 0-64H-20M-20 65H91a20 20 0 0 0 0-40H-20M-20 53H91a8 8 0 0 0 0-16H-20" />
    </svg>
  );
}
