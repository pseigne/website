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
  await page.evaluate(() => document.fonts.ready);
  const greeting = page.locator("#intro-title");
  assert.equal(
    await greeting.evaluate((element) => getComputedStyle(element).fontWeight),
    "900",
  );
  const biographyTop = await page
    .locator(".intro-copy > p")
    .evaluate((element) => element.getBoundingClientRect().top);
  await greeting.hover();
  for (const style of ["serif", "hand", "italic", "original"]) {
    await page.waitForFunction(
      (style) =>
        document.querySelector("#intro-title").dataset.typeStyle === style,
      style,
    );
    assert.equal(
      await page
        .locator(".intro-copy > p")
        .evaluate((element) => element.getBoundingClientRect().top),
      biographyTop,
      "Typeface changes keep the biography stable",
    );
    if (style === "italic")
      assert.equal(
        await greeting.evaluate(
          (element) => getComputedStyle(element).fontStyle,
        ),
        "italic",
      );
    await page.screenshot({ path: `.portfolio-checks/greeting-${style}.png` });
  }
  await page.waitForFunction(
    () => !document.querySelector("#intro-title").dataset.typeStyle,
  );
  const socials = page.locator(".social-links");
  for (const [name, href] of [
    ["GitHub", "https://github.com/pseigne"],
    ["X", "https://x.com/KingSeigne"],
    ["LinkedIn", "https://www.linkedin.com/in/pierce-seigne-b310a0305"],
  ]) {
    assert.equal(
      await socials
        .getByRole("link", {
          name: `${name} (opens in a new tab)`,
          exact: true,
        })
        .getAttribute("href"),
      href,
    );
  }
  assert.equal(await page.locator(".socials-heading").count(), 0);
  for (const name of ["GitHub", "X", "LinkedIn"]) {
    const link = socials.getByRole("link", {
      name: `${name} (opens in a new tab)`,
      exact: true,
    });
    assert.equal(await link.getAttribute("target"), "_blank");
    assert.equal(
      await link
        .locator(".social-portrait")
        .evaluate((image) => getComputedStyle(image).opacity),
      "0",
    );
    await link.hover();
    await page.waitForTimeout(280);
    assert.equal(
      await link
        .locator(".social-portrait")
        .evaluate((image) => getComputedStyle(image).opacity),
      "1",
    );
    assert.equal(
      await link
        .locator(".social-tab-arrow")
        .evaluate((arrow) => getComputedStyle(arrow).opacity),
      "1",
    );
    assert.ok(
      await link
        .locator(".social-mark")
        .evaluate(
          (mark) =>
            new DOMMatrixReadOnly(getComputedStyle(mark).transform).a > 1,
        ),
    );
    await page.screenshot({
      path: `.portfolio-checks/social-hover-${name.toLowerCase()}.png`,
    });
    await page.locator(".introduction").hover();
    await page.waitForTimeout(280);
  }
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
    const matrix = await page
      .locator(".tool-dock li")
      .nth(2)
      .locator("img")
      .evaluate((image) => {
        const transform = new DOMMatrixReadOnly(
          getComputedStyle(image).transform,
        );
        return {
          scale: transform.a,
          x: transform.e,
          y: transform.f,
          skew: transform.b,
        };
      });
    assert.ok(Math.abs(matrix.scale - 1.06) < 0.002);
    assert.equal(matrix.x, 0);
    assert.equal(matrix.y, 0);
    assert.equal(matrix.skew, 0);
    assert.equal(
      await page
        .locator(".tool-dock li")
        .nth(1)
        .locator("img")
        .evaluate((image) => getComputedStyle(image).transform),
      "none",
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
  await greeting.hover();
  assert.equal(await greeting.getAttribute("data-type-style"), null);
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
    "PASS greeting font sequence/stable layout, social links, simple icon scale/social reveals, photo crossfade, trail replay, muted hover playback, reduced motion, touch fallback, and header accents",
  );
} finally {
  await browser.close();
}
