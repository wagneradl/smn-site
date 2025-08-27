#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../');

async function analyzeLogoLayout() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Configurar viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('🌐 Navegando para http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Aguardar carregamento da página
    await page.waitForTimeout(2000);
    
    // Scroll até a seção de clientes
    console.log('📜 Fazendo scroll até a seção de clientes...');
    await page.evaluate(() => {
      const clientsSection = document.querySelector('.bg-gradient-to-br.from-primary-800.to-primary-900');
      if (clientsSection) {
        clientsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    
    await page.waitForTimeout(1000);
    
    // Encontrar a seção de clientes
    const clientsSection = await page.$('.bg-gradient-to-br.from-primary-800.to-primary-900');
    if (!clientsSection) {
      throw new Error('Seção de clientes não encontrada');
    }
    
    // Capturar screenshot da seção
    console.log('📸 Capturando screenshot da seção...');
    await clientsSection.screenshot({
      path: join(projectRoot, 'reports/clients-logos.section.png'),
      type: 'png'
    });
    
    // Analisar layout dos logos
    console.log('🔍 Analisando layout dos logos...');
    const layoutData = await page.evaluate(() => {
      const brandsGrid = document.querySelector('.brands-grid');
      if (!brandsGrid) return null;
      
      const logoItems = brandsGrid.querySelectorAll('li');
      const layout = [];
      
      // Informações do grid
      const gridRect = brandsGrid.getBoundingClientRect();
      const gridStyles = window.getComputedStyle(brandsGrid);
      
      // Informações do título
      const title = document.querySelector('.brands-header h2');
      const titleRect = title ? title.getBoundingClientRect() : null;
      const titleStyles = title ? window.getComputedStyle(title) : null;
      
      logoItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (!img) return;
        
        const itemRect = item.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        const itemStyles = window.getComputedStyle(item);
        const imgStyles = window.getComputedStyle(img);
        
        // Extrair classes aplicadas
        const classes = Array.from(item.classList);
        const isWide = classes.includes('brand--wide');
        const isTall = classes.includes('brand--tall');
        const isEmblem = classes.includes('brand--emblem');
        const isRaise = classes.includes('brand--raise');
        const isLower = classes.includes('brand--lower');
        
        // Extrair escala customizada
        const transform = itemStyles.transform;
        const scale = transform !== 'none' ? 
          parseFloat(transform.match(/scale\(([^)]+)\)/)?.[1] || '1') : 1;
        
        layout.push({
          index,
          client: img.alt,
          src: img.src,
          classes: {
            base: 'brand',
            wide: isWide,
            tall: isTall,
            emblem: isEmblem,
            raise: isRaise,
            lower: isLower
          },
          boundingBox: {
            item: {
              x: Math.round(itemRect.x),
              y: Math.round(itemRect.y),
              width: Math.round(itemRect.width),
              height: Math.round(itemRect.height)
            },
            image: {
              x: Math.round(imgRect.x),
              y: Math.round(imgRect.y),
              width: Math.round(imgRect.width),
              height: Math.round(imgRect.height)
            }
          },
          styles: {
            scale: scale,
            transform: transform,
            maxWidth: imgStyles.maxWidth,
            maxHeight: imgStyles.maxHeight,
            height: imgStyles.height,
            width: imgStyles.width
          },
          position: {
            row: Math.floor(index / 4), // 4 colunas no desktop
            column: index % 4
          }
        });
      });
      
      return {
        grid: {
          boundingBox: {
            x: Math.round(gridRect.x),
            y: Math.round(gridRect.y),
            width: Math.round(gridRect.width),
            height: Math.round(gridRect.height)
          },
          styles: {
            display: gridStyles.display,
            gridTemplateColumns: gridStyles.gridTemplateColumns,
            gap: gridStyles.gap,
            columnGap: gridStyles.columnGap,
            rowGap: gridStyles.rowGap,
            maxWidth: gridStyles.maxWidth,
            margin: gridStyles.margin
          }
        },
        title: title ? {
          text: title.textContent?.trim(),
          boundingBox: {
            x: Math.round(titleRect.x),
            y: Math.round(titleRect.y),
            width: Math.round(titleRect.width),
            height: Math.round(titleRect.height)
          },
          styles: {
            fontSize: titleStyles.fontSize,
            fontWeight: titleStyles.fontWeight,
            lineHeight: titleStyles.lineHeight
          }
        } : null,
        logos: layout
      };
    });
    
    if (!layoutData) {
      throw new Error('Não foi possível extrair dados do layout');
    }
    
    // Salvar dados do layout
    const layoutPath = join(projectRoot, 'reports/clients-logos.layout.json');
    writeFileSync(layoutPath, JSON.stringify(layoutData, null, 2));
    
    console.log(`✅ Layout salvo: ${layoutPath}`);
    console.log(`📊 Logos analisados: ${layoutData.logos.length}`);
    
    // Mostrar resumo
    console.log('\n📋 Resumo do layout:');
    console.log(`  Grid: ${layoutData.grid.boundingBox.width}x${layoutData.grid.boundingBox.height}`);
    console.log(`  Título: ${layoutData.title?.text}`);
    console.log(`  Logos: ${layoutData.logos.length}`);
    
    layoutData.logos.forEach(logo => {
      console.log(`    ${logo.client}: ${logo.boundingBox.image.width}x${logo.boundingBox.image.height} (${logo.classes.wide ? 'wide' : logo.classes.tall ? 'tall' : logo.classes.emblem ? 'emblem' : 'standard'})`);
    });
    
    return layoutData;
    
  } catch (error) {
    console.error('❌ Erro durante análise:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Executar análise
analyzeLogoLayout().catch(console.error);
