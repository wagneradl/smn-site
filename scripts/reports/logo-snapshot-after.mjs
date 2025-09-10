#!/usr/bin/env node

import { writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '../../')

// Valores implementados após as mudanças
const BUCKET = {
  Magalu: 'wide',
  Momentum: 'wide',
  Autovoxx: 'wide',
  'Leve Asset': 'wide',
  'Casa do Construtor': 'wide',
  'Teixeira Fortes': 'standard',
  'Liceu Francano': 'standard',
  CEA: 'emblem',
}

const LOOK = {
  Magalu: { s: 0.96 },
  Momentum: { s: 0.98 },
  Autovoxx: { s: 0.98 },
  'Leve Asset': { s: 1.03 },
  'Casa do Construtor': { s: 1.03 },
  'Teixeira Fortes': { s: 1.06 },
  'Liceu Francano': { s: 1.02 },
  CEA: { s: 1.22, dy: '-1px' },
}

// Gerar snapshot
const snapshot = {
  generated: new Date().toISOString(),
  description: 'Valores efetivos após ajuste ótico fino',
  buckets: BUCKET,
  opticalAdjustments: LOOK,
  summary: {
    wide: Object.values(BUCKET).filter((b) => b === 'wide').length,
    standard: Object.values(BUCKET).filter((b) => b === 'standard').length,
    emblem: Object.values(BUCKET).filter((b) => b === 'emblem').length,
    total: Object.keys(BUCKET).length,
  },
  analysis: {
    scaleRange: {
      min: Math.min(...Object.values(LOOK).map((l) => l.s || 1)),
      max: Math.max(...Object.values(LOOK).map((l) => l.s || 1)),
      average:
        Object.values(LOOK).reduce((sum, l) => sum + (l.s || 1), 0) /
        Object.keys(LOOK).length,
    },
    verticalAdjustments: Object.values(LOOK).filter((l) => l.dy).length,
  },
}

// Salvar snapshot
const snapshotPath = join(projectRoot, 'reports/clients-logos.after.json')
writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2))

console.log(`✅ Snapshot salvo: ${snapshotPath}`)
console.log(`📊 Resumo:`)
console.log(`  Wide: ${snapshot.summary.wide}`)
console.log(`  Standard: ${snapshot.summary.standard}`)
console.log(`  Emblem: ${snapshot.summary.emblem}`)
console.log(
  `  Escala: ${snapshot.analysis.scaleRange.min.toFixed(2)} - ${snapshot.analysis.scaleRange.max.toFixed(2)} (média: ${snapshot.analysis.scaleRange.average.toFixed(2)})`,
)
console.log(`  Ajustes verticais: ${snapshot.analysis.verticalAdjustments}`)
