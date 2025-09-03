import fg from 'fast-glob'
import { readFileSync, writeFileSync } from 'fs'

const files = await fg(['src/**/*.{tsx,jsx}'], { dot: false })
const hits = []
for (const f of files) {
  const src = readFileSync(f, 'utf8')
  if (src.includes("from 'next/image'")) {
    const count = (src.match(/<Image\s/gi) || []).length
    // Regex mais preciso para detectar <Image sem sizes
    const missingSizes = (src.match(/<Image\s+(?![^>]*\bsizes\s*=)/gis) || [])
      .length
    if (count) hits.push({ file: f, total: count, missingSizes })
  }
}
writeFileSync(
  'reports/diag/next-image-audit.json',
  JSON.stringify({ hits }, null, 2),
)
console.log('✅ next/image audit complete')
