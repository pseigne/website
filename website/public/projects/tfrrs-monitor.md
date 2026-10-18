> **NCAA Division I qualifying lists, updated every night.**

---

## Project Overview

Indoors, only the top 16 individuals and top 12 relays in the country make the NCAA Championships. Outdoors, it's the top 48 individuals and top 24 relays in each region. As a Division I runner, I spent a lot of time refreshing those lists to see where the cutoff was.

This tracker scrapes the lists from TFRRS (the Track & Field Results Reporting System) every night and shows, for each event, who's in, who's on the bubble, and the mark it currently takes to qualify.

---

## Tech Stack & Architecture

**Frontend:** React, CSS

**Backend & Data Pipeline:** Python, BeautifulSoup4, `requests`

**Hosting:** Built and served from pierceseigne.com through GitHub Pages; the site redeploys after each nightly scrape.

---

## Key Features

### Who's in and who's on the bubble
Each event lists the current qualifiers and marks the athlete sitting on the cutoff (16th indoors, 48th outdoors) as the **Bubble Target**.

![TFRRS Monitor men's indoor mile table showing the top 16 qualifiers, altitude tags, and the 16th-place Bubble Target row](/projects/tfrrs-mile-table.webp)

*Each event lists the current top 16, flags altitude-converted marks, and highlights the athlete sitting on the bubble.*

### Altitude marks
Marks converted for altitude (shown with `@` on TFRRS) are tagged, with a short explanation of the NCAA rule and a link to TFRRS's conversion calculator.

### Nightly Updates
An automated Python scraper safely requests, cleans, and standardizes multi-season rosters for both Men's and Women's events.
Generates daily composite "progression snapshots" to track how the bubble moves day by day as the championship approaches.

---

## Challenges

### 1. Data Normalization & Scraping Safety
**The Challenge:** TFRRS does not have a public API, so all the information had to be scraped, which required a `time.sleep` to respect the server.

**Solution:**
Also symbols representing altitude adjustments (`@`) or banked/oversized tracks (`#`) are included within the tags, so they needed to be separated using regular expressions (REGEX).

### 2. Zero-Database and no API

**The problem:** I wanted past seasons' lists plus a daily snapshot, without paying for a database or a server.

**What I did:** The Python scraper writes everything to JSON files (`tfrrs_bubble_cutoffs.json`, `historical_{event}.json`, `tfrrs_active_data.json`), split by event. When you open an event, the page loads only that event's file (about 200 KB), so it stays fast and the whole thing runs as a static site.
