import fs from 'node:fs'
const pick = (p) =>
  fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null
const out = {
  timestamp: new Date().toISOString(),
  env: { node: process.version },
  pkg: pick('reports/pkg-summary.json'),
  mdx: pick('reports/next-mdx-highlight.json'),
  tw: pick('reports/tailwind-postcss.json'),
  css: pick('reports/css-brace-sanity.json'),
  grid: pick('reports/gridpattern-guard.json'),
  audit: pick('reports/audit.refresh.json'),
  build: pick('reports/build-summary.json'),
}
fs.writeFileSync(
  'reports/diagnostic-refresh.json',
  JSON.stringify(out, null, 2),
)
console.log('reports/diagnostic-refresh.json')
