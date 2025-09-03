import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT = 'reports/perf/lighthouse'
mkdirSync(OUT, { recursive: true })

// build + export estático para medir sem variações locais
execSync('npm run build', { stdio: 'inherit' })

const routes = ['/', '/work', '/contact', '/blog']
const assertions = {
  performance: 0.9,
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.95,
}

const run = (url, name) => {
  const cmd = `npx lighthouse http://localhost:3000${url} --preset=desktop --output=json --output-path=${OUT}/${name}.json --quiet`
  execSync(cmd, { stdio: 'inherit' })
}

try {
  execSync('npm run start & sleep 3', { stdio: 'inherit', shell: true })
  for (const r of routes) {
    const tag = r === '/' ? 'home' : r.replace(/\//g, '_').replace(/^_/, '')
    run(r, tag || 'index')
  }
} finally {
  // no-op: rely on shell to exit dev server
}

// Assertions simples
const read = (n) => JSON.parse(readFileSync(join(OUT, n + '.json'), 'utf8'))
const scores = {}
for (const r of routes) {
  const tag = r === '/' ? 'home' : r.replace(/\//g, '_').replace(/^_/, '')
  const j = read(tag || 'index')
  scores[tag] = {
    performance: j.categories.performance.score,
    accessibility: j.categories.accessibility.score,
    'best-practices': j.categories['best-practices'].score,
    seo: j.categories.seo.score,
  }
  for (const [k, min] of Object.entries(assertions)) {
    if (scores[tag][k] < min) {
      console.error(`❌ LH ${tag} ${k} ${scores[tag][k]} < ${min}`)
      process.exit(1)
    }
  }
}
writeFileSync(
  join(OUT, 'summary.json'),
  JSON.stringify({ routes, scores, assertions }, null, 2),
)
console.log('✅ Lighthouse baseline ok')
