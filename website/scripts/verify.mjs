import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import assert from "node:assert/strict";

const url = process.env.PORTFOLIO_URL || "http://127.0.0.1:5173";
const output = new URL("../../.portfolio-checks/", import.meta.url).pathname;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  // A cold expansion must work without fetching another JavaScript module.
  const expansionContext = await browser.newContext();
  const expansionPage = await expansionContext.newPage();
  const expansionErrors = [];
  expansionPage.on("pageerror", (error) => expansionErrors.push(error.message));
  await expansionPage.goto(url);
  await expansionPage.locator(".coder-tile").waitFor();
  await expansionPage.route("**/*", (route) =>
    route.request().resourceType() === "script"
      ? route.abort()
      : route.continue(),
  );
  await expansionPage.locator(".coder-tile").click();
  await expansionPage.locator(".project-detail").waitFor();
  assert.equal(
    await expansionPage.locator("#detail-title").textContent(),
    "BrainForge Coder Cards",
  );
  await expansionPage
    .getByRole("heading", { name: "From sketch to prototype" })
    .waitFor();
  assert.deepEqual(expansionErrors, []);
  await expansionPage.keyboard.press("Escape");
  await expansionPage.waitForFunction(() => !document.querySelector("dialog"));
  assert.equal(await expansionPage.locator(".coder-tile").isVisible(), true);
  await expansionContext.close();
  console.log(
    "PASS cold Coder Cards expansion with additional JavaScript requests blocked",
  );
  for (const width of [320, 375, 768, 1024, 1440]) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        colorScheme: theme,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      await page.locator(".coder-front").waitFor();
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images].map((image) => {
            image.loading = "eager";
            return image.decode().catch(() => {});
          }),
        );
      });
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        theme,
      );
      assert.equal(await page.locator(".tile").count(), 13);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `Overflow at ${width}/${theme}`,
      );
      assert.equal(
        await page
          .locator("img")
          .evaluateAll((images) =>
            images.every((image) => image.complete && image.naturalWidth > 0),
          ),
        true,
        "All images loaded",
      );
      assert.equal(
        await page.locator("video").evaluate((video) => video.paused),
        true,
      );
      await page.screenshot({
        path: `${output}${theme}-${width}.png`,
        fullPage: true,
      });
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      assert.deepEqual(
        audit.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => node.target),
        })),
        [],
        `${width}/${theme} accessibility`,
      );
      await page.screenshot({
        path: `${output}${theme}-${width}.png`,
        fullPage: true,
      });
      assert.deepEqual(errors, []);
      console.log(
        `PASS ${width}px ${theme}: layout, images, reduced motion, accessibility`,
      );
      await context.close();
    }
  }
  for (const [width, height] of [
    [1280, 720],
    [1366, 768],
    [1440, 900],
    [1920, 1080],
  ]) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height },
        colorScheme: theme,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.goto(url);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((image) => {
            image.loading = "eager";
            return image.decode().catch(() => {});
          }),
        );
      });
      const geometry = await page.evaluate(() => {
        const intro = document
          .querySelector(".introduction")
          .getBoundingClientRect();
        return {
          fits:
            document.documentElement.scrollHeight <= innerHeight &&
            document.documentElement.scrollWidth <= innerWidth,
          centered:
            Math.abs(intro.x + intro.width / 2 - innerWidth / 2) < 2 &&
            Math.abs(intro.y + intro.height / 2 - innerHeight / 2) < 2,
          tilesVisible: [...document.querySelectorAll(".tile")].every(
            (tile) => {
              const rect = tile.getBoundingClientRect();
              return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= innerHeight &&
                rect.right <= innerWidth
              );
            },
          ),
          clippedCopy: [
            ...document.querySelectorAll(
              ".board h1, .board h2, .board h3, .board p, .intro-links, .board-meta",
            ),
          ]
            .filter((element) => !element.closest('[aria-hidden="true"]'))
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              const tile = element.closest(".tile").getBoundingClientRect();
              return (
                rect.bottom > tile.bottom + 1 ||
                rect.right > tile.right + 1 ||
                rect.left < tile.left - 1 ||
                rect.top < tile.top - 1
              );
            })
            .map((element) => element.textContent),
        };
      });
      assert.equal(
        geometry.fits,
        true,
        `${width}×${height}/${theme}: one viewport`,
      );
      assert.equal(geometry.centered, true, "Introduction is centered");
      assert.equal(geometry.tilesVisible, true, "Every tile is fully visible");
      assert.deepEqual(
        geometry.clippedCopy,
        [],
        "Tile copy stays inside its card",
      );
      await page.screenshot({
        path: `${output}board-${theme}-${width}-${height}.png`,
      });
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      assert.deepEqual(
        audit.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => node.target),
        })),
        [],
        `${width}×${height}/${theme}: accessibility`,
      );
      await context.close();
      console.log(
        `PASS ${width}×${height} ${theme}: viewport, centered intro, visible cards, copy, accessibility`,
      );
    }
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    colorScheme: "light",
  });
  const page = await context.newPage();
  await page.goto(url);
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  const trigger = page.locator(".coder-tile");
  await trigger.click();
  await page.getByRole("dialog").waitFor();
  assert.equal(
    await page.locator("#detail-title").textContent(),
    "BrainForge Coder Cards",
  );
  assert.equal(
    await page.locator("body").evaluate((body) => body.style.overflow),
    "hidden",
  );
  for (let count = 0; count < 8; count++) {
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => !!document.activeElement.closest("dialog")),
      true,
      "Focus remains in dialog",
    );
  }
  const fullImage = await page
    .getByRole("link", { name: "View full-size card" })
    .getAttribute("href");
  assert.equal((await page.request.get(`${url}${fullImage}`)).status(), 200);
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector("dialog"));
  assert.equal(
    await trigger.evaluate((element) => element === document.activeElement),
    true,
    "Focus restored",
  );
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await page.getByRole("button", { name: "Data & research" }).click();
  assert.equal(await page.locator(".project-list-item").count(), 3);
  await page.getByRole("button", { name: "Everything" }).click();
  assert.equal(await page.locator(".project-list-item").count(), 11);
  await page
    .locator(".project-list-item")
    .filter({ hasText: "Neon.ai" })
    .filter({ hasText: "Website design" })
    .click();
  await page.goBack();
  await page.getByRole("heading", { name: "Selected work" }).waitFor();
  await page.goForward();
  await page
    .getByRole("heading", { name: "Neon.ai Website", exact: true })
    .waitFor();
  const slugs = [
    "brainforge-coder-cards",
    "neon-ai",
    "tfrrs-monitor",
    "syllabus-analyzer",
    "resource-allocation-model",
    "ncaa-performance-analysis",
    "time-progress",
    "running-utilities",
    "portfolio-v1",
    "medieval-history-capstone",
    "tiktok-song-duration",
  ];
  for (const slug of slugs) {
    await page.goto(`${url}/#/projects/${slug}`);
    await page.locator(".project-detail").waitFor();
    await page
      .getByRole("link", {
        name: /Open|Read|Visit|Generate|Try|View source|Mileage/,
      })
      .first()
      .waitFor();
    assert.notEqual(
      await page.locator("#detail-title").textContent(),
      "Page not found",
    );
  }
  await page.goto(`${url}/#/about-us`);
  await page.waitForURL(`${url}/#/`);
  assert.equal(await page.locator("dialog").count(), 0);
  assert.equal(await page.locator(".inline-brand a").count(), 0);
  assert.equal(await page.locator(".education-line a").count(), 0);
  assert.match(
    await page.locator(".education-tile").textContent(),
    /Public Policy/,
  );
  assert.doesNotMatch(
    await page.locator("main").textContent(),
    /Data Science|A little about me/,
  );
  assert.equal(await page.locator(".wordmark").textContent(), "Pierce Seigne");
  for (const route of ["athletics", "projects/not-real"]) {
    await page.goto(`${url}/#/${route}`);
    await page.getByRole("dialog").waitFor();
    await page.getByRole("button", { name: "Close detail" }).click();
    await page.waitForURL(`${url}/#/`);
  }
  await page.goto(`${url}/#/projects/tfrrs-monitor`);
  await page.getByRole("heading", { name: "Project Overview" }).waitFor();
  await page.goto(`${url}/#/athletics`);
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert.deepEqual(
    audit.violations.map((item) => item.id),
    [],
  );
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Play athletics video" })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Pause athletics video" })
    .waitFor();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Pause athletics video" })
    .click();
  for (const path of [
    "/legacy/index.html",
    "/legacy/navbar.html",
    "/legacy/pages/2026%20Pierce%20Seigne%20Resume.pdf",
    "/legacy/pages/seasonal_eda.html",
    "/legacy/pages/tffrs_distance_eda.html",
  ])
    assert.equal((await page.request.get(`${url}${path}`)).status(), 200, path);
  await page.goto(`${url}/#/projects/syllabus-analyzer`);
  await page.getByRole("dialog").waitFor();
  console.log(
    "PASS theme persistence, focus, Escape, filters, history, every project deep link, markdown, video, legacy and résumé",
  );
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${url}/#/projects`);
    await page.locator(".project-list-item").first().waitFor();
    await page.evaluate(async () => {
      await Promise.all(
        [...document.images].map((image) => {
          image.loading = "eager";
          return image.decode().catch(() => {});
        }),
      );
    });
    await page.screenshot({ path: `${output}project-collection-${width}.png` });
    const collectionAudit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(
      collectionAudit.violations.map((item) => item.id),
      [],
    );
    assert.equal(
      await page
        .locator("dialog")
        .evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth),
      true,
    );
  }
  await page.emulateMedia({
    reducedMotion: "no-preference",
    colorScheme: "light",
  });
  await page.goto(url);
  await page.locator(".neon-tile").click();
  await page
    .getByRole("heading", { name: "Neon.ai Website", exact: true })
    .waitFor();
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .locator(".neon-tile")
      .evaluate((element) => element === document.activeElement),
    true,
  );
  await page.goto(url);
  await page.locator(".resume-link").click();
  await page.getByRole("heading", { name: "Résumé", exact: true }).waitFor();
  await page.getByTitle("Pierce Seigne résumé PDF preview").waitFor();
  for (const [name, filename, mime] of [
    ["Download PDF", "Pierce-Seigne-Resume.pdf", "application/pdf"],
    [
      "Download Word",
      "Pierce-Seigne-Resume.docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  ]) {
    const link = page.getByRole("link", { name, exact: true });
    const asset = await page.request.get(
      `${url}${await link.getAttribute("href")}`,
    );
    assert.equal(asset.status(), 200);
    const bytes = await asset.body();
    assert.equal(
      bytes.subarray(0, filename.endsWith(".pdf") ? 4 : 2).toString(),
      filename.endsWith(".pdf") ? "%PDF" : "PK",
    );
    if (filename.endsWith(".pdf"))
      assert.ok(asset.headers()["content-type"].includes(mime));
    const downloadEvent = page.waitForEvent("download");
    await link.click();
    const download = await downloadEvent;
    assert.equal(download.suggestedFilename(), filename);
    assert.equal(await download.failure(), null);
  }
  const resumeAudit = await new AxeBuilder({ page })
    .include(".detail-dialog")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert.deepEqual(
    resumeAudit.violations.map((item) => item.id),
    [],
  );
  await page.screenshot({ path: `${output}resume-preview-desktop.png` });
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .locator(".resume-link")
      .evaluate((element) => element === document.activeElement),
    true,
  );
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${url}/#/resume`);
  await page.getByRole("dialog").waitFor();
  assert.equal(
    await page
      .locator("dialog")
      .evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth),
    true,
  );
  await page.locator(".resume-pages img").first().waitFor();
  await page.locator(".resume-pages img").evaluateAll(async (images) => {
    await Promise.all(images.map((image) => image.decode()));
  });
  await page.screenshot({ path: `${output}resume-preview-mobile.png` });
  await page.getByRole("button", { name: "Close detail" }).click();
  await page.waitForURL(`${url}/#/`);
  console.log(
    "PASS résumé preview, PDF/Word downloads, accessibility, mobile fit, Escape and focus return",
  );
  console.log(
    "PASS collection mobile/desktop accessibility and motion-enabled detail navigation",
  );
  await page.close();
} finally {
  await browser.close();
}
