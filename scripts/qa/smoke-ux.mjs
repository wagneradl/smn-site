import puppeteer from 'puppeteer'

const HOST = process.env.APP_HOST || 'http://localhost:3000'

;(async () => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  const results = { ok: true, checks: [] }
  const add = (name, pass, meta = {}) =>
    results.checks.push({
      name,
      pass,
      ...meta,
      ts: new Date().toISOString(),
    }) || (results.ok = results.ok && pass)

  try {
    await page.goto(HOST, { waitUntil: 'networkidle0' })

    // 1) Navegação tem 6 itens (conta "data-nav-link")
    const navCount = await page.$$eval('[data-nav-link]', (els) => els.length)
    add('nav:6-items', navCount >= 6, { navCount })

    // 2) GCPro externo (_blank + noopener) — sem :has-text
    const gcpro = await page.$$eval('[data-nav-link]', (els) => {
      const toInfo = (el) => ({
        target: el.getAttribute('target'),
        rel: el.getAttribute('rel'),
        href: el.getAttribute('href'),
        text: (el.textContent || '').trim(),
      })

      // por texto visível
      const byText = els.find((el) =>
        /gc\s*pro/i.test(el.textContent || ''),
      )
      if (byText) return toInfo(byText)

      // fallback por href externo contendo "gcpro"
      const byHref = els.find((el) => {
        const href = el.getAttribute('href') || ''
        return /^https?:\/\//i.test(href) && /gcpro/i.test(href)
      })
      return byHref ? toInfo(byHref) : null
    })
    add(
      'gcpro:external',
      !!gcpro &&
        gcpro.target === '_blank' &&
        (gcpro.rel || '').includes('noopener'),
      { gcpro },
    )

    // 3) Foco visível nos links do menu (Tab)
    await page.keyboard.press('Tab') // deve focar o 1º link do menu
    const outline = await page.evaluate(() => {
      const el = document.activeElement
      if (!el) return null
      const s = getComputedStyle(el)
      return { outlineWidth: s.outlineWidth, outlineColor: s.outlineColor }
    })
    add('focus-visible:outline', !!outline && outline.outlineWidth !== '0px', {
      outline,
    })

    // 4) Shiki/css-variables — verificar se estão disponíveis globalmente
    const rootVars = await page.evaluate(() => {
      const s = getComputedStyle(document.documentElement)
      return {
        bg: s.getPropertyValue('--shiki-background')?.trim() || null,
        fg: s.getPropertyValue('--shiki-foreground')?.trim() || null,
        comment: s.getPropertyValue('--shiki-token-comment')?.trim() || null,
        string: s.getPropertyValue('--shiki-token-string')?.trim() || null,
      }
    })
    
    // Verificar se pelo menos algumas variáveis estão definidas
    const hasShikiVars = !!(rootVars.bg || rootVars.fg || rootVars.comment || rootVars.string)
    add('shiki:css-vars', hasShikiVars, {
      scope: 'root',
      vars: rootVars,
    })
  } catch (e) {
    add('fatal:error', false, { message: e.message })
  } finally {
    await browser.close()
    console.log(JSON.stringify(results, null, 2))
    process.exit(results.ok ? 0 : 1)
  }
})()
