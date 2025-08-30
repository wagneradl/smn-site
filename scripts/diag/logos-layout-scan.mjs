// ESM
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * Buckets por aspect ratio (equilíbrio óptico)
 * - wide:    ≥ 3.0
 * - emblem:  ≤ 1.5  (selos/quase quadrados, ex.: C&A)
 * - standard: intermediário
 */
const bucketFromAspect = (ar) => {
  if (!Number.isFinite(ar) || ar <= 0) return 'standard'
  if (ar >= 3.0) return 'wide'
  if (ar <= 1.5) return 'emblem'
  return 'standard'
}

const pad = (s, n) => (s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length))

const drawAsciiGrid = (slugs, computed, cols = 2) => {
  // 2 colunas por padrão, linhas conforme necessário
  const tag = (slug) => {
    const b = computed[slug] || '?'
    const letter = b === 'wide' ? 'W' : b === 'emblem' ? 'E' : b === 'standard' ? 'S' : '?'
    return `${slug} (${letter})`
  }

  const cellW = Math.max(
    14,
    ...slugs.map((s) => tag(s).length + 2) // +2 de folga visual
  )
  const lineH = '─'.repeat(cellW)
  const top = `┌${lineH}┬${lineH}┐`
  const mid = `├${lineH}┼${lineH}┤`
  const bot = `└${lineH}┴${lineH}┘`

  const rows = []
  for (let i = 0; i < slugs.length; i += cols) {
    const left = slugs[i] ? pad(` ${tag(slugs[i])} `, cellW) : ' '.repeat(cellW)
    const right = slugs[i + 1] ? pad(` ${tag(slugs[i + 1])} `, cellW) : ' '.repeat(cellW)
    rows.push(`│${left}│${right}│`)
  }

  if (rows.length === 0) return ''
  return [top, rows.map((r, i) => (i < rows.length - 1 ? `${r}\n${mid}` : r)).join('\n'), bot].join(
    '\n'
  )
}

try {
  const report = {
    timestamp: new Date().toISOString(),
    classificationSource: 'computed',
    brandsOrder: [],
    computed: {}, // slug -> bucket
    buckets: { wide: 0, standard: 0, emblem: 0 },
    aspectRatios: {}, // slug -> aspect
    asciiGrid: '',
  }

  // 1) Manifest existente (se houver)
  let manifest = null
  try {
    const manifestPath = join(process.cwd(), 'reports', 'clients-logos.manifest.json')
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch {
    manifest = null
  }

  // 2) Extração de brands na ordem da página (preferencial)
  let pageContent = ''
  try {
    pageContent = readFileSync(join(process.cwd(), 'src', 'app', 'page.tsx'), 'utf8')
  } catch {}

  let orderedSlugs = []
  if (pageContent) {
    const re = /data-brand="([^"]+)"/g
    let m
    while ((m = re.exec(pageContent))) orderedSlugs.push(m[1])
  }

  // 3) Fallback: tenta clients.ts
  if (orderedSlugs.length === 0) {
    try {
      const clientsTs = readFileSync(join(process.cwd(), 'src', 'lib', 'clients.ts'), 'utf8')
      const re = /['"`]([A-Za-z\s&]+)['"`]\s*:\s*{/g
      let m
      while ((m = re.exec(clientsTs))) {
        const slug = m[1].toLowerCase().replaceAll('&', 'and').replace(/\s+/g, '-')
        orderedSlugs.push(slug)
      }
    } catch {}
  }

  // 4) Se ainda não houver ordem, derive pelo diretório de imagens
  if (orderedSlugs.length === 0) {
    try {
      const base = join(process.cwd(), 'src', 'images', 'clients')
      if (existsSync(base)) {
        orderedSlugs = readdirSync(base, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name)
          .sort()
      }
    } catch {}
  }

  report.brandsOrder = orderedSlugs

  // 5) Calcular aspect por slug (manifest preferencial), senão lendo SVGs
  const slugAspect = {}
  if (manifest?.byClient) {
    for (const [slug, files] of Object.entries(manifest.byClient)) {
      const first = files?.[0]
      const aspect = Number(first?.aspect || first?.aspectRatio || 0)
      if (aspect > 0) slugAspect[slug] = aspect
    }
  }

  // Complementa com scan das pastas, se necessário
  const base = join(process.cwd(), 'src', 'images', 'clients')
  if (existsSync(base)) {
    const dirs = readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory())
    for (const d of dirs) {
      const slug = d.name
      if (!slugAspect[slug]) {
        const files = readdirSync(join(base, slug)).filter((f) => f.endsWith('.svg'))
        const first = files[0]
        if (first) {
          try {
            const svg = readFileSync(join(base, slug, first), 'utf8')
            const vb = svg.match(/viewBox="([^"]+)"/)
            if (vb) {
              const [, viewBox] = vb
              const [, , w, h] = viewBox.split(/\s+/).map(Number)
              const ar = w / h
              if (Number.isFinite(ar) && ar > 0) slugAspect[slug] = ar
            }
          } catch {}
        }
      }
    }
  }

  report.aspectRatios = slugAspect

  // 6) Buckets computados
  for (const slug of orderedSlugs) {
    const ar = slugAspect[slug]
    const b = bucketFromAspect(ar)
    report.computed[slug] = b
    report.buckets[b]++
  }

  // 7) Grade ASCII (2 colunas)
  report.asciiGrid = drawAsciiGrid(orderedSlugs, report.computed, 2)

  // 8) Salvar
  const outJson = join(process.cwd(), 'reports', 'diag', 'logos-layout.json')
  writeFileSync(outJson, JSON.stringify(report, null, 2))

  const outTxt = join(process.cwd(), 'reports', 'diag', 'logos-grid.txt')
  writeFileSync(outTxt, report.asciiGrid + '\n')

  console.log('✅ Logos layout scan completed (computed buckets + ASCII grid)')
} catch (error) {
  const out = {
    timestamp: new Date().toISOString(),
    error: { message: error.message, stack: error.stack },
  }
  const outJson = join(process.cwd(), 'reports', 'diag', 'logos-layout.json')
  writeFileSync(outJson, JSON.stringify(out, null, 2))
  console.error('❌ Logos layout scan failed:', error.message)
}
