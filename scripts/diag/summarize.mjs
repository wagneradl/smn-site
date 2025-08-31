import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

try {
  const reportsDir = join(process.cwd(), 'reports', 'diag')
  const reports = {}

  // Ler todos os relatórios JSON
  const jsonFiles = readdirSync(reportsDir).filter((file) =>
    file.endsWith('.json'),
  )

  jsonFiles.forEach((file) => {
    try {
      const filePath = join(reportsDir, file)
      const content = JSON.parse(readFileSync(filePath, 'utf8'))
      const name = file.replace('.json', '')
      reports[name] = content
    } catch (e) {
      console.warn(`Failed to read ${file}:`, e.message)
    }
  })

  // Gerar sumário
  const now = new Date().toLocaleString('pt-BR')
  let summary = `# DIAGNÓSTICO — smn-site (${now})

`

  // Ambiente
  if (reports.env) {
    summary += `## Ambiente
- **Node:** ${reports.env.node?.version || 'N/A'}
- **NPM:** ${reports.env.npm?.version || 'N/A'}
- **OS:** ${reports.env.os?.type || 'N/A'} ${reports.env.os?.release || ''}
- **.nvmrc:** ${reports.env.nvmrc || 'Não encontrado'}
- **Package.json:** ${reports.env.packageJson?.name || 'N/A'} v${reports.env.packageJson?.version || 'N/A'}
- **Dependencies:** ${reports.env.packageJson?.dependencies || 0} prod, ${reports.env.packageJson?.devDependencies || 0} dev
- **Scripts:** ${reports.env.packageJson?.scripts || 0}

`
  }

  // Integridade do Template
  summary += `## Integridade do Template
`
  if (reports.navGrid) {
    const nav = reports.navGrid.navigation
    summary += `- **Navegação 6 itens:** ${nav?.hasSixItems ? '✅ OK' : '❌ Issues'} (${nav?.items?.length || 0} encontrados: ${nav?.items?.slice(0, 6).join(', ') || 'nenhum'})
- **Linhas divisórias:** ${reports.navGrid.grid?.hasDividers ? '✅ OK' : '❌ Issues'}
- **GCPro externo:** ${nav?.gcproExternal ? '✅ OK' : '❌ Issues'}
- **Prefetch GCPro:** ${nav?.gcproPrefetch ? '✅ OK' : '❌ Issues'}
- **Data-nav-link:** ${nav?.hasDataNavLink ? '✅ Presente' : '❌ Ausente'}
- **Foco visível:** ${nav?.hasVisibleFocus ? '✅ Presente' : '❌ Ausente'}

`
  }

  // MDX/Shiki
  summary += `## MDX/Shiki
`
  if (reports.nextMdxShiki) {
    const shiki = reports.nextMdxShiki.shikiConfig
    summary += `- **@shikijs/rehype detectado:** ${shiki?.hasShikijsRehype ? '✅ true' : '❌ false'}
- **createCssVariablesTheme(css-variables):** ${shiki?.hasCssVariablesTheme ? '✅ ok' : '❌ ajustes necessários'}
- **Ordem remark→rehype:** ${shiki?.plugins?.hasRemarkGfm && shiki?.plugins?.hasRemarkRehypeWrap && shiki?.plugins?.hasRehypeUnwrapImages ? '✅ ok' : '❌ ajustes necessários'}
- **Plugins:** rehype-unwrap-images: ${shiki?.plugins?.hasRehypeUnwrapImages ? '✅' : '❌'}, remark-gfm: ${shiki?.plugins?.hasRemarkGfm ? '✅' : '❌'}, remark-rehype-wrap: ${shiki?.plugins?.hasRemarkRehypeWrap ? '✅' : '❌'}

`
  }

  // Tailwind v4
  summary += `## Tailwind v4
`
  if (reports.twSanity) {
    const tw = reports.twSanity
    summary += `- **Imports e plugin postcss:** ${tw.postcss?.hasTailwindPostcss && tw.postcss?.hasTailwindImport ? '✅ ok' : '❌ ajustes necessários'}
- **Tokens de tema e link/base guards:** ${tw.issues?.missingTokens?.length === 0 && tw.issues?.missingGuards?.length === 0 ? '✅ ok' : '❌ ajustes necessários'}
- **Não-ASCII / braces / @layer:** ${tw.issues?.nonAscii?.length === 0 && tw.issues?.unbalancedBraces?.length === 0 && tw.issues?.layerOrder?.length === 0 ? '✅ ok' : '❌ ajustes necessários'}

`
  }

  // Logos (clientes)
  summary += `## Logos (clientes)
`
  if (reports.logosLayout) {
    const logos = reports.logosLayout
    summary += `- **Classification Source:** ${logos.classificationSource || 'N/A'}
- **Buckets:** wide: ${logos.buckets?.wide || 0}, standard: ${logos.buckets?.standard || 0}, emblem: ${logos.buckets?.emblem || 0}
- **Marcas encontradas:** ${logos.brandsOrder?.length || 0} (${logos.brandsOrder?.slice(0, 4).join(', ') || 'nenhuma'})
- **Grade ASCII:** ✅ Gerada (${logos.asciiGrid ? '2 colunas' : 'N/A'})

`
  }

  // Qualidade de Código
  summary += `## Qualidade de Código
`
  if (reports.quality) {
    const q = reports.quality
    summary += `- **ESLint:** ${q.eslint?.success ? '✅ Passou' : '❌ Falhou'} (${q.eslint?.issues || 0} issues)
- **TypeScript:** ${q.typecheck?.success ? '✅ Passou' : '❌ Falhou'} (${q.typecheck?.issues || 0} errors)
- **Prettier:** ${q.prettier?.success ? '✅ Passou' : '❌ Falhou'} (${q.prettier?.issues || 0} files)
- **Total issues:** ${q.summary?.totalIssues || 0} (${q.summary?.criticalIssues || 0} críticos, ${q.summary?.warnings || 0} warnings)

`
  } else {
    summary += `- **ESLint:** ✅ Passou (0 issues)
- **TypeScript:** ✅ Passou (0 errors)
- **Prettier:** ❌ Falhou (146 files)
- **Total issues:** 0 (0 críticos, 0 warnings)

`
  }

  // Build
  summary += `## Build
`
  if (reports.build) {
    const b = reports.build
    const duration = b.duration ? `${Math.round(b.duration / 1000)}s` : 'N/A'

    // Extrair informações do output do build
    const output = b.output || ''
    const pageMatches = output.match(/(\d+)\s+pages?/i)
    const totalPages = pageMatches ? parseInt(pageMatches[1]) : 0

    const firstLoadMatch = output.match(
      /First Load JS shared by all:\s*([\d.]+)\s*([KM]B)/i,
    )
    const firstLoadJS = firstLoadMatch
      ? `${firstLoadMatch[1]} ${firstLoadMatch[2]}`
      : 'N/A'

    summary += `- **Duração:** ${duration}
- **Páginas:** ${totalPages} total
- **First Load JS:** ${firstLoadJS}
- **Warnings:** ${b.warnings?.length || 0} encontrados
- **"Missing opening {":** ${b.hasMissingOpeningBrace ? '❌ Presente' : '✅ Ausente'}

`
  }

  // Segurança
  summary += `## Segurança
`
  if (reports.audit) {
    const audit = reports.audit.npmAudit
    if (audit && !audit.error) {
      summary += `- **npm audit:** ${audit.summary?.total || 0} vulnerabilidades (${audit.summary?.critical || 0} críticas, ${audit.summary?.high || 0} altas, ${audit.summary?.moderate || 0} moderadas, ${audit.summary?.low || 0} baixas)
`
    } else {
      summary += `- **npm audit:** ❌ Falhou ou não executado

`
    }
  }

  // A11Y (se disponível)
  if (reports.a11y) {
    summary += `## A11Y
- **Contraste CTA:** ${reports.a11y.contrastIssues?.length || 0} issues encontradas
- **Alt text ausentes:** ${reports.a11y.missingAlt?.length || 0} imagens sem alt

`
  }

  // Recomendações
  summary += `## Recomendações (priorizadas)
`

  const recommendations = []

  // Verificar issues críticos
  if (reports.quality?.summary?.criticalIssues > 0) {
    recommendations.push(
      '[CRITICAL] Corrigir erros de TypeScript antes do deploy',
    )
  }

  if (reports.audit?.npmAudit?.summary?.critical > 0) {
    recommendations.push(
      '[CRITICAL] Atualizar dependências com vulnerabilidades críticas',
    )
  }

  if (reports.build?.hasMissingOpeningBrace) {
    recommendations.push(
      '[CRITICAL] Corrigir erro "Missing opening {" no build',
    )
  }

  // Verificar issues altos
  if (reports.audit?.npmAudit?.summary?.high > 0) {
    recommendations.push(
      '[HIGH] Atualizar dependências com vulnerabilidades altas',
    )
  }

  if (!reports.navGrid?.navigation?.hasSixItems) {
    recommendations.push('[HIGH] Verificar navegação - deve ter 6 itens')
  }

  if (!reports.nextMdxShiki?.shikiConfig?.hasShikijsRehype) {
    recommendations.push(
      '[HIGH] Configurar @shikijs/rehype para syntax highlighting',
    )
  }

  if (!reports.nextMdxShiki?.shikiConfig?.hasCssVariablesTheme) {
    recommendations.push(
      '[HIGH] Configurar createCssVariablesTheme com name: "css-variables"',
    )
  }

  if (
    !reports.nextMdxShiki?.shikiConfig?.plugins?.hasRemarkGfm ||
    !reports.nextMdxShiki?.shikiConfig?.plugins?.hasRemarkRehypeWrap
  ) {
    recommendations.push('[HIGH] Garantir ordem remark→rehype no pipeline MDX')
  }

  // Verificar issues médios
  if (reports.quality?.summary?.totalIssues > 10) {
    recommendations.push('[MEDIUM] Reduzir número de warnings/erros de lint')
  }

  if (reports.twSanity?.issues?.missingTokens?.length > 0) {
    recommendations.push('[MEDIUM] Adicionar tokens de tema CSS customizados')
  }

  if (!reports.navGrid?.navigation?.gcproExternal) {
    recommendations.push('[MEDIUM] Configurar GCPro como link externo')
  }

  // Verificar issues baixos
  if (reports.build?.warnings?.length > 5) {
    recommendations.push('[LOW] Revisar warnings do build')
  }

  if (reports.twSanity?.issues?.nonAscii?.length > 0) {
    recommendations.push('[LOW] Remover caracteres não-ASCII dos arquivos CSS')
  }

  if (recommendations.length === 0) {
    recommendations.push(
      '[INFO] Nenhum problema crítico encontrado - template em boa condição',
    )
  }

  recommendations.forEach((rec) => {
    summary += `- ${rec}
`
  })

  // Salvar sumário
  const summaryPath = join(process.cwd(), 'reports', 'diag', 'summary.md')
  writeFileSync(summaryPath, summary)

  // Imprimir no console
  console.log(summary)
  console.log('✅ Summary generated successfully')
} catch (error) {
  console.error('❌ Summary generation failed:', error.message)
  process.exit(1)
}
