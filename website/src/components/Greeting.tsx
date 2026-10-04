import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const wavePoses = [3, 2, 1, 2];

export default function Greeting() {
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let alive = true;
    let ready = false;
    let entrance: gsap.core.Timeline | null = null;
    let wave: gsap.core.Timeline | null = null;
    const element = heading.current!;
    const frames = Array.from(
      root.current!.querySelectorAll<HTMLImageElement>(".greeting-doug img"),
    );
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reset = () => {
      entrance?.kill();
      wave?.kill();
      delete element.dataset.typeStyle;
      gsap.set(element, { clearProps: "transform" });
      gsap.set(frames, { opacity: 0 });
      gsap.set(frames[0], { opacity: 1 });
    };
    const createWave = () => {
      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          gsap.set(frames, { opacity: 0 });
          gsap.set(frames[0], { opacity: 1 });
        },
      });
      for (let cycle = 0; cycle < 5; cycle++) {
        wavePoses.forEach((pose, index) => {
          const time = (cycle * wavePoses.length + index) * 0.1;
          timeline.set(frames, { opacity: 0 }, time);
          timeline.set(frames[pose], { opacity: 1 }, time);
        });
      }
      timeline.to({}, { duration: 0.1 }, 1.9);
      return timeline;
    };
    const hover = (event: PointerEvent) => {
      if (
        !ready ||
        motion.matches ||
        event.pointerType === "touch" ||
        entrance?.isActive() ||
        wave?.isActive() ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      )
        return;
      wave = createWave();
      wave.play();
    };
    const target = root.current!;
    target.addEventListener("pointerenter", hover);
    motion.addEventListener("change", reset);
    Promise.all([
      document.fonts.load('600 54px "Greeting Garamond"'),
      document.fonts.load('700 54px "Greeting Hand"'),
      document.fonts.load('italic 600 54px "Greeting Bodoni"'),
      ...frames.map((frame) => frame.decode()),
    ])
      .then(() => {
        if (!alive) return;
        ready = true;
        if (motion.matches) return;
        const fonts = gsap.timeline({
          paused: true,
          onComplete: () => {
            delete element.dataset.typeStyle;
            gsap.set(element, { clearProps: "transform" });
          },
        });
        ["serif", "hand", "italic", "original"].forEach((style, index) => {
          fonts.call(
            () => {
              element.dataset.typeStyle = style;
            },
            [],
            index * 0.25,
          );
          fonts.fromTo(
            element,
            { scale: 0.985 },
            { scale: 1, duration: 0.06, ease: "power2.out" },
            index * 0.25,
          );
        });
        fonts.to({}, { duration: 0.25 }, 0.75);
        wave = createWave();
        // Wait for the board entrance, then start both animations on the same tick.
        entrance = gsap.timeline({ delay: 0.55 });
        entrance.add(fonts.play(), 0);
        entrance.add(wave.play(), 0);
      })
      .catch(() => {});
    return () => {
      alive = false;
      reset();
      target.removeEventListener("pointerenter", hover);
      motion.removeEventListener("change", reset);
    };
  }, []);

  return (
    <div ref={root} className="greeting-with-doug">
      <span className="greeting-doug" role="img" aria-label="Doug the Duck">
        {[0, 1, 2, 3].map((frame) => (
          <img
            key={frame}
            src={`/images/doug-wave-${frame}.png`}
            alt=""
            aria-hidden="true"
            width="256"
            height="256"
          />
        ))}
      </span>
      <h1 id="intro-title" className="greeting" ref={heading}>
        Hello,
        <br />
        I’m Pierce.
      </h1>
    </div>
  );
}
