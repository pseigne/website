> **NCAA Division I qualifying lists, updated every night.**

---

## Project Overview

Indoors, only the top 16 individuals and top 12 relays in the country make the NCAA Championships. Outdoors, it's the top 48 individuals and top 24 relays in each region. As a Division I runner, I spent a lot of time refreshing those lists to see where the cutoff was.

This tracker scrapes the lists from TFRRS (the Track & Field Results Reporting System) every night and shows, for each event, who's in, who's on the bubble, and the mark it currently takes to qualify.

---

## October 2026 update

The qualifying line shows who should make the meet. It doesn't show who actually got in: some athletes scratch or never declare, so the field fills from further down the list. Three additions:

- **Field line.** Indoor event pages and the outdoor First Round pages now show a second, dashed line where the field reached, taken from the NCAA's accepted entry lists published on declaration day. It goes back to 2015, with older seasons in the past years view. The decathlon and heptathlon don't get one, since they're picked from the national list, and a few events have no line because an accepted athlete isn't on the TFRRS list.
- **Deeper outdoor lists.** The East and West lists now go 100 deep in every event.
- **Regionals to nationals.** A new page follows everyone who advanced from the East and West First Rounds in each event and shows how they finished at nationals, for 2018, 2019 and 2021 to 2026 (there was no 2020 meet).

![Women's 200m indoor list for 2025–26: the qualifying line after 16th, 12th place tagged not in field, 17th and 18th tagged in, and a dashed field line after 18th, as accepted March 3](/projects/tfrrs-field-line.webp)

*Women's 200m, indoors in 2025–26: the qualifying line is at 16th, but the field as accepted on March 3 reached 18th.*

![Women's 100m East First Round list for 2026: the qualifying line after 48th, most athletes from 49th to 56th tagged in, and the field line after 56th, with the top 68 drawn as one race beside it](/projects/tfrrs-outdoor-100.webp)

*Women's 100m, East First Round in 2026: the line is at 48th and the field reached 56th.*

![Women's 100m at the 2026 NCAA Outdoor Championships: the qualifiers in finishing order, each with an East or West chip, their First Round place and mark, and their time and wind in the final](/projects/tfrrs-nationals.webp)

*Women's 100m at the 2026 nationals: 12 qualifiers came from each First Round, and 7 of the top 8 came from the East.*

Jumps and throws are now drawn on their own venue. Each throw lands in its sector, with the qualifying line as an arc at the qualifying distance. High jumpers and vaulters sit at the height they cleared, against a bar set at the line. Long and triple jumps land in the sand past the board.

![Women's indoor shot put for 2025–26: the top 50 throws landing in the throwing sector, the qualifying arc at 17.15 m, and the field line just inside it at 17th](/projects/tfrrs-shot-put.webp)

*Women's shot put, indoors in 2025–26: the qualifying arc sits at 17.15 m, and the field reached one more thrower.*

---

## Tech Stack & Architecture

**Frontend:** React, CSS

**Backend & Data Pipeline:** Python, BeautifulSoup4, `requests`

**Hosting:** Built and served from pierceseigne.com through GitHub Pages; the site redeploys after each nightly scrape.

---

## Key Features

### Who's in and who's on the bubble
Each event lists the current qualifiers and draws the **qualifying line** under the athlete sitting on the cutoff (16th indoors, 48th outdoors).

![NCAA TF Qualification Monitor men's indoor mile list for 2025–26: altitude-tagged marks, the qualifying line after 16th place at 3:53.90, the field line after 17th, and the top 50 drawn as one race beside the table](/projects/tfrrs-mile-table.webp)

*Each event lists the qualifiers, flags altitude-converted marks, and draws the qualifying line under the athlete on the bubble.*

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
