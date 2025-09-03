#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

const ROUTES = ['/', '/work', '/blog', '/contact'];
const BASE_URL = 'http://localhost:3000';

async function scanRoute(page, route) {
  console.log(`Scanning ${route}...`);
  
  try {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' });
    
    // Get title
    const title = await page.title();
    
    // Get meta tags
    const metaTags = await page.evaluate(() => {
      const metas = document.querySelectorAll('meta');
      const result = {};
      
      metas.forEach(meta => {
        const name = meta.getAttribute('name') || meta.getAttribute('property');
        const content = meta.getAttribute('content');
        if (name && content) {
          result[name] = content;
        }
      });
      
      return result;
    });
    
    // Get JSON-LD
    const jsonLd = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      return Array.from(scripts).map(script => {
        try {
          return JSON.parse(script.textContent);
        } catch (e) {
          return null;
        }
      }).filter(Boolean);
    });
    
    return {
      route,
      title,
      metaTags,
      jsonLd
    };
  } catch (error) {
    console.error(`Error scanning ${route}:`, error.message);
    return {
      route,
      error: error.message
    };
  }
}

async function main() {
  console.log('Starting SEO scan...');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    const results = [];
    
    for (const route of ROUTES) {
      const result = await scanRoute(page, route);
      results.push(result);
    }
    
    // Create reports directory
    await fs.mkdir('reports/seo', { recursive: true });
    
    // Save meta scan results
    const metaResults = results.map(({ route, title, metaTags, error }) => ({
      route,
      title,
      metaTags,
      error
    }));
    
    await fs.writeFile(
      'reports/seo/meta-scan.json',
      JSON.stringify(metaResults, null, 2)
    );
    
    // Save JSON-LD results
    const ldResults = results.map(({ route, jsonLd, error }) => ({
      route,
      jsonLd,
      error
    }));
    
    await fs.writeFile(
      'reports/seo/ld-json.json',
      JSON.stringify(ldResults, null, 2)
    );
    
    console.log('SEO scan completed!');
    console.log('Reports saved to:');
    console.log('- reports/seo/meta-scan.json');
    console.log('- reports/seo/ld-json.json');
    
  } catch (error) {
    console.error('Error during scan:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
