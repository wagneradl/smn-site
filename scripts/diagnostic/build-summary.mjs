import fs from 'node:fs'
const log = fs.existsSync('.next/build.log')
  ? fs.readFileSync('.next/build.log', 'utf8')
  : ''
const missingOpen = (log.match(/Missing opening {/g) || []).length
const firstLines = log
  .split('\n')
  .filter((l) => l.includes('Missing opening {'))
  .slice(0, 3)
const out = { missingOpeningBraceCount: missingOpen, sample: firstLines }
fs.writeFileSync('reports/build-summary.json', JSON.stringify(out, null, 2))
console.log('reports/build-summary.json')
