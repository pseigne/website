import { useEffect, useRef } from "react";

const roles = [
  "Economist",
  "Historian",
  "Computer Scientist",
  "Developer",
  "Data Scientist",
  "Wisconsin Badger",
  "Athlete",
];

export default function TypingRoles() {
  const text = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let word = 0;
    let character = 0;
    let deleting = false;
    const type = () => {
      const role = roles[word];
      character += deleting ? -1 : 1;
      if (text.current) text.current.textContent = role.slice(0, character);
      let delay = deleting ? 50 : 100;
      if (!deleting && character === role.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && character === 0) {
        deleting = false;
        word = (word + 1) % roles.length;
      }
      timer = setTimeout(type, delay);
    };
    const start = () => {
      clearTimeout(timer);
      if (media.matches) {
        if (text.current) text.current.textContent = "Developer";
      } else {
        word = 0;
        character = 0;
        deleting = false;
        type();
      }
    };
    start();
    media.addEventListener("change", start);
    return () => {
      clearTimeout(timer);
      media.removeEventListener("change", start);
    };
  }, []);
  return (
    <div className="intro-links typing-roles">
      <span className="sr-only">
        Economist, historian, computer scientist, developer, data scientist,
        Wisconsin Badger, and athlete.
      </span>
      <span aria-hidden="true">
        <span ref={text} className="typed">
          Developer
        </span>
        <span className="typing-cursor">|</span>
      </span>
    </div>
  );
}
