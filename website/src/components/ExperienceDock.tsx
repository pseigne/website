const tools = [
  ["react", "React"],
  ["python", "Python"],
  ["javascript", "JavaScript"],
  ["java", "Java"],
  ["html5", "HTML"],
  ["css3", "CSS"],
];

export default function ExperienceDock() {
  return (
    <ul className="tool-dock">
      {tools.map(([icon, name]) => (
        <li key={icon}>
          <img
            className="tool-icon"
            src={`/images/technology/${icon}.svg`}
            alt=""
            width="43"
            height="43"
          />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}
