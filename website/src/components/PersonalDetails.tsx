import { ArrowUpRight } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
export function AthleticsContent() {
  return (
    <div className="prose">
      <p className="lead">
        I’ve run Division I cross country and track at Wisconsin, and now at
        UVA.
      </p>
      <VideoPlayer />
      <h2>Wisconsin cross country & track</h2>
      <p>
        I competed as a Division I student-athlete at UW–Madison, earning
        All-Big Ten recognition and qualifying for the NCAA First Round in the
        1500m.
      </p>
      <p>
        Training 20-plus hours a week alongside an economics degree taught me to
        plan my time and stick with things. It also gave me the ideas for my
        running utilities and NCAA qualifying tracker.
      </p>
      <a
        className="primary-button"
        href="https://www.strava.com/athletes/17706858"
        target="_blank"
        rel="noreferrer"
      >
        Find me on Strava <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
  );
}
