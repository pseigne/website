import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  MapPin,
  GraduationCap,
  Layers,
  FileText,
  Moon,
  Sun,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TypingRoles from "../components/TypingRoles";
import Greeting from "../components/Greeting";
import ExperienceDock from "../components/ExperienceDock";
import SocialsTile from "../components/SocialsTile";
import VideoPlayer from "../components/VideoPlayer";
import DetailIndicator from "../components/DetailIndicator";
import {
  CoderArtwork,
  NeonArtwork,
  ProjectArtwork,
  EducationArtwork,
  RouteArtwork,
  EnvelopeArtwork,
  TrackArtwork,
  SyllabusArtwork,
  ResumeArtwork,
} from "../components/TileArtwork";

gsap.registerPlugin(useGSAP);
const detailState = { fromPortfolio: true };

export default function Home({
  theme,
  onToggleTheme,
}: {
  theme: string;
  onToggleTheme: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".tile", {
          y: 12,
          opacity: 0,
          stagger: 0.025,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <main
      ref={root}
      id="main-content"
      tabIndex={-1}
      className="bento-grid board"
    >
      <section className="tile introduction" aria-labelledby="intro-title">
        <div className="intro-topline">
          <button
            className="icon-button theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon size={18} aria-hidden="true" />
            ) : (
              <Sun size={18} aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="intro-copy">
          <Greeting />
          <p>
            Associate engineer at{" "}
            <span className="inline-brand">
              <img src="/logos/neon.png" alt="" width="20" height="20" />
              Neon.ai
            </span>
            , working across sales and marketing. Public Policy student at{" "}
            <span className="inline-brand">
              <img src="/logos/uva.ico" alt="" width="20" height="20" />
              UVA
            </span>
            .
          </p>
        </div>
        <TypingRoles />
      </section>

      <figure className="tile photo-tile">
        <img
          className="photo-default"
          src="/images/pierce.webp"
          alt="Pierce with his Wisconsin track coaches at the track"
          width="1200"
          height="800"
          fetchPriority="high"
        />
        <img
          className="photo-hover"
          src="/images/pierce-hover.jpg"
          alt=""
          aria-hidden="true"
          width="1086"
          height="724"
        />
        <figcaption>
          <span>Madison, WI</span>
        </figcaption>
      </figure>

      <Link
        className="tile coder-tile project-tile"
        to="/projects/brainforge-coder-cards"
        state={detailState}
        aria-label="Explore Coder Cards"
      >
        <div className="tile-heading">
          <span className="tile-identity">
            <img src="/logos/coder.svg" alt="" width="24" height="24" />
            Coder Cards
          </span>
          <DetailIndicator />
        </div>
        <CoderArtwork />
        <div className="project-caption">
          <h2>Your GitHub Identity</h2>
          <p>Product design & frontend</p>
        </div>
      </Link>

      <Link
        className="tile neon-tile project-tile"
        to="/projects/neon-ai"
        state={detailState}
        aria-label="Explore Neon.ai Website"
      >
        <div className="tile-heading">
          <span className="tile-identity">
            <img src="/logos/neon.png" alt="" width="24" height="24" />
            Neon.ai Website
          </span>
          <DetailIndicator />
        </div>
        <NeonArtwork />
        <div className="project-caption">
          <h2>Private, fine-tuned, conversational AI.</h2>
          <p>Website design</p>
        </div>
      </Link>

      <section className="tile athletics-tile">
        <VideoPlayer compact playOnHover />
        <TrackArtwork />
        <Link
          className="athletics-detail"
          to="/athletics"
          state={detailState}
          aria-label="Explore athletics"
        >
          <DetailIndicator />
        </Link>
        <div className="athletics-copy">
          <span className="small-label">Track & cross country</span>
          <h2>Always in motion.</h2>
        </div>
      </section>

      <Link
        className="tile education-tile"
        to="/education"
        state={detailState}
        aria-label="Explore education and coursework"
      >
        <h2 id="education-title" className="tile-identity">
          <GraduationCap size={20} strokeWidth={1.7} aria-hidden="true" />
          Education
        </h2>
        <DetailIndicator />
        <EducationArtwork />
      </Link>

      <Link
        className="tile all-projects-tile"
        to="/projects"
        state={detailState}
        aria-label="Explore all projects"
      >
        <div className="tile-heading">
          <span className="tile-identity">
            <Layers size={20} strokeWidth={1.7} aria-hidden="true" />
            Projects
          </span>
          <DetailIndicator />
        </div>
        <ProjectArtwork />
        <div className="project-caption">
          <h2>More things I’ve made.</h2>
          <p>Code, data & history.</p>
        </div>
      </Link>

      <section className="tile places-tile">
        <h2 className="tile-identity">
          <MapPin size={20} strokeWidth={1.7} aria-hidden="true" />
          Location
        </h2>
        <RouteArtwork />
      </section>

      <section className="tile contact-tile">
        <span className="tile-identity">
          <Mail size={20} strokeWidth={1.7} aria-hidden="true" />
          Say hello
        </span>
        <h2>Send me a message</h2>
        <div className="contact-bottom">
          <a className="contact-email" href="mailto:pierceseigne@icloud.com">
            Email me <ArrowRight size={17} aria-hidden="true" />
          </a>
          <div className="contact-graphic">
            <EnvelopeArtwork />
          </div>
        </div>
      </section>

      <section className="tile tools-tile" aria-labelledby="tools-title">
        <h2 id="tools-title">Experience with</h2>
        <ExperienceDock />
      </section>

      <section className="tile resume-tile">
        <Link className="resume-link" to="/resume" state={detailState}>
          <ArrowUpRight
            className="shortcut-arrow"
            size={19}
            aria-hidden="true"
          />
          <FileText size={28} strokeWidth={1.5} aria-hidden="true" />
          <span>Résumé</span>
          <ResumeArtwork />
        </Link>
        <footer className="board-meta">
          <span>© {new Date().getFullYear()}</span>
          <Link to="/archive">
            Previous versions <ArrowUpRight size={11} aria-hidden="true" />
          </Link>
        </footer>
      </section>

      <SocialsTile />

      <Link
        className="tile syllabus-tile project-tile"
        to="/projects/syllabus-analyzer"
        state={detailState}
        aria-label="Explore AI Syllabus Analyzer"
      >
        <div className="tile-heading">
          <span className="tile-identity">
            <FileText size={20} strokeWidth={1.7} aria-hidden="true" />
            Syllabus Analyzer
          </span>
          <DetailIndicator />
        </div>
        <SyllabusArtwork />
        <div className="project-caption">
          <h2>
            A semester,
            <br />
            made simpler.
          </h2>
          <p>Full-stack development</p>
        </div>
      </Link>
    </main>
  );
}
