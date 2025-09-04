#!/usr/bin/env node

import { withServer } from '../utils/with-server.mjs';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

await withServer(async ({ baseUrl }) => {
  let browser;
  let usePuppeteer = true;
  
  try {
    // Tenta usar Puppeteer com configurações compatíveis com CI
    browser = await puppeteer.launch({ 
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
  } catch (error) {
    console.warn('⚠️  Puppeteer falhou, usando fallback HTTP-only');
    usePuppeteer = false;
  }

  let lcp = null;
  
  if (usePuppeteer && browser) {
    // Usa Puppeteer se disponível
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
    
    try {
      await page.goto(baseUrl + '/', { waitUntil: 'networkidle2', timeout: 60000 });
      lcp = await page.evaluate(() => window.__lcp);
    } catch (e) {
      console.warn('⚠️  Erro ao medir LCP:', e.message);
    }
    
    await browser.close();
  } else {
    // Fallback: simula dados básicos de LCP
    console.log('🔍 LCP detection em modo fallback...');
    lcp = {
      startTime: 0,
      size: 0,
      element: null,
      note: 'Puppeteer não disponível - LCP simulado'
    };
  }

  const outDir = path.join(process.cwd(), 'reports', 'perf');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'lcp.json'), JSON.stringify({ route: '/', lcp }, null, 2));
  
  console.log('✅ LCP detection concluído');
  if (!usePuppeteer) {
    console.log('⚠️  Executado em modo fallback (sem Puppeteer)');
  }
});
