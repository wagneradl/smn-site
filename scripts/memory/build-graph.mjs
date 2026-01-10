// scripts/memory/build-graph.mjs
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const P = (p) => resolve(process.cwd(), p)
const R = {
  mdx: 'reports/diag/next-mdx-shiki.json',
  nav: 'reports/diag/nav-grid.json',
  logos: 'reports/diag/logos-layout.json',
  img: 'reports/diag/next-image-audit.json',
  meta: 'reports/seo/meta-scan.json',
  ld: 'reports/seo/ld-json.json',
  http: 'reports/diag/http-endpoints.json',
  budgets: 'reports/perf/budgets.json',
  lcp: 'reports/perf/lcp.json',
  nextConfig: 'next.config.mjs',
}

function readJson(path) {
  const full = P(path)
  if (!existsSync(full)) return null
  try {
    return JSON.parse(readFileSync(full, 'utf8'))
  } catch {
    return null
  }
}
function readText(path) {
  const full = P(path)
  if (!existsSync(full)) return null
  try {
    return readFileSync(full, 'utf8')
  } catch {
    return null
  }
}

const graph = {
  timestamp: new Date().toISOString(),
  nodes: [],
  edges: [],
  invariants: [], // {id, domain, desc, status: 'pass'|'warn'|'fail', evidence, hint}
}

function addNode(id, data) {
  graph.nodes.push({ id, ...data })
}
function edge(from, to, label) {
  graph.edges.push({ from, to, label })
}
function inv(domain, desc, ok, evidence, hint = '') {
  graph.invariants.push({
    id: `${domain}:${desc}`.toLowerCase().replace(/\s+/g, '-'),
    domain,
    desc,
    status: ok ? 'pass' : 'fail',
    evidence,
    hint,
  })
}

// ---------- MDX/SHIKI ----------
;(() => {
  const j = readJson(R.mdx)
  const s = j?.shikiConfig
  const order = s?.pipelineOrder?.order || []
  const hasTheme = s?.hasCssVariablesTheme && s?.themeName === 'css-variables'
  const hasCustomTheme =
    s?.hasCreateHighlighter &&
    /customTheme|smn-dark/.test(readText(R.nextConfig) || '')
  const hasRehype = s?.hasShikijsRehype === true
  addNode('mdx-shiki', {
    order,
    hasTheme: hasTheme || hasCustomTheme,
    hasRehype,
  })
  inv(
    'MDX',
    'remark→rehype',
    order[0] === 'remark' && order[1] === 'rehype',
    R.mdx,
    'Ajuste next.config.mjs',
  )
  inv(
    'MDX',
    'tema css-variables ou customizado',
    !!(hasTheme || hasCustomTheme),
    R.mdx,
    "createCssVariablesTheme({ name: 'css-variables' }) ou tema customizado",
  )
  inv(
    'MDX',
    '@shikijs/rehype presente',
    !!hasRehype,
    R.mdx,
    'adicione plugin de rehype do Shiki',
  )
})()

// ---------- NAVEGAÇÃO ----------
;(() => {
  const j = readJson(R.nav)
  const n = j?.navigation
  addNode('nav', n || {})
  inv('NAV', '6 itens no desktop', n?.hasSixItems === true, R.nav)
  inv(
    'NAV',
    'GCPro externo seguro',
    n?.gcproExternal === true,
    R.nav,
    'target="_blank" rel="noopener noreferrer"',
  )
  inv(
    'NAV',
    'prefetch desativado (GCPro)',
    n?.gcproPrefetch === true,
    R.nav,
    'prefetch={false}',
  )
  inv(
    'A11Y',
    'foco visível',
    n?.hasVisibleFocus === true,
    R.nav,
    'outline/focus-visible no CSS',
  )
})()

// ---------- LOGOS ----------
;(() => {
  const j = readJson(R.logos)
  const b = j?.buckets || {}
  addNode('logos', { buckets: b, brandsOrder: j?.brandsOrder })
  const okBuckets =
    typeof b.wide === 'number' &&
    typeof b.standard === 'number' &&
    typeof b.emblem === 'number'
  inv(
    'LOGOS',
    'buckets presentes',
    okBuckets,
    R.logos,
    'reexecute scanner de logos',
  )
  inv(
    'LOGOS',
    'mínimo 1 por bucket',
    okBuckets && b.wide > 0 && b.standard > 0 && b.emblem > 0,
    R.logos,
    'garanta distribuição: wide/standard/emblem',
  )
})()

// ---------- IMAGENS ----------
;(() => {
  const j = readJson(R.img)
  const offenders = j?.hits?.filter((h) => h.missingSizes > 0) ?? []
  addNode('images', { offenders: offenders.length })
  inv(
    'IMG',
    'todos next/image com sizes',
    offenders.length === 0,
    R.img,
    'corrija sizes por layout',
  )
})()

// ---------- SEO / LD / HTTP ----------
;(() => {
  const meta = readJson(R.meta) || []
  const ld = readJson(R.ld) || []
  const http = readJson(R.http) || []
  addNode('seo-meta', { total: meta.length })
  addNode('seo-ld', { total: ld.length })
  addNode('http-endpoints', { total: http.length })

  const routes = ['/', '/work', '/blog', '/contact']
  for (const r of routes) {
    const row = meta.find((m) => m.route === r)
    inv(
      'SEO',
      `meta em ${r}`,
      !!row && !!row.title && !!row.description,
      R.meta,
      'title/description/og/twitter',
    )
  }
  const home = ld.find((x) => x.route === '/')
  const joined = (home?.blocks || []).join('|')
  inv(
    'SEO',
    'JSON-LD Organization na home',
    joined.includes('"@type":"Organization"'),
    R.ld,
  )
  inv(
    'SEO',
    'JSON-LD WebSite na home',
    joined.includes('"@type":"WebSite"'),
    R.ld,
  )

  const robots = http.find((x) => x.route === '/robots.txt' && x.status === 200)
  const sitemap = http.find(
    (x) => x.route === '/sitemap.xml' && x.status === 200,
  )
  inv('SEO', '/robots.txt 200', !!robots, R.http)
  inv('SEO', '/sitemap.xml 200', !!sitemap, R.http)
})()

// ---------- PERF / LCP / SECURITY ----------
;(() => {
  const budgets = readJson(R.budgets)
  const lcp = readJson(R.lcp)
  const cfg = readText(R.nextConfig) || ''
  addNode('perf', { ok: budgets?.ok, firstLoad: budgets?.firstLoad })
  addNode('lcp', {
    present: !!lcp,
    startTime: lcp?.lcp?.startTime ?? lcp?.startTime ?? null,
  })

  inv('PERF', 'budgets ok', budgets?.ok === true, R.budgets)
  const max = budgets?.budgets?.firstLoadJS_kb ?? 170
  inv(
    'PERF',
    `First Load JS ≤ ${max}kB`,
    (budgets?.firstLoad ?? 9999) <= max,
    R.budgets,
  )

  inv(
    'PERF',
    'LCP registrado',
    !!(lcp?.lcp || lcp?.startTime),
    R.lcp,
    'rode qa:seo (harness efêmero)',
  )

  const REQ = [
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'X-Frame-Options',
    'Permissions-Policy',
  ]
  for (const h of REQ) {
    inv(
      'SEC',
      `header ${h}`,
      cfg.includes(h),
      R.nextConfig,
      'configure headers em next.config.mjs',
    )
  }
})()

// ---------- Salva graph.json e graph.md ----------
writeFileSync(P('reports/memory/graph.json'), JSON.stringify(graph, null, 2))

const pass = graph.invariants.filter((i) => i.status === 'pass').length
const fail = graph.invariants.filter((i) => i.status === 'fail').length

let md = `# Memory Graph — ${new Date().toLocaleString()}

**Invariantes:** ✅ ${pass} • ❌ ${fail}

## Checklist
`
for (const invv of graph.invariants) {
  md += `- [${invv.status === 'pass' ? 'x' : ' '}] **${invv.domain}** — ${invv.desc}\n`
}
md += `

## Nós
`
for (const n of graph.nodes) {
  md += `- **${n.id || n.node || n.domain || n.name || 'node'}**: \`${JSON.stringify(n)}\`\n`
}
md += `

## Evidências
- Gerado a partir de relatórios em \`reports/**\` e \`${R.nextConfig}\`.
`

writeFileSync(P('reports/memory/graph.md'), md)
console.log('✅ memory-graph gerado em reports/memory/')
