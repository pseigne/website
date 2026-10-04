import { mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { chromium } from "@playwright/test";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = `${root}public/images`;
await mkdir(output, { recursive: true });
const suppliedCard = process.argv[2];
if (suppliedCard) {
  await copyFile(suppliedCard, `${output}/coder-card-original.png`);
  await sharp(suppliedCard)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(`${output}/coder-card.webp`);
}
for (const [source, name] of [
  ["hero.jpg", "pierce"],
  ["time_visualizer_mockup.png", "time"],
]) {
  await sharp(`${root}src/assets/${source}`)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`${output}/${name}.webp`);
}
if (process.argv.includes("--capture-neon")) {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    await page.goto("https://www.neon.ai/", {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `${output}/neon-site.png`,
      animations: "disabled",
    });
    await sharp(`${output}/neon-site.png`)
      .webp({ quality: 85 })
      .toFile(`${output}/neon-site.webp`);
    console.log("Captured Neon.ai:", await page.title());
  } finally {
    await browser.close();
  }
}
console.log("Portfolio image assets prepared.");
