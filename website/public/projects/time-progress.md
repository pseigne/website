This was one of my earliest projects when I was just getting used to web dev. I wanted a quick and easy way to practice optimization, play around with time logic, and build something clean from scratch. I knocked this out in about two days to focus on high-frequency UI updates and get comfortable managing code structure without a massive framework in the way.

The project is built entirely with vanilla HTML, CSS, and JavaScript.

![Time Progress Visualizer](/projects/time-progress.png)

---

## System Architecture & Data Flow

The project uses a simple setup that keeps the webpage design separate from the time math and the screen updates.

```
[index.html] <-> [ui.js] <-> [engine.js] <-> [helpers.js]

```

### 1. Structure & Styles

* **`index.html`:** The basic blueprint of the webpage that sets up the layout containers where the progress bars go.


* **`styles.css`:** Handles the look and feel, colors, spacing, and sizes of the progress bars so they are easy to read at a glance.



### 2. JavaScript Logic (`/js`)

* **`engine.js`:** Runs a timer loop that keeps the bars moving.


* **`helpers.js`:** Handles all the math. It calculates time changes, figures out how far along you are in a specific day, month, or year, and turns those numbers into flat percentages.


* **`ui.js`:** Handles screen updates. It grabs the HTML container slots and changes the width of the progress bars and the text numbers dynamically.



---

## Code Responsibility Matrix

The app splits work up across a few dedicated files to handle calculations and update the screen automatically:

| File | What it does |
| --- | --- |
| `index.html` | Page layout and the empty progress bars |
| `engine.js` | Runs the timer that ticks the page forward |
| `helpers.js` | Works out how far through the day, month, or year you are |
| `ui.js` | Updates the bar widths and numbers |

---


> **No backend.** Everything runs in the browser. There's no server or database.
