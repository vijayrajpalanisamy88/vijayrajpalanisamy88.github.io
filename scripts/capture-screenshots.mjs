// Captures the public homepages of live products for the case-study cards.
// Usage: node scripts/capture-screenshots.mjs   (re-run when a product site changes)
import { chromium } from '@playwright/test';

const only = process.argv[2];
const shots = [
  ['promptflowengine', 'https://promptflowengine.com/'],
  ['cryptotalkies', 'https://cryptotalkies.net/'],
  ['aiyoutubemanager', 'https://aiyoutubemanager.com/'],
];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, colorScheme: 'dark' });
for (const [name, url] of shots.filter(([n]) => !only || n === only)) {
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(2500);
  // dismiss first-visit overlays (tours, cookie banners) so the product itself is visible
  await page.keyboard.press('Escape').catch(() => {});
  for (const label of ['Skip tour', 'Reject']) {
    const b = page.getByRole('button', { name: label, exact: true });
    if (await b.isVisible().catch(() => false)) await b.click().catch(() => {});
  }
  await page.waitForTimeout(800);
  await page.screenshot({ path: `public/images/${name}.jpg`, type: 'jpeg', quality: 72 });
  console.log('captured', name);
  await page.close();
}
await browser.close();
