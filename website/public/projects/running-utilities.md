Two small training tools, combined into one page with a tab for each. The **Weekly Mileage Planner** charts the miles you have logged for each day against a weekly goal and spreads whatever is left across the days you have not filled in. The **Track Split Calculator** turns a goal time into lap-by-lap splits for common race distances on 200 m, 400 m, or custom-length tracks.

Both started as separate vanilla HTML, CSS, and JavaScript projects. They now share one Vite-built page at `/running-utilities/`, but each tool still runs from its original, unmodified files.

![Track Split Calculator showing mile splits for a 4:20 goal](/projects/running-splits.webp)

---

## How it fits together

```
[index.html tab bar] -> [weekly-mileage/ iframe]
                     -> [track-splits/ iframe]
```

* **Tab page (`src/main.js`):** Switches between the two tools and keeps the URL hash (`#weekly-mileage` or `#track-splits`) in sync, so direct links and the back button work. Each tool sits in its own iframe, so your inputs stay put when you switch tabs.
* **Weekly Mileage Planner:** Uses Chart.js for the bar chart, and has its own light/dark theme toggle.
* **Track Split Calculator:** Handles the first partial lap automatically. For example, a mile on a 400 m track starts with a 9 m segment before four full laps.

---

> **Integrity check:** `original-sources.json` records a SHA-256 checksum for every original file. The test suite fails if any of them change, and Playwright browser tests cover calculations, tab switching, and mobile layouts.
