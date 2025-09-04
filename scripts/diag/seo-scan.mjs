#!/usr/bin/env node

import { withServer } from '../utils/with-server.mjs';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const routes = ['/', '/work', '/blog', '/contact'];

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

  const meta = [], ld = [];
  
  if (usePuppeteer && browser) {
    // Usa Puppeteer se disponível
    const page = await browser.newPage();
    
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
        ld.push({ route: r, blocks: [], error: String(e) });
      }
    }
    
    await browser.close();
  } else {
    // Fallback: verifica apenas se as rotas respondem
    console.log('🔍 Verificando rotas via HTTP...');
    
    for (const r of routes) {
      const url = baseUrl + r;
      try {
        const response = await fetch(url);
        if (response.ok) {
          meta.push({ 
            route: r, 
            status: 'OK',
            note: 'Puppeteer não disponível - verificação limitada'
          });
          ld.push({ 
            route: r, 
            blocks: [],
            note: 'Puppeteer não disponível - verificação limitada'
          });
        } else {
          meta.push({ route: r, error: `HTTP ${response.status}` });
          ld.push({ route: r, blocks: [], error: `HTTP ${response.status}` });
        }
      } catch (e) {
        meta.push({ route: r, error: String(e) });
        ld.push({ route: r, blocks: [], error: String(e) });
      }
    }
  }

  const outDir = path.join(process.cwd(), 'reports', 'seo');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'meta-scan.json'), JSON.stringify(meta, null, 2));
  fs.writeFileSync(path.join(outDir, 'ld-json.json'), JSON.stringify(ld, null, 2));
  
  console.log('✅ SEO scan concluído');
  if (!usePuppeteer) {
    console.log('⚠️  Executado em modo fallback (sem Puppeteer)');
  }
});
