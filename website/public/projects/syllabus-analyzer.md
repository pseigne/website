A full-stack syllabus analyzer built to solve a simple problem: every syllabus is a bit different, and you never really know where to look for important information. This app creates a consistent, easy-to-access place for all your syllabi.

The system takes unstructured course files, maps them into a uniform structure via a Python and AI pipeline, and handles real-time interactivity on the frontend.

---

## System Architecture & Data Flow

I planned the architecture before writing code. The slow part, the AI call, runs on a Python backend, so the React frontend stays quick to click through.

```text

1. [Syllabus Upload]
2. [Python backend on Render] 
3. [Markdown Conversion]
4. [OpenAI GPT-4 API]
5. [Structured JSON Output] 
6. [React UI Display]

```

### 1. Backend

The backend wrapper handles document ingestion and communicates with the OpenAI engine to extract structured data.

* **Hosting:** The Python backend runs on Render.


* **Upload Ingestion (`app.py`):** Accepts the syllabus file from the client interface via a dedicated upload endpoint.
* **Document Conversion:** The engine takes the raw uploaded document and converts it into a clean markdown file.


* **AI step (`ai.py`):** The markdown goes to the OpenAI API (GPT-4). The model returns JSON in a fixed format, so every syllabus comes back with the same fields for the frontend to show.



### 2. Frontend Interface 

The interactive React frontend takes the raw JSON data and renders uniform UI views for the student.

* **Only shows what's there.** If a syllabus has no TA or no weekly schedule, those cards just don't appear.


* **Remembers where you were.** Your courses, settings, and the tab you had open are saved in the browser, so a refresh doesn't lose anything.

![Calendar tab listing CS571's lecture sessions, each with an Add to Calendar button](/projects/syllabus-calendar.webp)

![Grading tab showing CS571's letter-grade scale from A (94–100%) to F](/projects/syllabus-grading.webp)



---

## What each tab does

Each part of the syllabus gets its own card:


| Component Category | Source Targets & Files | Core Features & UI Logic |
| --- | --- | --- |
| **Calendar & Timeline** | `Calendar.jsx`, `CourseScheduleCard.jsx` | Lecture and assignment dates, with Add to Calendar and .ics download. |
| **Staff** | `PrimaryContactsCard.jsx`, `contactCard.js` | Instructor and TA cards you can save straight to your contacts. |
| **Grading Scheme** | `GradeDistributionCard.jsx` | Visualizes the distribution breakdown of how course categories calculate into the overall final mark. |
| **What-if calculator** | `WhatIfCalc.jsx`, `EstimatedLetterGrade.jsx` | Type in a possible score (say, a 90 on the final instead of a 60) to see your grade, or pick the letter grade you want and see the score you need. |


---

## Future Roadmap & Product Concepts

Things I'd like to add next:

* **Syllabus Chat Integration:** Adding an agentic chat layer to allow students to interact with their documents conversationally to ask highly specific questions, similar to how platforms like Neon operate.


* **Caching.** If many students in the same class upload the same syllabus, the backend should recognize the duplicate and reuse the first result instead of paying for another AI call.


* **Heavy-week warnings.** Look across all of a student's courses and flag weeks where several big assignments or exams land together.


* **An iPhone app.** The long-term goal is a phone app. I've already built a high-fidelity prototype in Swift with a GPA calculator, notifications, and course management.

## Links
- Backend repo: https://github.com/pseigne/tldr-syllabus-backend
- Frontend Repo: https://github.com/cs571-s26/p35
- Demo: https://cs571-s26.github.io/p35/#/overview

These links go to the original source code from when I first built the project. The basic source is the same, but I no longer share the current code.
