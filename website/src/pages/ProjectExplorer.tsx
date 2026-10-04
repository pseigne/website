import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { directory, directoryGroups, type ProjectPreview } from "../data/directory";
import { projects, resumeUrl } from "../data/projects";
import ProjectDetail from "./ProjectDetail";
import "./ProjectExplorer.css";

function Preview({ preview, title }: { preview: ProjectPreview; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 12000);
    return () => clearTimeout(timer);
  }, []);
  return <div className="explorer-embed">
    {!loaded && <p className="embed-status" role="status">{slow ? "This preview is taking a while. You can open it separately." : "Loading preview…"}</p>}
    <iframe src={preview.url} title={`${title}: ${preview.label}`} onLoad={() => setLoaded(true)} referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen" />
    {/^https:/.test(preview.url) && <p className="embed-hint">If this website blocks the preview, use Open separately above.</p>}
    {preview.type === "pdf" && <p className="embed-hint">If your browser cannot display the PDF, use Open separately or Download PDF.</p>}
  </div>;
}

export default function ProjectExplorer() {
  const { pathname } = useLocation();
  const [, slug = directory[0].slug, view = "case-study"] = pathname.split("/").filter(Boolean);
  const entry = directory.find(item => item.slug === slug);
  const project = projects.find(item => item.slug === slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  // Visited previews stay in the DOM until leaving Links, preserving app input state.
  const [visited, setVisited] = useState<Set<string>>(() => new Set());
  const preview = entry?.previews.find(item => item.id === view);
  const activeKey = preview ? `${slug}/${view}` : null;
  const mounted = new Set(visited);
  if (activeKey) mounted.add(activeKey);
  if (activeKey && !visited.has(activeKey)) setVisited(new Set([...visited, activeKey]));
  useEffect(() => {
    document.title = `${entry?.label || "Links"} | Pierce Seigne`;
  }, [entry]);
  useEffect(() => {
    if (!menuOpen) return;
    menu.current?.querySelector<HTMLElement>('a[aria-current="page"]')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  if (!entry || !project || (view !== "case-study" && !preview)) return <Navigate to={`/links/${directory[0].slug}`} replace />;
  const openUrl = preview?.url || entry.previews[0]?.url || project.links[0]?.url;
  return <main id="main-content" tabIndex={-1} className="project-explorer">
    <div className="explorer-mobile-header">
      <span>{entry.label}</span>
      <button ref={menuButton} aria-expanded={menuOpen} aria-controls="project-directory" onClick={() => setMenuOpen(!menuOpen)}>Projects {menuOpen ? <X size={18} /> : <ChevronDown size={18} />}</button>
    </div>
    <aside id="project-directory" ref={menu} className={`explorer-sidebar ${menuOpen ? "is-open" : ""}`} aria-label="Project directory">
      <div className="explorer-identity"><Link to="/">Pierce Seigne</Link><p>Projects & explorations</p></div>
      <nav aria-label="Browse projects">
        {directoryGroups.map(group => <section className="explorer-group" key={group}>
          <h2>{group}</h2>
          {directory.filter(item => item.group === group).map(item => <Link key={item.slug} to={`/links/${item.slug}`} aria-current={item.slug === slug ? "page" : undefined} onClick={() => { setMenuOpen(false); requestAnimationFrame(() => heading.current?.focus()); }}>{item.label}</Link>)}
        </section>)}
      </nav>
      <nav className="explorer-elsewhere" aria-label="Elsewhere">
        <a href="https://github.com/pseigne" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
        <a href="https://www.linkedin.com/in/pierce-seigne-b310a0305/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
        <a href="https://x.com/KingSeigne" target="_blank" rel="noreferrer">X <ArrowUpRight size={14} /></a>
        <a href="mailto:pierceseigne@icloud.com">Email <ArrowUpRight size={14} /></a>
        <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={14} /></a>
      </nav>
    </aside>
    <section className="explorer-canvas" aria-labelledby="explorer-title">
      <header className="explorer-project-header"><p>{project.year}</p><h1 id="explorer-title" tabIndex={-1} ref={heading}>{entry.label}</h1></header>
      <div className="explorer-toolbar">
        <nav aria-label="Project views" className="explorer-views">
          <Link to={`/links/${slug}`} aria-current={view === "case-study" ? "page" : undefined}>Case study</Link>
          {entry.previews.map(item => <Link key={item.id} to={`/links/${slug}/${item.id}`} aria-current={view === item.id ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className="explorer-outlets">
          {preview?.type === "pdf" && <a href={preview.url} download>Download PDF</a>}
          {entry.source && <a href={entry.source} target="_blank" rel="noreferrer">Source <ArrowUpRight size={14} /></a>}
          <a href={openUrl} target="_blank" rel="noreferrer">Open separately <ArrowUpRight size={14} /></a>
        </div>
      </div>
      <div className="explorer-study" hidden={view !== "case-study"}><ProjectDetail key={slug} project={project} /></div>
      {directory.flatMap(item => item.previews.filter(frame => mounted.has(`${item.slug}/${frame.id}`)).map(frame => {
        const key = `${item.slug}/${frame.id}`;
        const active = key === activeKey;
        return <div key={key} hidden={!active} inert={!active} className="explorer-preview"><Preview preview={frame} title={item.label} /></div>;
      }))}
    </section>
  </main>;
}
