import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
const read = (p) => {
  try {
    return readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}
const uniq = (a) => [...new Set(a)]

const bucketFromAspect = (ar) =>
  ar >= 3.0 ? 'wide' : ar <= 1.5 ? 'emblem' : 'standard'
const pad = (s, n) =>
  s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length)
const drawGrid = (slugs, computed, cols = 2) => {
  const tag = (s) => `${s} (${computed[s][0].toUpperCase()})`
  const cell = Math.max(14, ...slugs.map((s) => tag(s).length + 2))
  const line = '─'.repeat(cell)
  const top = `┌${line}┬${line}┐`,
    mid = `├${line}┼${line}┤`,
    bot = `└${line}┴${line}┘`
  const rows = []
  for (let i = 0; i < slugs.length; i += cols) {
    const L = slugs[i] ? pad(` ${tag(slugs[i])} `, cell) : ' '.repeat(cell)
    const R = slugs[i + 1]
      ? pad(` ${tag(slugs[i + 1])} `, cell)
      : ' '.repeat(cell)
    rows.push(`│${L}│${R}│`)
  }
  return rows.length
    ? [
        top,
        rows
          .map((r, i) => (i < rows.length - 1 ? `${r}\n${mid}` : r))
          .join('\n'),
        bot,
      ].join('\n')
    : ''
}

try {
  const out = {
    timestamp: new Date().toISOString(),
    classificationSource: 'computed',
    brandsOrder: [],
    computed: {},
    buckets: { wide: 0, standard: 0, emblem: 0 },
    aspectRatios: {},
    asciiGrid: '',
  }

  // 1) coletar slugs da UI (home + work)
  const pages = [
    join(process.cwd(), 'src', 'app', 'page.tsx'),
    join(process.cwd(), 'src', 'app', 'work', 'page.tsx'),
  ]
  const slugsUI = uniq(
    pages.flatMap((p) => {
      const s = read(p)
      if (!s) return []
      const res = []
      let m
      const re = /data-brand="([^"]+)"/g
      while ((m = re.exec(s))) res.push(m[1])
      return res
    }),
  )

  // 2) Estratégia robusta: usar manifest como fonte de verdade
  let slugs = [...slugsUI]
  
  // Se não encontrou na UI, usar manifest existente
  const manifestPath = join(process.cwd(), 'reports', 'clients-logos.manifest.json')
  const manifest = existsSync(manifestPath) ? JSON.parse(read(manifestPath)) : null
  
  if (manifest?.byClient && Object.keys(manifest.byClient).length > 0) {
    // Usar slugs do manifest (mais confiável)
    slugs = Object.keys(manifest.byClient).sort()
  } else {
    // Fallback: extrair do clients.ts usando regex mais robusto
    const clients = read(join(process.cwd(), 'src', 'lib', 'clients.ts'))
    const clientMatches = clients.match(/['"`]([A-Za-z\s&]+)['"`]\s*:\s*{/g)
    if (clientMatches) {
      slugs = clientMatches.map(match => {
        const nameMatch = match.match(/['"`]([A-Za-z\s&]+)['"`]/)
        return nameMatch ? nameMatch[1].toLowerCase().replaceAll('&','and').replace(/\s+/g,'-') : null
      }).filter(Boolean)
    }
  }
  if (slugs.length === 0) {
    const base = join(process.cwd(), 'src', 'images', 'clients')
    if (existsSync(base))
      slugs = readdirSync(base, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort()
  }
  out.brandsOrder = slugs

  // 3) aspect ratios (manifest preferencial + scan SVG)
  const aspect = {}
  if (manifest?.byClient) {
    for (const [slug, files] of Object.entries(manifest.byClient)) {
      const f = files?.[0]
      const a = Number(f?.aspect || f?.aspectRatio || 0)
      if (a > 0) aspect[slug] = a
    }
  }
  const base = join(process.cwd(), 'src', 'images', 'clients')
  if (existsSync(base)) {
    for (const slug of slugs) {
      if (aspect[slug]) continue
      const dir = join(base, slug)
      try {
        const svg = readdirSync(dir).find((f) => f.endsWith('.svg'))
        if (svg) {
          const c = read(join(dir, svg))
          const vb = /viewBox="([^"]+)"/.exec(c)
          if (vb) {
            const [, box] = vb
            const [, , w, h] = box.split(/\s+/).map(Number)
            const ar = w / h
            if (Number.isFinite(ar) && ar > 0) aspect[slug] = ar
          }
        }
      } catch {}
    }
  }
  out.aspectRatios = aspect

  // 4) buckets computados
  slugs.forEach((slug) => {
    const b = bucketFromAspect(aspect[slug])
    out.computed[slug] = b
    out.buckets[b]++
  })

  // 5) ASCII 2 colunas
  out.asciiGrid = drawGrid(slugs, out.computed, 2)

  writeFileSync(
    join(process.cwd(), 'reports', 'diag', 'logos-layout.json'),
    JSON.stringify(out, null, 2),
  )
  writeFileSync(
    join(process.cwd(), 'reports', 'diag', 'logos-grid.txt'),
    out.asciiGrid + '\n',
  )
  console.log('✅ Logos layout (multi-página) concluído')
} catch (error) {
  writeFileSync(
    join(process.cwd(), 'reports', 'diag', 'logos-layout.json'),
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        error: { message: error.message, stack: error.stack },
      },
      null,
      2,
    ),
  )
  console.error('❌ Logos layout scan failed:', error.message)
}
