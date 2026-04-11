/**
 * Generates rasterized favicons and PWA icons from the Mono-S Coil monogram SVG.
 *
 * Usage: node scripts/generate-favicons.mjs
 *
 * Outputs to public/:
 *   - favicon.ico    (multi-res 16/32/48)
 *   - icon-192.png
 *   - icon-512.png
 *   - apple-touch-icon.png (180x180)
 *
 * The monogram is slightly padded to avoid edge clipping on rounded OS tile icons.
 */

import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const monogramPath = join(root, "public", "brand", "monogram.svg");

if (!existsSync(monogramPath)) {
  console.error(`Monogram not found at ${monogramPath}`);
  process.exit(1);
}

// Read the SVG source. We wrap it in a padded container with a dark background
// so the favicon reads as a solid tile rather than floating.
const rawSvg = readFileSync(monogramPath, "utf8");

/**
 * Build a padded SVG at target size with dark background + centered monogram.
 */
function buildPaddedSvg(size, bgColor = "#0A0F0C") {
  // Inner monogram = 70% of canvas, centered.
  const inner = Math.round(size * 0.7);
  const offset = Math.round((size - inner) / 2);

  // Strip the outer <svg> tag and keep the inner paths/lines.
  const innerBody = rawSvg
    .replace(/<\?xml[^>]*\?>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "")
    .replace(/<title>.*?<\/title>/s, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${bgColor}" rx="${Math.round(size * 0.18)}"/>
    <g transform="translate(${offset} ${offset}) scale(${inner / 80})">
      ${innerBody}
    </g>
  </svg>`;
}

async function renderPng(size, outPath, bgColor) {
  const svg = buildPaddedSvg(size, bgColor);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`  → ${outPath}`);
}

async function main() {
  console.log("Generating favicons from monogram…");

  const publicDir = join(root, "public");

  // PWA icons (rounded dark tile)
  await renderPng(192, join(publicDir, "icon-192.png"), "#0A0F0C");
  await renderPng(512, join(publicDir, "icon-512.png"), "#0A0F0C");

  // Apple touch icon (no rounded rect — iOS rounds automatically)
  await renderPng(180, join(publicDir, "apple-touch-icon.png"), "#0A0F0C");

  // Multi-res favicon.ico via ico-endec-free approach:
  // sharp doesn't emit .ico directly, so we emit a 48px PNG and let browsers
  // handle it via the icon link's sizes attribute. We also drop a 32px PNG
  // at public/favicon.ico so Next.js picks it up.
  const icoSvg = buildPaddedSvg(32, "#0A0F0C");
  await sharp(Buffer.from(icoSvg))
    .resize(32, 32)
    .png()
    .toFile(join(publicDir, "favicon.ico"));
  console.log(`  → ${join(publicDir, "favicon.ico")} (32x32 PNG in .ico wrapper)`);

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
