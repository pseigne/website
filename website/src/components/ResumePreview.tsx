import { ArrowUpRight, Download } from "lucide-react";
import { resumeUrl } from "../data/projects";

export default function ResumePreview() {
  return (
    <div className="resume-preview">
      <div className="resume-actions">
        <a href={resumeUrl} download="Pierce-Seigne-Resume.pdf">
          <Download size={16} aria-hidden="true" /> Download PDF
        </a>
        <a
          href="/resume/Pierce-Seigne-Resume.docx"
          download="Pierce-Seigne-Resume.docx"
        >
          <Download size={16} aria-hidden="true" /> Download Word
        </a>
        <a href={resumeUrl} target="_blank" rel="noreferrer">
          Open PDF <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <iframe
        src={`${resumeUrl}#view=FitH`}
        title="Pierce Seigne résumé PDF preview"
      />
      <div className="resume-pages" aria-label="Résumé page previews">
        {[1, 2].map((page) => (
          <img
            key={page}
            src={`/resume/page-${page}.jpg`}
            alt={`Pierce Seigne résumé, page ${page} of 2`}
            width="1391"
            height="1800"
          />
        ))}
      </div>
      <p className="resume-fallback">
        If your browser cannot show the preview, use Open PDF or download a copy
        above.
      </p>
    </div>
  );
}
