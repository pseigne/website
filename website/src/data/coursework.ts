export interface Course {
  code: string;
  title: string;
  projects?: string[];
  languages?: string[];
}
export const coursework: {
  school: string;
  degree: string;
  period: string;
  groups: { title: string; courses: Course[] }[];
}[] = [
  {
    school: "University of Virginia",
    degree: "Master of Public Policy · Frank Batten School",
    period: "Fall 2026 · In progress",
    groups: [
      {
        title: "Current coursework",
        courses: [
          { code: "ECON 7710", title: "Econometrics I" },
          { code: "LPPP 6350", title: "Politics of Public Policy" },
          { code: "LPPL 7410", title: "Psychology for Leadership" },
          {
            code: "ACCT 5340",
            title: "Property and Personal Financial Planning",
          },
        ],
      },
    ],
  },
  {
    school: "University of Wisconsin–Madison",
    degree: "B.S. Economics · Computer Science & History minors",
    period: "2022–2026 · Completed",
    groups: [
      {
        title: "Computer science",
        courses: [
          { code: "CS 200", title: "Programming I", languages: ["Java"] },
          { code: "CS 300", title: "Programming II", languages: ["Java"] },
          { code: "CS 400", title: "Programming III", languages: ["Java"] },
          { code: "CS 252", title: "Introduction to Computer Engineering" },
          {
            code: "CS 570",
            title: "Introduction to Human-Computer Interaction",
          },
          {
            code: "CS 571",
            title: "Building User Interfaces",
            projects: ["syllabus-analyzer"],
            languages: ["React", "JavaScript", "HTML", "CSS"],
          },
        ],
      },
      {
        title: "Economics & data",
        courses: [
          {
            code: "ECON 101 / 102",
            title: "Principles of Microeconomics & Macroeconomics",
          },
          {
            code: "ECON 301 / 302",
            title: "Intermediate Microeconomic & Macroeconomic Theory",
          },
          {
            code: "ECON 310",
            title: "Statistics: Measurement in Economics",
            projects: ["tiktok-song-duration"],
            languages: ["Python"],
          },
          {
            code: "ECON 390",
            title: "Introduction to Programming for Economic Data",
            languages: ["Python"],
          },
          { code: "ECON 400", title: "Introduction to Applied Econometrics" },
          {
            code: "ECON 695",
            title: "Econometrics with AI & Machine Learning",
            projects: ["ncaa-performance-analysis"],
            languages: ["Python"],
          },
          {
            code: "ECON 695",
            title: "Data Analysis and Big Data",
            projects: ["resource-allocation-model"],
            languages: ["Python", "SQL"],
          },
          { code: "GEOG 170", title: "Digital Globe: GIScience & Technology" },
        ],
      },
      {
        title: "Mathematics",
        courses: [
          {
            code: "MATH 221 / 222",
            title: "Calculus & Analytic Geometry I & II",
          },
          {
            code: "MATH 320",
            title: "Linear Algebra & Differential Equations",
          },
        ],
      },
      {
        title: "History",
        courses: [
          {
            code: "HISTORY 201",
            title:
              "The Historian’s Craft: Weimar Republic & the Rise of Nazism",
          },
          { code: "HISTORY 212", title: "Western Christianity to 1750" },
          { code: "HISTORY 350", title: "First World War" },
          { code: "HISTORY 360", title: "Early Medieval England" },
          {
            code: "HISTORY 600",
            title: "Advanced Seminar: Crime & Punishment in the Middle Ages",
            projects: ["medieval-history-capstone"],
          },
        ],
      },
    ],
  },
];
