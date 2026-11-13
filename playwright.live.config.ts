import base from './playwright.config';
import { defineConfig } from '@playwright/test';
// Runs the same journeys against the deployed site: npx playwright test -c playwright.live.config.ts
export default defineConfig({ ...base, webServer: undefined, use: { ...base.use, baseURL: 'https://vijayrajpalanisamy88.github.io' } });
