import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import AxeBuilder from "@axe-core/playwright";

const url = process.env.PORTFOLIO_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url);
  await page.locator(".places-tile").waitFor();
  await page.waitForTimeout(800);
  const labelOpacity = (index) =>
    page
      .locator(`.location-stop-${index} .map-label`)
      .evaluate((element) => Number(getComputedStyle(element).opacity));
  assert.equal(await labelOpacity(1), 1);
  await page.locator(".photo-hover").evaluate((image) => image.decode());
  await page.locator(".photo-tile").hover();
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".photo-hover")).opacity === "1",
  );
  assert.ok(
    await page
      .locator(".photo-hover")
      .evaluate(
        (image) =>
          new DOMMatrixReadOnly(getComputedStyle(image).transform).a > 1,
      ),
  );
  await page.screenshot({ path: ".portfolio-checks/photo-hover.png" });
  await page.locator(".introduction").hover();
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".photo-hover")).opacity === "0",
  );
  for (const theme of ["light", "dark"]) {
    await page.evaluate(
      (theme) => (document.documentElement.dataset.theme = theme),
      theme,
    );
    await page.locator(".tool-dock li").nth(2).hover();
    await page.waitForTimeout(250);
    assert.ok(
      await page
        .locator(".tool-dock li")
        .nth(2)
        .locator("img")
        .evaluate(
          (image) =>
            new DOMMatrixReadOnly(getComputedStyle(image).transform).a > 1,
        ),
    );
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(
      audit.violations.map((item) => item.id),
      [],
      `${theme} hover contrast`,
    );
    await page.screenshot({
      path: `.portfolio-checks/experience-hover-${theme}.png`,
    });
  }
  await page.evaluate(() => (document.documentElement.dataset.theme = "light"));
  await page.locator(".places-tile").hover();
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".route-leg-one"))
        .strokeDashoffset === "0px",
  );
  assert.equal(
    await labelOpacity(2),
    1,
    "Labels stay visible throughout the drawing",
  );
  assert.ok(
    await page
      .locator(".route-leg-two")
      .evaluate(
        (element) => parseFloat(getComputedStyle(element).strokeDashoffset) > 0,
      ),
    "The second segment follows the first",
  );
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".route-leg-two"))
        .strokeDashoffset === "0px",
  );
  assert.equal(await labelOpacity(0), 1);
  await page.screenshot({
    path: ".portfolio-checks/location-trail-complete.png",
  });
  await page.locator(".photo-tile").hover();
  assert.equal(await labelOpacity(2), 1);
  await page.locator(".places-tile").hover();
  assert.equal(await labelOpacity(2), 1);
  assert.ok(
    await page
      .locator(".route-leg-two")
      .evaluate(
        (element) => parseFloat(getComputedStyle(element).strokeDashoffset) > 0,
      ),
    "Trail replays on a new hover",
  );

  await page.locator(".athletics-tile").hover();
  await page.waitForFunction(
    () => !document.querySelector(".compact-video video").paused,
  );
  await page.waitForFunction(
    () => document.querySelector(".compact-video video").currentTime > 0,
  );
  assert.equal(
    await page.locator(".compact-video video").evaluate((video) => video.muted),
    true,
  );
  await page.locator(".photo-tile").hover();
  await page.waitForFunction(
    () => document.querySelector(".compact-video video").paused,
  );
  await page.locator(".athletics-tile").hover();
  await page.getByRole("button", { name: "Pause athletics video" }).click();
  await page.getByRole("button", { name: "Play athletics video" }).click();
  await page.locator(".photo-tile").hover();
  assert.equal(
    await page
      .locator(".compact-video video")
      .evaluate((video) => video.paused),
    false,
    "Explicit playback survives pointer exit",
  );

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".photo-tile").hover();
  assert.equal(
    await page
      .locator(".photo-hover")
      .evaluate((image) => getComputedStyle(image).transform),
    "none",
  );
  assert.equal(
    await page
      .locator(".photo-hover")
      .evaluate((image) => getComputedStyle(image).transitionDuration),
    "0s",
  );
  await page.locator(".tool-dock li").nth(2).hover();
  assert.equal(
    await page
      .locator(".tool-dock li")
      .nth(2)
      .locator("img")
      .evaluate((image) => getComputedStyle(image).transform),
    "none",
  );
  await page.locator(".athletics-tile").hover();
  assert.equal(
    await page
      .locator(".compact-video video")
      .evaluate((video) => video.paused),
    true,
  );
  assert.equal(
    await labelOpacity(2),
    1,
    "Reduced motion keeps location text visible",
  );
  assert.equal(
    await page
      .locator(".route-leg-one")
      .evaluate((element) => getComputedStyle(element).animationName),
    "none",
  );
  await page.getByRole("button", { name: "Play athletics video" }).click();
  await page.getByRole("button", { name: "Pause athletics video" }).waitFor();
  await page.getByRole("button", { name: "Pause athletics video" }).click();

  const colors = await page
    .locator(
      ".places-tile .tile-identity > svg, .education-tile .tile-identity > svg, .all-projects-tile .tile-identity > svg, .syllabus-tile .tile-identity > svg, .contact-tile .tile-identity > svg, .resume-link > svg:not(.shortcut-arrow), .github-mark",
    )
    .evaluateAll((icons) => icons.map((icon) => getComputedStyle(icon).color));
  assert.equal(colors.length, 7);
  assert.equal(new Set(colors).size, 7, "Header accents are distinct");
  assert.equal(await page.locator(".resume-art").isVisible(), true);
  assert.equal(await page.locator(".github-mark").isVisible(), true);
  assert.deepEqual(errors, []);
  await context.close();

  const touch = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });
  const phone = await touch.newPage();
  await phone.goto(url);
  await phone.locator(".map-label").first().waitFor();
  assert.equal(
    await phone
      .locator(".location-stop-2 .map-label")
      .evaluate((element) => getComputedStyle(element).opacity),
    "1",
    "Touch devices show every location without hover",
  );
  assert.equal(
    await phone
      .locator(".compact-video video")
      .evaluate((video) => video.paused),
    true,
  );
  assert.equal(
    await phone
      .locator(".photo-hover")
      .evaluate((image) => getComputedStyle(image).opacity),
    "0",
  );
  assert.equal(
    await phone
      .locator("html")
      .evaluate((html) => html.scrollWidth <= innerWidth),
    true,
  );
  await touch.close();
  console.log(
    "PASS photo crossfade/zoom, experience hover/contrast, trail replay, muted hover playback, manual controls, reduced motion, touch fallback, and distinct header accents",
  );
} finally {
  await browser.close();
}
