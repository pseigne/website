import type { SectionImage } from "../data/projects";

export default function BeforeAfter({
  before,
  after,
}: {
  before: SectionImage;
  after: SectionImage;
}) {
  return (
    <div
      className="before-after"
      role="group"
      aria-label="Before and after comparison"
    >
      <figure className="before-after-item">
        <span className="before-after-label">{before.caption}</span>
        <img
          src={before.src}
          alt={before.alt}
          width={before.width}
          height={before.height}
          loading="lazy"
        />
      </figure>
      <figure className="before-after-item">
        <span className="before-after-label">{after.caption}</span>
        <img
          src={after.src}
          alt={after.alt}
          width={after.width}
          height={after.height}
          loading="lazy"
        />
      </figure>
    </div>
  );
}
