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

    // 2) GCPro externo (_blank + noopener)
    const gcproAttrs = await page
      .$eval(
        'a[data-nav-link]:has-text("GCPro"), a[data-nav-link*="GCPro"]',
        (el) => ({
          target: el.getAttribute('target'),
          rel: el.getAttribute('rel'),
        }),
      )
      .catch(() => null)
    add(
      'gcpro:external',
      !!gcproAttrs &&
        gcproAttrs.target === '_blank' &&
        (gcproAttrs.rel || '').includes('noopener'),
      { gcproAttrs },
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

    // 4) MDX/Shiki css-variables aplicadas (verifica presença de --shiki-*)
    const shikiVars = await page.evaluate(() => {
      const root = document.documentElement
      const bg = getComputedStyle(root).getPropertyValue('--shiki-background')
      const fg = getComputedStyle(root).getPropertyValue('--shiki-foreground')
      return { bg: bg?.trim() || null, fg: fg?.trim() || null }
    })
    add('shiki:css-vars', !!(shikiVars.bg || shikiVars.fg), { shikiVars })
  } catch (e) {
    add('fatal:error', false, { message: e.message })
  } finally {
    await browser.close()
    console.log(JSON.stringify(results, null, 2))
    process.exit(results.ok ? 0 : 1)
  }
})()
