import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

try {
  const navGrid = {
    timestamp: new Date().toISOString(),
    navigation: {
      hasSixItems: false,
      items: [],
      gcproExternal: false,
      gcproPrefetch: false,
      hasDataNavLink: false,
      hasVisibleFocus: false,
    },
    grid: {
      hasDividers: false,
      hasManualBorders: false,
      usesContainers: false,
    },
  }

  // Procurar por arquivos de layout/navegação
  const possibleNavFiles = [
    'src/components/RootLayout.tsx',
    'src/app/layout.tsx',
    'src/components/Header.tsx',
    'src/components/Navigation.tsx',
  ]

  let navContent = ''
  let navFile = ''

  for (const file of possibleNavFiles) {
    try {
      const filePath = join(process.cwd(), file)
      navContent = readFileSync(filePath, 'utf8')
      navFile = file
      break
    } catch (e) {
      continue
    }
  }

  if (navContent) {
    navGrid.navigation.sourceFile = navFile

    // Verificar itens de navegação
    const navItems = [
      'Sobre nós',
      'Sobre nos',
      'About',
      'Soluções',
      'Solucoes',
      'Solutions',
      'Cases',
      'Work',
      'Portfolio',
      'Carreiras',
      'Careers',
      'Blog',
      'GCPro',
      'GC Pro',
    ]

    const foundItems = navItems.filter(
      (item) =>
        navContent.includes(item) ||
        navContent.toLowerCase().includes(item.toLowerCase()),
    )

    navGrid.navigation.items = foundItems
    navGrid.navigation.hasSixItems = foundItems.length >= 6

    // Verificar GCPro externo
    navGrid.navigation.gcproExternal =
      navContent.includes('target="_blank"') &&
      (navContent.includes('GCPro') || navContent.includes('GC Pro'))

    // Verificar prefetch={false}
    navGrid.navigation.gcproPrefetch =
      navContent.includes('prefetch={false}') &&
      (navContent.includes('GCPro') || navContent.includes('GC Pro'))

    // Verificar data-nav-link
    navGrid.navigation.hasDataNavLink = navContent.includes('data-nav-link')

    // Verificar foco visível
    navGrid.navigation.hasVisibleFocus =
      navContent.includes('focus-visible') ||
      navContent.includes('focus:visible') ||
      navContent.includes('outline') ||
      navContent.includes('data-nav-link')

    // Verificar grid e divisórias
    navGrid.grid.hasDividers =
      navContent.includes('border') ||
      navContent.includes('divider') ||
      navContent.includes('separator')

    navGrid.grid.hasManualBorders =
      navContent.includes('border-') &&
      !navContent.includes('border-transparent')

    navGrid.grid.usesContainers =
      navContent.includes('container') || navContent.includes('Container')
  } else {
    navGrid.error = 'No navigation file found'
  }

  // Salvar relatório
  const reportPath = join(process.cwd(), 'reports', 'diag', 'nav-grid.json')
  writeFileSync(reportPath, JSON.stringify(navGrid, null, 2))
  console.log('✅ Navigation grid scan completed')
} catch (error) {
  const errorReport = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack,
    },
  }
  const reportPath = join(process.cwd(), 'reports', 'diag', 'nav-grid.json')
  writeFileSync(reportPath, JSON.stringify(errorReport, null, 2))
  console.error('❌ Navigation grid scan failed:', error.message)
}
