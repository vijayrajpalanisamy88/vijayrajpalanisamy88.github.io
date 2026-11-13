// Generates public/og-image.png (1200x630 social preview) and public/apple-touch-icon.png.
// Usage: node scripts/make-og.mjs
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';

const og = `<!doctype html><html><head><style>
  body{margin:0;width:1200px;height:630px;font-family:'Segoe UI',Inter,system-ui,sans-serif;color:#e7ebf7;
    background:radial-gradient(700px 420px at 92% -5%,rgba(124,140,255,.35),transparent 60%),
    radial-gradient(600px 400px at -5% 110%,rgba(54,214,231,.18),transparent 60%),
    linear-gradient(rgba(124,140,255,.07) 1px,transparent 1px) 0 0/48px 48px,
    linear-gradient(90deg,rgba(124,140,255,.07) 1px,transparent 1px) 0 0/48px 48px,#070a14;
    display:flex;flex-direction:column;justify-content:center;padding:0 88px;box-sizing:border-box}
  .tag{font-family:Consolas,monospace;color:#36d6e7;letter-spacing:.18em;font-size:22px;text-transform:uppercase}
  h1{font-size:84px;margin:18px 0 8px;letter-spacing:-2px;background:linear-gradient(100deg,#fff 20%,#7c8cff 60%,#36d6e7);-webkit-background-clip:text;color:transparent}
  p{font-size:36px;margin:0;color:#c9d0e8;font-weight:500}
  .chips{display:flex;gap:14px;margin-top:44px;flex-wrap:wrap}
  .chips span{border:1px solid rgba(148,163,214,.3);background:rgba(28,37,66,.7);border-radius:999px;padding:10px 22px;font-size:24px;color:#c9d0e8}
  .url{position:absolute;bottom:44px;right:88px;font-family:Consolas,monospace;font-size:22px;color:#7c86a6}
</style></head><body>
  <div class="tag">// portfolio</div>
  <h1>Vijayraj Palanisamy</h1>
  <p>C#/.NET Engineer · GenAI &amp; Agentic AI Product Builder</p>
  <div class="chips"><span>15+ years</span><span>.NET · React · AWS</span><span>RAG · MCP · Agents</span><span>PromptFlowEngine</span></div>
  <div class="url">vijayrajpalanisamy88.github.io</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.screenshot({ path: 'public/og-image.png' });
const svg = readFileSync('public/favicon.svg', 'utf8');
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<html><body style="margin:0;background:#070a14">${svg.replace('<svg ', '<svg width="180" height="180" ')}</body></html>`);
await page.screenshot({ path: 'public/apple-touch-icon.png' });
await browser.close();
console.log('wrote og-image.png and apple-touch-icon.png');
