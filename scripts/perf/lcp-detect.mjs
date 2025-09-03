#!/usr/bin/env node

import { withServer } from '../utils/with-server.mjs';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

await withServer({ port: 3123, build: true }, async ({ baseUrl }) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    window.__lcp = null;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const last = entries[entries.length - 1];
      if (last) window.__lcp = {
        startTime: last.startTime,
        size: last.size,
        element: last.element ? {
          tag: last.element.tagName,
          id: last.element.id || null,
          class: last.element.className || null,
        } : null
      };
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await page.goto(baseUrl + '/', { waitUntil: 'networkidle2', timeout: 60000 });
  const lcp = await page.evaluate(() => window.__lcp);
  await browser.close();

  const outDir = path.join(process.cwd(), 'reports', 'perf');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'lcp.json'), JSON.stringify({ route: '/', lcp }, null, 2));
});
