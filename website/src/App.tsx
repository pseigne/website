import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import DetailDialog from "./components/DetailDialog";
import ProjectBrowser from "./components/ProjectBrowser";
import { AthleticsContent } from "./components/PersonalDetails";
import ResumePreview from "./components/ResumePreview";
import NavigationPages from "./pages/NavigationPages";
import { projects } from "./data/projects";
import "./App.css";
import "./TileArtwork.css";
import "./BentoBoard.css";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  const path = location.pathname;
  const isNavigationPage = path === "/blog" || path === "/links";
  const project = projects.find((item) => path === `/projects/${item.slug}`);
  const title =
    project?.name ??
    (path === "/blog"
      ? "Blog"
      : path === "/links"
        ? "Links"
        : path === "/projects"
          ? "Selected work"
          : path === "/athletics"
            ? "Life beyond the laptop"
            : path === "/resume"
              ? "Résumé"
              : "Page not found");
  useEffect(() => {
    document.title =
      path === "/"
        ? "Pierce Seigne — Engineer, builder & Public Policy student"
        : `${title} — Pierce Seigne`;
  }, [path, title]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let preference: string | null = null;
      try {
        preference = localStorage.getItem("portfolio-theme");
      } catch {
        /* System theme remains available. */
      }
      if (!preference) {
        const next = media.matches ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        setTheme(next);
      }
    };
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Theme still works without storage. */
    }
  }
  function closeDetail() {
    if (location.state?.fromPortfolio) navigate(-1);
    else navigate("/", { replace: true });
  }
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <div className="site-shell board-shell">
        <header className="top-navigation">
          <nav aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={!isNavigationPage ? "active" : undefined}
            >
              Home
            </NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/links">Links</NavLink>
          </nav>
        </header>
        {isNavigationPage ? (
          <NavigationPages page={path === "/blog" ? "blog" : "links"} />
        ) : (
          <Home theme={theme} onToggleTheme={toggleTheme} />
        )}
      </div>
      {path === "/about-us" && <Navigate to="/" replace />}
      {path !== "/" && path !== "/about-us" && !isNavigationPage && (
        <DetailDialog title={title} onClose={closeDetail} routeKey={path}>
          {path === "/projects" ? (
            <ProjectBrowser />
          ) : path === "/athletics" ? (
            <AthleticsContent />
          ) : path === "/resume" ? (
            <ResumePreview />
          ) : project ? (
            <ProjectDetail project={project} />
          ) : (
            <p>
              This page isn’t here. <Link to="/">Return to the homepage.</Link>
            </p>
          )}
        </DetailDialog>
      )}
    </>
  );
}
