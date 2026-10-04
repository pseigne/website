> **Real-time qualifying list monitoring for NCAA Division I Track & Field.**

---

## Project Overview

Qualifying for the NCAA Division I Track & Field Championships is one of the most competitive achievements in collegiate sports. Only **the Top 16 individuals and Top 12 relays nationally for Indoor**, and **the Top 48 individuals and Top 24 relays per region for Outdoor** qualify. Athletes and coaches spend months checking over qualifying lists constantly.

This application uses a **data pipeline and charts** that monitor live standings directly from the Track & Field Results Reporting System (TFRRS). By compiling live data, the tracker lets coaches and athletes analyze qualification trends, monitor the "bubble" in real-time, and understand the performances needed to punch a ticket to the NCAA Championships.

---

## Tech Stack & Architecture

**Frontend:** React, CSS

**Backend & Data Pipeline:** Python, BeautifulSoup4, `requests`

**Hosting & Sync:** Hosted on Vercel

---

## Key Features

### Live Bubble Monitoring
Displays live NCAA qualifying lists with clear visual styling indicating whether an athlete is safely **In-Cutoff** or **On the Bubble**.
Highlights the exact **Bubble Target** athlete (e.g. Rank 16 for Indoor, Rank 48 for Outdoor) 

### Altitude Marker
Automatically parses and highlights converted performances (e.g., marks achieved at high altitudes marked by `@` symbols under NCAA rules).
Seamlessly integrates explains/rules and connects directly to official TFRRS conversion calculators.

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

**The Challenge:** Storing decades of historical lists and daily snapshots can quickly lead to expensive database queries and complex backend hosting requirements.

**The Solution:** Designed a lightweight file-system database using structured JSON documents (`tfrrs_bubble_cutoffs.json`, `historical_{event}.json`, and `tfrrs_active_data.json`). The Python pipeline automatically splits massive datasets into lazy-loaded, event-specific JSON files. When a user requests a historical roster in the React frontend, it fetch-requests only that specific lightweight event file (~200KB), reducing network load and ensuring instant UI loads.
