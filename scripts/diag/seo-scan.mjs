#!/usr/bin/env node

import { withServer } from '../utils/with-server.mjs';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const routes = ['/', '/work', '/blog', '/contact'];

await withServer(async ({ baseUrl }) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const meta = [], ld = [];
  for (const r of routes) {
    const url = baseUrl + r;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      const data = await page.evaluate(() => {
        const get = (sel) => document.querySelector(sel)?.getAttribute('content') || null;
        const metas = {
          title: document.title || null,
          description: document.querySelector('meta[name="description"]')?.content || null,
          ogImage: document.querySelector('meta[property="og:image"]')?.content || null,
          twitterImage: document.querySelector('meta[name="twitter:image"]')?.content || null,
        };
        const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
          .map(n => n.textContent).filter(Boolean);
        return { metas, jsonLd };
      });
      meta.push({ route: r, ...data.metas });
      ld.push({ route: r, blocks: data.jsonLd });
    } catch (e) {
      meta.push({ route: r, error: String(e) });
    }
  }
  await browser.close();

  const outDir = path.join(process.cwd(), 'reports', 'seo');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'meta-scan.json'), JSON.stringify(meta, null, 2));
  fs.writeFileSync(path.join(outDir, 'ld-json.json'), JSON.stringify(ld, null, 2));
});
