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

* **`engine.js`:** The heart of the app. It sets up a standard timer loop that runs continuously to keep the visualizer ticking.


* **`helpers.js`:** Handles all the math. It calculates time changes, figures out how far along you are in a specific day, month, or year, and turns those numbers into flat percentages.


* **`ui.js`:** Handles screen updates. It grabs the HTML container slots and changes the width of the progress bars and the text numbers dynamically.



---

## Code Responsibility Matrix

The app splits work up across a few dedicated files to handle calculations and update the screen automatically:

| File Target | Folder Path | Main Job | Objective |
| --- | --- | --- | --- |
| **`index.html`** | Root | Document skeleton

 | Sets up the target visual slots for data injections.

 |
| **`engine.js`** | `/js` | Time ticker loop

 | Coordinates the timer so the calculations stay accurate.

 |
| **`helpers.js`** | `/js` | Percentage math

 | Measures time spent across standard days, weeks, months, or years.

 |
| **`ui.js`** | `/js` | DOM element updates

 | Physically changes the bar sizes and text on the page.

 |

---


> **Development Note:** The entire app runs directly inside the browser memory space. It does not need a backend database or external servers to function, keeping things lightweight and simple.
