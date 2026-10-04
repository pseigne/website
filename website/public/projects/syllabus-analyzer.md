A full-stack syllabus analyzer built to solve a simple problem: every syllabus is a bit different, and you never really know where to look for important information. This app creates a consistent, easy-to-access place for all your syllabi.

The system takes unstructured course files, maps them into a uniform structure via a Python and AI pipeline, and handles real-time interactivity on the frontend.

---

## System Architecture & Data Flow

The project is structured around maximizing efficiency by having a clear architectural plan before building. It isolates heavy AI compute processes on the backend from a highly responsive React user interface on the frontend.

```text

1. [Syllabus Upload]
2. [DigitalOcean / Docker Python Backend] 
3. [Markdown Conversion]
4. [OpenAI GPT-4 API]
5. [Structured JSON Output] 
6. [React UI Display]

```

### 1. Backend

The backend wrapper handles document ingestion and communicates with the OpenAI engine to extract structured data.

* **Deployment Infrastructure:** The backend is containerized using Docker and deployed on DigitalOcean, utilizing cloud services available to students.


* **Upload Ingestion (`app.py`):** Accepts the syllabus file from the client interface via a dedicated upload endpoint.
* **Document Conversion:** The engine takes the raw uploaded document and converts it into a clean markdown file.


* **AI Extraction Pipeline (`ai.py`):** The markdown data is passed directly to the OpenAI API using GPT-4 to leverage cost-efficiency. The model processes the text and returns a strictly structured JSON data output to send back to the frontend.



### 2. Frontend Interface 

The interactive React frontend takes the raw JSON data and renders uniform UI views for the student.

* **Conditional Layout Rendering:** The interface dynamically adapts based on the availability of data in the specific syllabus. For example, if a course lacks a teaching assistant or a detailed weekly schedule, those specific blocks or elements clean themselves up and won't display in the UI.


* **State Persistence:** User settings, active course selection tabs, and data inputs persist locally using browser local storage. If a user refreshes the page, the state and active index stay locked in place.



---

## Interactive Component Matrix

The frontend maps the parsed JSON payload into dedicated, consistent UI layout cards:


| Component Category | Source Targets & Files | Core Features & UI Logic |
| --- | --- | --- |
| **Calendar & Timeline** | `Calendar.jsx`, `CourseScheduleCard.jsx` | Displays core timeline requirements. Features actions to generate downloads for standard external calendar files (`downloadIcsFile.js`) or inject dates directly via UI integrations (`addToCalendarButton.jsx`). |
| **Staff & Contacts** | `PrimaryContactsCard.jsx`, `contactCard.js` | Isolates instructor profiles. Users can interact with the cards to save team information as contacts directly from the interface if needed. |
| **Grading Scheme** | `GradeDistributionCard.jsx` | Visualizes the distribution breakdown of how course categories calculate into the overall final mark. |
| **What-If Calculator** | `WhatIfCalc.jsx`, `EstimatedLetterGrade.jsx` | Sandbox interface allowing students to manually input hypothetical scores (e.g., scoring a 90 on a final vs. a 60) to see what their grade becomes, or select a desired target letter grade to find the exact score threshold required to hit it. |


---

## Future Roadmap & Product Concepts

To expand the application from a baseline document analyzer into a comprehensive student hub, several technical additions and cross-platform designs are planned:

* **Syllabus Chat Integration:** Adding an agentic chat layer to allow students to interact with their documents conversationally to ask highly specific questions, similar to how platforms like Neon operate.


* **Server-Side Caching Pipeline:** Introducing backend cache verification layers. If hundreds of university students upload the exact same syllabus file for a shared class, the backend will verify the duplicates and serve the cached JSON result, saving significant AI compute resources and API token costs.


* **Academic Load Balancer:** Building an algorithmic analysis engine to flag heavier academic weeks by evaluating cross-course deadlines collectively, warning students when multiple high-stakes deliverables converge on the same date.


* **Native Mobile Hub (iOS Platform):** Shifting the endgame focus toward a dedicated mobile format for phone deployment. Initial high-fidelity prototyping was completed in Swift using agentic anti-gravity generation models to verify mobile-specific features, including integrated GPA calculators, native notification mechanics, and course management tools.

## Links
- Backend repo: https://github.com/pseigne/tldr-syllabus-backend
- Frontend Repo: https://github.com/cs571-s26/p35
- Demo: https://cs571-s26.github.io/p35/#/overview
