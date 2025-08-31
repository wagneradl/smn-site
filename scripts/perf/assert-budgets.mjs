import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const budgets = {
  firstLoadJS_kb: 170,        // teto global
  routeMaxKB: {               // tetos por rota crítica (ajuste se necessário)
    '/': 180,
    '/work': 180,
    '/contact': 170,
  },
}

const buildReportPath = join(process.cwd(), 'reports', 'diag', 'build.json')
const txt = readFileSync(buildReportPath, 'utf8')
const data = JSON.parse(txt)
const lines = (data.output || '').split('\n')

const kb = s => Number(String(s).replace(/[^\d.]/g, ''))

let firstLoad = null
const routes = {}
for (const line of lines) {
  if (line.includes('First Load JS shared by all')) {
    const m = line.match(/First Load JS.*?(\d+\s*kB)/)
    if (m) firstLoad = kb(m[1])
  }
  // linhas tipo: "┌ ○ /contact    2.4 kB         153 kB"
  const r = line.match(/^\s*[├┌└]\s[○ƒ]\s+([/\w\-\_]+)\s+[\d\.]+\s*kB\s+(\d+)\s*kB/)
  if (r) routes[r[1]] = kb(r[2])
}

const failures = []
if (firstLoad != null && firstLoad > budgets.firstLoadJS_kb) {
  failures.push(`First Load JS ${firstLoad}kB > ${budgets.firstLoadJS_kb}kB`)
}

for (const [route, size] of Object.entries(routes)) {
  const max = budgets.routeMaxKB[route]
  if (max && size > max) failures.push(`${route} ${size}kB > ${max}kB`)
}

const result = { ok: failures.length === 0, firstLoad, routes, failures, budgets }
writeFileSync(join(process.cwd(), 'reports', 'perf', 'budgets.json'), JSON.stringify(result, null, 2))
if (failures.length) {
  console.error('❌ Perf budgets failed:\n' + failures.join('\n'))
  process.exit(1)
} else {
  console.log('✅ Perf budgets ok', result)
}
