import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

try {
  const tailwind = {
    timestamp: new Date().toISOString(),
    postcss: {
      hasTailwindPostcss: false,
      hasTailwindImport: false,
    },
    cssFiles: {},
    issues: {
      nonAscii: [],
      unbalancedBraces: [],
      layerOrder: [],
      missingTokens: [],
      missingGuards: [],
    },
  }

  // Verificar postcss.config.js
  try {
    const postcssPath = join(process.cwd(), 'postcss.config.js')
    const postcssContent = readFileSync(postcssPath, 'utf8')

    tailwind.postcss.hasTailwindPostcss = postcssContent.includes(
      '@tailwindcss/postcss',
    )
    tailwind.postcss.hasTailwindImport = postcssContent.includes(
      "@import 'tailwindcss'",
    )
  } catch (e) {
    tailwind.postcss.error = e.message
  }

  // Escanear arquivos CSS
  try {
    const stylesDir = join(process.cwd(), 'src', 'styles')
    const cssFiles = readdirSync(stylesDir).filter((file) =>
      file.endsWith('.css'),
    )

    cssFiles.forEach((file) => {
      const filePath = join(stylesDir, file)
      const content = readFileSync(filePath, 'utf8')

      tailwind.cssFiles[file] = {
        size: content.length,
        lines: content.split('\n').length,
        issues: [],
      }

      // Verificar caracteres não-ASCII invisíveis
      const nonAsciiChars = content.match(
        /[\uFEFF\u00A0\u200B\u200C\u200D\u2060]/g,
      )
      if (nonAsciiChars) {
        tailwind.issues.nonAscii.push({
          file,
          chars: nonAsciiChars.map((char) => char.charCodeAt(0).toString(16)),
        })
        tailwind.cssFiles[file].issues.push('non-ascii-chars')
      }

      // Verificar balanceamento de chaves
      const openBraces = (content.match(/\{/g) || []).length
      const closeBraces = (content.match(/\}/g) || []).length
      if (openBraces !== closeBraces) {
        tailwind.issues.unbalancedBraces.push({
          file,
          open: openBraces,
          close: closeBraces,
          diff: openBraces - closeBraces,
        })
        tailwind.cssFiles[file].issues.push('unbalanced-braces')
      }

      // Verificar ordem de @layer
      const layerMatches = content.match(/@layer\s+([^;{]+)/g)
      if (layerMatches) {
        const layers = layerMatches.map((match) =>
          match.replace('@layer', '').trim(),
        )
        const expectedOrder = ['base', 'components', 'utilities']
        const actualOrder = layers.filter((layer) =>
          expectedOrder.includes(layer),
        )

        if (actualOrder.length > 1) {
          for (let i = 1; i < actualOrder.length; i++) {
            const current = expectedOrder.indexOf(actualOrder[i])
            const previous = expectedOrder.indexOf(actualOrder[i - 1])
            if (current < previous) {
              tailwind.issues.layerOrder.push({
                file,
                expected: expectedOrder,
                actual: actualOrder,
              })
              tailwind.cssFiles[file].issues.push('layer-order')
              break
            }
          }
        }
      }

      // Verificar tokens de tema
      const hasColorTokens =
        content.includes('--color-') || content.includes('--smn-')
      if (!hasColorTokens) {
        tailwind.issues.missingTokens.push(file)
        tailwind.cssFiles[file].issues.push('missing-tokens')
      }

      // Verificar guards de link/botão
      const hasLinkGuard =
        content.includes('[data-button]') ||
        content.includes('text-decoration: none') ||
        content.includes('text-decoration:none')
      if (!hasLinkGuard) {
        tailwind.issues.missingGuards.push(file)
        tailwind.cssFiles[file].issues.push('missing-guards')
      }
    })
  } catch (e) {
    tailwind.cssFiles.error = e.message
  }

  // Salvar relatório
  const reportPath = join(process.cwd(), 'reports', 'diag', 'tw-sanity.json')
  writeFileSync(reportPath, JSON.stringify(tailwind, null, 2))
  console.log('✅ Tailwind v4 sanity check completed')
} catch (error) {
  const errorReport = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack,
    },
  }
  const reportPath = join(process.cwd(), 'reports', 'diag', 'tw-sanity.json')
  writeFileSync(reportPath, JSON.stringify(errorReport, null, 2))
  console.error('❌ Tailwind v4 sanity check failed:', error.message)
}
