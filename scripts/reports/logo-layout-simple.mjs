#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../');

// Ler o manifest gerado anteriormente
const manifestPath = join(projectRoot, 'reports/clients-logos.manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

// Análise baseada nos dados do manifest
function analyzeLayout() {
  const logos = manifest.logos;
  
  // Classificar por aspect ratio
  const wide = logos.filter(logo => logo.aspect > 3);
  const standard = logos.filter(logo => logo.aspect >= 1.2 && logo.aspect <= 3);
  const tall = logos.filter(logo => logo.aspect < 1.2);
  
  // Análise de desalinhamento
  const analysis = {
    generated: new Date().toISOString(),
    summary: {
      total: logos.length,
      wide: wide.length,
      standard: standard.length,
      tall: tall.length
    },
    classification: {
      wide: wide.map(logo => ({
        client: logo.client,
        name: logo.name,
        aspect: logo.aspect,
        dimensions: `${logo.width}x${logo.height}`
      })),
      standard: standard.map(logo => ({
        client: logo.client,
        name: logo.name,
        aspect: logo.aspect,
        dimensions: `${logo.width}x${logo.height}`
      })),
      tall: tall.map(logo => ({
        client: logo.client,
        name: logo.name,
        aspect: logo.aspect,
        dimensions: `${logo.width}x${logo.height}`
      }))
    },
    hotSpots: {
      // Identificar potenciais problemas de alinhamento
      extremeWide: wide.filter(logo => logo.aspect > 4),
      extremeTall: tall.filter(logo => logo.aspect < 0.8),
      inconsistentHeights: logos.filter(logo => logo.height !== 36)
    },
    recommendations: []
  };
  
  // Gerar recomendações
  if (analysis.hotSpots.extremeWide.length > 0) {
    analysis.recommendations.push({
      type: 'extreme_wide',
      message: 'Logos muito largos podem causar desalinhamento',
      logos: analysis.hotSpots.extremeWide.map(logo => logo.client)
    });
  }
  
  if (analysis.hotSpots.extremeTall.length > 0) {
    analysis.recommendations.push({
      type: 'extreme_tall',
      message: 'Logos muito altos podem parecer desproporcionais',
      logos: analysis.hotSpots.extremeTall.map(logo => logo.client)
    });
  }
  
  if (analysis.hotSpots.inconsistentHeights.length > 0) {
    analysis.recommendations.push({
      type: 'inconsistent_heights',
      message: 'Alturas inconsistentes podem afetar o alinhamento',
      logos: analysis.hotSpots.inconsistentHeights.map(logo => logo.client)
    });
  }
  
  return analysis;
}

// Executar análise
const layoutAnalysis = analyzeLayout();

// Salvar análise
const layoutPath = join(projectRoot, 'reports/clients-logos.layout.json');
writeFileSync(layoutPath, JSON.stringify(layoutAnalysis, null, 2));

console.log(`✅ Análise de layout salva: ${layoutPath}`);
console.log(`📊 Resumo:`);
console.log(`  Total: ${layoutAnalysis.summary.total}`);
console.log(`  Wide: ${layoutAnalysis.summary.wide}`);
console.log(`  Standard: ${layoutAnalysis.summary.standard}`);
console.log(`  Tall: ${layoutAnalysis.summary.tall}`);

console.log('\n📋 Classificação por aspect ratio:');
console.log('  Wide (>3):', layoutAnalysis.classification.wide.map(l => `${l.client} (${l.aspect})`).join(', '));
console.log('  Standard (1.2-3):', layoutAnalysis.classification.standard.map(l => `${l.client} (${l.aspect})`).join(', '));
console.log('  Tall (<1.2):', layoutAnalysis.classification.tall.map(l => `${l.client} (${l.aspect})`).join(', '));

if (layoutAnalysis.recommendations.length > 0) {
  console.log('\n⚠️  Recomendações:');
  layoutAnalysis.recommendations.forEach(rec => {
    console.log(`  ${rec.type}: ${rec.message} - ${rec.logos.join(', ')}`);
  });
}
