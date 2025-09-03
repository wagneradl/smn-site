#!/usr/bin/env node

import { withServer } from '../utils/with-server.mjs';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

await withServer({ port: 3123, build: true }, async ({ baseUrl }) => {
  const routes = ['/robots.txt', '/sitemap.xml'];
  const results = [];
  for (const r of routes) {
    try {
      const res = await fetch(baseUrl + r);
      const text = await res.text();
      results.push({ route: r, status: res.status, ok: res.ok, snippet: text.slice(0, 300) });
    } catch (e) {
      results.push({ route: r, error: String(e) });
    }
  }
  const outDir = path.join(process.cwd(), 'reports', 'diag');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'http-endpoints.json'), JSON.stringify(results, null, 2));
});
