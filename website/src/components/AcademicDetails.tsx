import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { coursework } from "../data/coursework";
import { projects } from "../data/projects";

export function CourseworkDetails() {
  return (
    <div className="academic-details">
      <p className="lead">
        Courses that shaped my work in code, economics, and history.
      </p>
      {coursework.map((school) => (
        <section className="course-school" key={school.school}>
          <header>
            <p className="small-label">{school.period}</p>
            <h2>{school.school}</h2>
            <p>{school.degree}</p>
          </header>
          {school.groups.map((group) => (
            <section className="course-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="course-list">
                {group.courses.map((course) => (
                  <li key={`${course.code}/${course.title}`}>
                    <span className="course-code">{course.code}</span>
                    <div>
                      <h4>{course.title}</h4>
                      {course.projects?.map((slug) => {
                        const project = projects.find(
                          (item) => item.slug === slug,
                        );
                        return (
                          project && (
                            <Link
                              className="course-project"
                              key={slug}
                              to={`/projects/${slug}`}
                              state={{ fromPortfolio: true }}
                            >
                              {project.name}
                              <ArrowUpRight size={15} aria-hidden="true" />
                            </Link>
                          )
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>
      ))}
    </div>
  );
}

export function LanguageDetails({ language }: { language: string }) {
  const matching = projects.filter((project) =>
    project.languages.includes(language),
  );
  const courses = coursework
    .flatMap((school) => school.groups.flatMap((group) => group.courses))
    .filter((course) => course.languages?.includes(language));
  return (
    <div className="language-details">
      <p className="lead">
        {language === "React"
          ? "Projects built with React."
          : `Projects built with ${language}.`}
      </p>
      {matching.length > 0 ? (
        <ul className="language-projects">
          {matching.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                state={{ fromPortfolio: true }}
              >
                <div>
                  <h2>{project.name}</h2>
                  <p>{project.summary}</p>
                  <span className="small-label">
                    {project.year} · {project.role}
                  </span>
                </div>
                <ArrowUpRight size={21} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>My {language} work is represented by the coursework below.</p>
      )}
      {courses.length > 0 && (
        <section className="language-coursework">
          <h2>Related coursework</h2>
          <ul>
            {courses.map((course) => (
              <li key={`${course.code}/${course.title}`}>
                <span>{course.code}</span> {course.title}
              </li>
            ))}
          </ul>
          <Link
            className="course-project"
            to="/education"
            state={{ fromPortfolio: true }}
          >
            See all coursework <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </section>
      )}
    </div>
  );
}
