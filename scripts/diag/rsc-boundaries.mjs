import fg from 'fast-glob'
import { readFileSync, writeFileSync } from 'fs'

const files = await fg(['src/**/*.{tsx,jsx}'])
const client = []
for (const f of files) {
  const s = readFileSync(f, 'utf8')
  if (/^\s*['"]use client['"]/.test(s)) {
    client.push({
      file: f,
      hasFramer: s.includes('framer-motion'),
      hasBrowserApis: /window\.|document\.|localStorage/.test(s),
    })
  }
}
writeFileSync('reports/diag/rsc-boundaries.json', JSON.stringify({ client }, null, 2))
console.log('✅ RSC boundaries scan complete')
