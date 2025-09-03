#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const BASE_URL = 'http://localhost:3000';

async function detectLCP() {
  console.log('Starting LCP detection...');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    // Navigate to home page
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
    
    // Wait for LCP to be available
    await page.waitForFunction(() => {
      return performance.getEntriesByType('largest-contentful-paint').length > 0;
    }, { timeout: 10000 });
    
    // Get LCP entries
    const lcpData = await page.evaluate(() => {
      const entries = performance.getEntriesByType('largest-contentful-paint');
      const latestEntry = entries[entries.length - 1];
      
      if (!latestEntry) return null;
      
      // Get element details
      const element = latestEntry.element;
      let elementInfo = null;
      
      if (element) {
        elementInfo = {
          tagName: element.tagName,
          id: element.id || null,
          className: element.className || null,
          src: element.src || null,
          textContent: element.textContent ? element.textContent.substring(0, 100) : null,
        };
      }
      
      return {
        startTime: latestEntry.startTime,
        size: latestEntry.size,
        element: elementInfo,
        timestamp: Date.now(),
      };
    });
    
    if (lcpData) {
      console.log('LCP detected:', {
        startTime: `${lcpData.startTime.toFixed(2)}ms`,
        size: `${lcpData.size}px²`,
        element: lcpData.element,
      });
      
      // Create reports directory
      await fs.mkdir('reports/perf', { recursive: true });
      
      // Save LCP report
      await fs.writeFile(
        'reports/perf/lcp.json',
        JSON.stringify(lcpData, null, 2)
      );
      
      console.log('LCP report saved to: reports/perf/lcp.json');
    } else {
      console.log('No LCP data found');
    }
    
  } catch (error) {
    console.error('Error during LCP detection:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

detectLCP();
