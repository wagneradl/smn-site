#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../');

// Lista de logos usados no site (baseado no código)
const logoFiles = [
  'src/images/clients/magalu/logo-dark.svg',
  'src/images/clients/magalu/logo-light.svg',
  'src/images/clients/momentum/logo-light.svg',
  'src/images/clients/momentum/logo-dark.svg',
  'src/images/clients/autovox/logo-light.svg',
  'src/images/clients/autovox/logo-dark.svg',
  'src/images/clients/teixeira-fortes/logo-light.svg',
  'src/images/clients/teixeira-fortes/logo-dark.svg',
  'src/images/clients/cea/logo-light.svg',
  'src/images/clients/cea/logo-dark.svg',
  'src/images/clients/leve-asset/logo-light.svg',
  'src/images/clients/leve-asset/logo-dark.svg',
  'src/images/clients/casa-do-construtor/logo-light.svg',
  'src/images/clients/casa-do-construtor/logo-dark.svg',
  'src/images/clients/liceu-francano/logo-light.svg',
  'src/images/clients/liceu-francano/logo-dark.svg',
];

function extractViewBox(svgContent) {
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  if (viewBoxMatch) {
    const [, viewBox] = viewBoxMatch;
    const [x, y, width, height] = viewBox.split(' ').map(Number);
    return { width, height, aspect: width / height };
  }
  
  // Fallback: procurar por width/height
  const widthMatch = svgContent.match(/width=["']([^"']+)["']/);
  const heightMatch = svgContent.match(/height=["']([^"']+)["']/);
  
  if (widthMatch && heightMatch) {
    const width = parseFloat(widthMatch[1]);
    const height = parseFloat(heightMatch[1]);
    return { width, height, aspect: width / height };
  }
  
  return null;
}

function analyzeLogo(filePath) {
  try {
    const fullPath = join(projectRoot, filePath);
    const content = readFileSync(fullPath, 'utf8');
    const dimensions = extractViewBox(content);
    
    if (!dimensions) {
      console.warn(`⚠️  Não foi possível extrair dimensões de ${filePath}`);
      return null;
    }
    
    const name = filePath.split('/').pop().replace('.svg', '');
    const client = filePath.split('/')[3]; // src/images/clients/[client]/...
    
    return {
      name,
      client,
      path: filePath,
      width: dimensions.width,
      height: dimensions.height,
      aspect: Math.round(dimensions.aspect * 100) / 100,
      inline: false
    };
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return null;
  }
}

// Processar todos os logos
const results = logoFiles
  .map(analyzeLogo)
  .filter(Boolean);

// Agrupar por cliente
const clients = {};
results.forEach(logo => {
  if (!clients[logo.client]) {
    clients[logo.client] = [];
  }
  clients[logo.client].push(logo);
});

// Gerar manifest
const manifest = {
  generated: new Date().toISOString(),
  total: results.length,
  clients: Object.keys(clients).length,
  logos: results,
  byClient: clients
};

// Salvar manifest
const manifestPath = join(projectRoot, 'reports/clients-logos.manifest.json');
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`✅ Manifest gerado: ${manifestPath}`);
console.log(`📊 Total de logos: ${results.length}`);
console.log(`🏢 Clientes: ${Object.keys(clients).length}`);

// Mostrar resumo por cliente
console.log('\n📋 Resumo por cliente:');
Object.entries(clients).forEach(([client, logos]) => {
  console.log(`  ${client}:`);
  logos.forEach(logo => {
    console.log(`    ${logo.name}: ${logo.width}x${logo.height} (aspect: ${logo.aspect})`);
  });
});
