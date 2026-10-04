import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
export default function VideoPlayer({
  compact = false,
  playOnHover = false,
}: {
  compact?: boolean;
  playOnHover?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const hoverPlayback = useRef(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const element = ref.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pause = () => {
      if (document.hidden || motion.matches) element.pause();
    };
    motion.addEventListener("change", pause);
    document.addEventListener("visibilitychange", pause);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) element.pause();
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", pause);
      document.removeEventListener("visibilitychange", pause);
    };
  }, []);
  useEffect(() => {
    if (!playOnHover) return;
    const element = ref.current!;
    const tile = element.closest(".athletics-tile");
    if (!tile) return;
    let hovering = false;
    async function enter(event: Event) {
      if (
        (event as PointerEvent).pointerType === "touch" ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.hidden ||
        !element.paused
      )
        return;
      hovering = true;
      hoverPlayback.current = true;
      element.src ||= "/images/athletics.mp4";
      try {
        await element.play();
        if (!hovering && hoverPlayback.current) element.pause();
      } catch {
        // Manual playback remains available if autoplay is blocked.
      }
    }
    function leave() {
      hovering = false;
      if (hoverPlayback.current) element.pause();
    }
    tile.addEventListener("pointerenter", enter);
    tile.addEventListener("pointerleave", leave);
    return () => {
      leave();
      tile.removeEventListener("pointerenter", enter);
      tile.removeEventListener("pointerleave", leave);
    };
  }, [playOnHover]);
  async function toggle() {
    const element = ref.current!;
    hoverPlayback.current = false;
    if (!element.paused) element.pause();
    else {
      element.src ||= "/images/athletics.mp4";
      try {
        await element.play();
      } catch {
        setPlaying(false);
      }
    }
  }
  return (
    <div className={compact ? "video-player compact-video" : "video-player"}>
      <video
        ref={ref}
        poster="/images/athletics-poster.webp"
        muted
        loop
        playsInline
        preload="none"
        aria-label="Pierce’s athletics footage"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        className="video-control icon-button"
        onClick={toggle}
        aria-label={playing ? "Pause athletics video" : "Play athletics video"}
      >
        {playing ? (
          <Pause size={17} aria-hidden="true" />
        ) : (
          <Play size={17} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
