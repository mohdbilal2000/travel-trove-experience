/**
 * One-off generator for SEO / PWA assets that were referenced in metadata,
 * schema and manifest.json but missing from the repo (causing 404s):
 *   - logo.png, icon-192.png, icon-512.png  (rasterised from favicon.svg brand mark)
 *   - og-default.jpg, og-plans.jpg, og-blog.jpg  (true 1200x630 social cards)
 *   - screenshot-desktop.png, screenshot-mobile.png  (PWA manifest screenshots)
 *
 * Run: node scripts/generate-seo-assets.cjs
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const SVG = path.join(ROOT, 'public', 'favicon.svg');
const IMG = (...p) => path.join(ROOT, 'public', 'images', ...p);
const PUB = (...p) => path.join(ROOT, 'public', ...p);

const svg = fs.readFileSync(SVG);

// Photos that already exist in the repo, used as the basis for social cards.
const sources = {
  ogDefault: IMG('agra', 'naveen-kumar-dusi-tsvjaIFFo1A-unsplash.jpg'),
  ogPlans:   IMG('jaipur', 'getty-images-zlqHXvaEIiI-unsplash.jpg'),
  ogBlog:    IMG('delhi', 'getty-images-C4Yf3Wbymg8-unsplash.jpg'),
  shotWide:  IMG('agra', 'getty-images-Mfck6jSVcbY-unsplash.jpg'),
  shotTall:  IMG('jaipur', 'getty-images-zlqHXvaEIiI-unsplash.jpg'),
};

async function rasterIcon(size, out) {
  await sharp(svg, { density: 384 }).resize(size, size, { fit: 'cover' }).png().toFile(out);
  console.log('  ✓', path.relative(ROOT, out), `(${size}x${size})`);
}

async function card(src, w, h, out, jpeg = true) {
  let img = sharp(src).resize(w, h, { fit: 'cover', position: 'attention' });
  img = jpeg ? img.jpeg({ quality: 80, mozjpeg: true }) : img.png({ quality: 80 });
  await img.toFile(out);
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log('  ✓', path.relative(ROOT, out), `(${w}x${h}, ${kb}KB)`);
}

(async () => {
  console.log('Brand icons (from favicon.svg):');
  await rasterIcon(512, PUB('logo.png'));
  await rasterIcon(192, IMG('icon-192.png'));
  await rasterIcon(512, IMG('icon-512.png'));

  console.log('Social cards (1200x630):');
  await card(sources.ogDefault, 1200, 630, IMG('og-default.jpg'));
  await card(sources.ogPlans, 1200, 630, IMG('og-plans.jpg'));
  await card(sources.ogBlog, 1200, 630, IMG('og-blog.jpg'));

  console.log('PWA screenshots:');
  await card(sources.shotWide, 1280, 720, IMG('screenshot-desktop.png'), false);
  await card(sources.shotTall, 390, 844, IMG('screenshot-mobile.png'), false);

  console.log('Done.');
})().catch((e) => { console.error(e); process.exit(1); });
