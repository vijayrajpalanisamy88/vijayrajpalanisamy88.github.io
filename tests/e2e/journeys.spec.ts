import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 1024;

/** On mobile the section links live in the hamburger menu. */
async function goToSection(page: Page, label: string) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.locator('#mobile-menu').getByRole('link', { name: label, exact: true }).click();
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
  } else {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: label, exact: true }).click();
  }
}

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  (page as Page & { __errors: string[] }).__errors = errors;
});

test.afterEach(async ({ page }) => {
  expect((page as Page & { __errors: string[] }).__errors, 'console / page errors').toEqual([]);
});

test('visitor lands on the homepage and understands who this is', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Vijayraj Palanisamy/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vijayraj Palanisamy');
  await expect(page.getByText('C#/.NET engineer building GenAI and Agentic AI products')).toBeVisible();
  await expect(page.getByText('Senior Consultant · Enterprise R&D IT').first()).toBeVisible();
  await expect(page.getByText('15+', { exact: true })).toBeVisible();
  // no horizontal scrolling at any viewport
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('SEO metadata and structured data are present in the served HTML', async ({ request }) => {
  const html = await (await request.get('/')).text();
  expect(html).toContain('<link rel="canonical" href="https://vijayrajpalanisamy88.github.io/"');
  expect(html).toMatch(/<meta name="description" content="[^"]{80,}"/);
  expect(html).toContain('property="og:image" content="https://vijayrajpalanisamy88.github.io/og-image.png"');
  expect(html).toContain('"@type":"ProfilePage"');
  // content is prerendered, not client-only
  expect(html).toContain('Career timeline');
  expect(html).toContain('PromptFlowEngine');
  for (const block of html.match(/<script type="application\/ld\+json">(.*?)<\/script>/g) ?? []) {
    expect(() => JSON.parse(block.replace(/<\/?script[^>]*>/g, ''))).not.toThrow();
  }
  for (const path of ['/robots.txt', '/sitemap.xml', '/og-image.png', '/favicon.svg']) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/projects/promptflowengine/');
});

test('visitor views professional experience', async ({ page }) => {
  await page.goto('/');
  await goToSection(page, 'Experience');
  await expect(page).toHaveURL(/#experience$/);
  const gavs = page.getByRole('button', { name: /\.NET Developer.*GAVS Technologies/ });
  await gavs.click();
  await expect(gavs).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#role-gavs-dotnet-developer')).toBeVisible();
  await expect(page.locator('#role-gavs-dotnet-developer')).toContainText('client requirements');
});

test('visitor filters skills', async ({ page }) => {
  await page.goto('/#skills');
  const skills = page.locator('#skills');
  const all = await skills.locator('article li button').count();
  await skills.getByRole('button', { name: /^Currently learning/ }).click();
  await expect(skills.locator('article li button')).toHaveCount(1);
  await skills.getByRole('button', { name: 'All evidence' }).click();
  await expect(skills.locator('article li button')).toHaveCount(all);
  const bedrock = skills.getByRole('button', { name: /AWS Bedrock/ });
  await bedrock.click();
  await expect(skills.getByRole('status')).toContainText('Current role');
});

test('visitor filters projects by category and technology', async ({ page }) => {
  await page.goto('/#projects');
  const grid = page.getByTestId('project-grid');
  await page.getByRole('group', { name: 'Filter projects by category' }).getByRole('button', { name: 'Mobile' }).click();
  const slugs = await grid.getByTestId('project-card').evaluateAll((els) => els.map((e) => e.getAttribute('data-slug')));
  expect(slugs).toContain('ai-pdf-scanner');
  expect(slugs).not.toContain('promptflowengine');
  await page.getByRole('group', { name: 'Filter projects by category' }).getByRole('button', { name: /^All/ }).click();
  await page.getByRole('group', { name: 'Filter projects by technology' }).getByRole('button', { name: '.NET' }).click();
  const net = await grid.getByTestId('project-card').evaluateAll((els) => els.map((e) => e.getAttribute('data-slug')));
  expect(net).toContain('aiyoutubemanager');
  expect(net).not.toContain('cryptotalkies');
});

test('visitor opens a case study and it reads as a full page', async ({ page }) => {
  await page.goto('/#projects');
  const card = page.locator('[data-slug="cryptotalkies"]');
  await card.getByRole('button', { name: 'Quick view' }).click();
  await expect(card.getByText('Problem:')).toBeVisible();
  await card.getByRole('link', { name: /Case study/ }).click();
  await expect(page).toHaveURL(/\/projects\/cryptotalkies\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('CryptoTalkies');
  await expect(page).toHaveTitle(/CryptoTalkies — case study/);
  for (const h of ['Overview', 'The problem', 'My role', 'Implemented features', 'System architecture', 'Engineering challenges and approaches', 'Roadmap (not yet shipped)']) {
    await expect(page.getByRole('heading', { name: h })).toBeVisible();
  }
  await page.getByRole('link', { name: 'All projects' }).click();
  await expect(page).toHaveURL(/\/#projects$/);
});

test('direct links to case studies work on refresh (prerendered)', async ({ page, request }) => {
  for (const slug of ['promptflowengine', 'aiyoutubemanager', 'ai-pdf-scanner']) {
    const res = await request.get(`/projects/${slug}/`);
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain(`<link rel="canonical" href="https://vijayrajpalanisamy88.github.io/projects/${slug}/"`);
  }
  await page.goto('/projects/aiyoutubemanager/');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AIYouTubeManager');
});

test('unknown pages show a helpful not-found view', async ({ page }) => {
  const res = await page.goto('/projects/does-not-exist/');
  // GitHub Pages answers 404 (correct for SEO); the browser logs that status as a console error, which is expected here
  if (res?.status() === 404) {
    const errs = (page as Page & { __errors: string[] }).__errors;
    const i = errs.findIndex((e) => e.includes('status of 404'));
    if (i >= 0) errs.splice(i, 1);
  }
  await expect(page.getByRole('heading', { name: 'This page does not exist' })).toBeVisible();
});

test('visitor explores an architecture diagram', async ({ page }) => {
  await page.goto('/#architecture');
  const explorer = page.locator('#architecture');
  await explorer.getByRole('tab', { name: 'AIYouTubeManager' }).click();
  await expect(explorer.getByRole('tab', { name: 'AIYouTubeManager' })).toHaveAttribute('aria-selected', 'true');
  await explorer.getByRole('button', { name: /PostgreSQL \+ pgvector/ }).click();
  await expect(explorer.getByTestId('arch-detail')).toContainText('vector embeddings');
  // keyboard support on the tablist
  await explorer.getByRole('tab', { name: 'AIYouTubeManager' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(explorer.getByRole('tab', { name: 'MSEW Infra Projects' })).toHaveAttribute('aria-selected', 'true');
});

test('no resume download and no employer name anywhere (owner decision)', async ({ page, request }) => {
  // GitHub Pages answers 404 here; the local preview server falls back to the homepage (200).
  // Either way, no PDF may be served.
  const pdf = await request.get('/Vijayraj_Palanisamy_Resume.pdf');
  expect(pdf.headers()['content-type'] ?? '').not.toContain('application/pdf');
  for (const path of ['/', '/projects/promptflowengine/', '/projects/plate-maestro/', '/sitemap.xml']) {
    const body = await (await request.get(path)).text();
    expect(body, path).not.toMatch(/astra\s*zeneca|plate\s*maestro|appito/i);
  }
  await page.goto('/');
  await expect(page.locator('a[download], a[href$=".pdf"]')).toHaveCount(0);
  await expect(page.locator('#resume')).toHaveCount(0);
});

test('visitor finds GitHub and contact options', async ({ page }) => {
  await page.goto('/');
  const gh = page.getByRole('link', { name: 'GitHub profile (opens in new tab)' });
  await expect(gh).toHaveAttribute('href', 'https://github.com/vijayrajpalanisamy88');
  await expect(gh).toHaveAttribute('rel', /noopener/);
  await goToSection(page, 'Contact');
  const contact = page.locator('#contact');
  await expect(contact.getByRole('link', { name: /Email me/ })).toHaveAttribute('href', /^mailto:vijayrajpalanisamy@gmail\.com/);
  await expect(contact).not.toContainText(/\+91/);
});

test('dark / light theme toggles and persists', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.getByTestId('theme-toggle').click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(246, 247, 251)');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'light');
});

test('reduced motion: content is visible without animation', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/reduce-motion/);
  await expect(page.locator('.reveal').first()).toHaveCSS('opacity', '1');
  await ctx.close();
});

test('motion toggle turns animations off', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Turn animations off' }).click();
  await expect(page.locator('html')).toHaveClass(/reduce-motion/);
  await expect(page.getByRole('button', { name: 'Turn animations on' })).toBeVisible();
});

test('keyboard users can skip to content', async ({ page }) => {
  test.skip(isMobile(page), 'keyboard-only check on desktop');
  test.skip(test.info().project.name.startsWith('webkit'), 'Safari only tabs to links when "Press Tab to highlight each item" is enabled');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

for (const path of ['/', '/projects/promptflowengine/']) {
  for (const theme of ['dark', 'light']) {
    test(`no serious accessibility violations on ${path} (${theme})`, async ({ page }) => {
      test.skip(test.info().project.name !== 'chromium-desktop', 'axe runs once, on desktop Chromium');
      await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([]);
    });
  }
}
