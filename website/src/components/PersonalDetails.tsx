import { ArrowUpRight } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
export function AthleticsContent() {
  return (
    <div className="prose">
      <p className="lead">
        A different kind of problem-solving. One mile, one workout, one race at
        a time.
      </p>
      <VideoPlayer />
      <h2>Wisconsin cross country & track</h2>
      <p>
        I competed as a Division I student-athlete at UW–Madison, earning
        All-Big Ten recognition and qualifying for the NCAA First Round in the
        1500m.
      </p>
      <p>
        The rhythm of training has shaped how I approach everything else: show
        up, pay attention, and keep improving. It also inspired my running
        utilities and NCAA qualification tracker.
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
