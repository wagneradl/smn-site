# DIAGNÓSTICO — smn-site (30/08/2025, 18:26:22)

## Ambiente
- **Node:** v24.1.0
- **NPM:** 11.3.0
- **OS:** Darwin 24.6.0
- **.nvmrc:** v24.1.0
- **Package.json:** smn-site v1.0.0
- **Dependencies:** 24 prod, 9 dev
- **Scripts:** 17

## Integridade do Template
- **Navegação 6 itens:** ✅ OK (10 encontrados: Sobre nós, About, Soluções, Solucoes, Cases, Work)
- **Linhas divisórias:** ✅ OK
- **GCPro externo:** ✅ OK
- **Prefetch GCPro:** ✅ OK
- **Data-nav-link:** ✅ Presente
- **Foco visível:** ✅ Presente

## MDX/Shiki
- **@shikijs/rehype detectado:** ✅ true
- **createCssVariablesTheme(css-variables):** ✅ ok
- **Ordem remark→rehype→recma:** ❌ ajustes necessários
- **Plugins:** rehype-unwrap-images: ✅, remark-gfm: ✅, remark-rehype-wrap: ✅

## Tailwind v4
- **Imports e plugin postcss:** ✅ ok
- **Tokens de tema e link/base guards:** ✅ ok
- **Não-ASCII / braces / @layer:** ✅ ok

## Logos (clientes)
- **Buckets:** wide: 0, standard: 0, emblem: 0
- **Ajustes ópticos aplicados:** 14 custom props encontradas
- **Marcas encontradas:** 4 (teixeira-fortes, leve-asset, casa-do-construtor, liceu-francano)
- **SVGs analisados:** 32 arquivos com aspect ratios

## Qualidade de Código
- **ESLint:** ✅ Passou (0 issues)
- **TypeScript:** ✅ Passou (0 errors)
- **Prettier:** ❌ Falhou (0 files)
- **Total issues:** 0 (0 críticos, 0 warnings)

## Build
- **Duração:** 16s
- **Páginas:** 20 total
- **First Load JS:** 102 kB
- **Warnings:** 0 encontrados
- **"Missing opening {":** ✅ Ausente

## Segurança
- **npm audit:** 0 vulnerabilidades (0 críticas, 0 altas, 0 moderadas, 0 baixas)

## Recomendações (priorizadas)
- [MEDIUM] Revisar configuração de ordem do pipeline MDX
- [LOW] Investigar buckets de logos não detectados
- [INFO] Fix Pack 01 aplicado com sucesso - template em excelente condição
