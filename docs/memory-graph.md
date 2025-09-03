# SMN Memory Graph

## Visão Geral

O Memory Graph é um sistema de proteção contra regressões que consolida o conhecimento do projeto SMN em um grafo versionado com invariantes validáveis. Ele protege customizações críticas como:

- Design system (Tailwind v4 + tokens SMN)
- Navegação (6 itens + GCPro externo)
- Logos (buckets + microajustes óticos)
- SEO (metadata + OG/Twitter + robots/sitemap)
- Imagens (sizes + LCP + blur placeholders)
- MDX/Shiki (tema css-variables + plugins)
- Performance (budgets + LCP)
- Segurança (headers)
- RSC boundaries
- QA harness

## Como Usar

### Comandos Principais

```bash
# Atualizar o grafo de memória
npm run mem:update

# Validar invariantes
npm run mem:assert

# Atualizar e validar (recomendado)
npm run mem:all
```

### CI/CD Integration

```bash
# Pipeline completo
npm run build && npm run qa:seo && npm run mem:all && npm run perf:budget
```

## Quando Atualizar

Atualize o Memory Graph sempre que modificar:

- **Navegação**: estrutura, itens, GCPro
- **Logos**: buckets, data-brand, custom props
- **MDX/Shiki**: configuração, plugins, tema
- **Imagens**: sizes, priority, placeholders
- **SEO**: metadata, OG/Twitter, robots/sitemap
- **Design System**: Tailwind, tokens, CSS guards

## Estrutura do Grafo

### Nodes Obrigatórios

1. **design_system**: Tailwind v4 + tokens + guards
2. **mdx_shiki**: Shiki + plugins + ordem remark→rehype
3. **navigation**: Grade 2×3 (6 itens) + GCPro externo
4. **logos**: Buckets + microajustes (--dx, --dy, --s)
5. **images**: Sizes padronizados + LCP + blur
6. **seo**: Metadata + OG/Twitter + robots/sitemap + JSON-LD
7. **perf**: Budgets + bundle analyzer + LCP
8. **security**: Headers de segurança
9. **rsc**: Limites client/server
10. **qa**: Harness + scripts de validação

### Schema

```json
{
  "version": "string",
  "nodes": [
    {
      "id": "string",
      "type": "string",
      "summary": "string",
      "detail": "object",
      "evidence": ["string"],
      "selectors": ["string"],
      "invariants": ["string"],
      "validate": ["string"]
    }
  ]
}
```

## Interpretando Falhas

### Design System
- ❌ **Tailwind v4 não detectado**: Verificar `@tailwindcss/postcss` em package.json
- ❌ **focus-visible ausente**: Verificar `src/styles/base.css`

### MDX/Shiki
- ❌ **Tema não configurado**: Verificar `createCssVariablesTheme('css-variables')` em next.config.mjs
- ❌ **Ordem incorreta**: Verificar ordem remark→rehype
- ❌ **Plugin ausente**: Verificar plugins obrigatórios

### Navegação
- ❌ **6 itens não detectados**: Verificar `reports/diag/nav-grid.json`
- ❌ **GCPro não externo**: Verificar target="_blank" e rel="noopener noreferrer"
- ❌ **Prefetch ativo**: Verificar prefetch={false}

### Logos
- ❌ **Buckets não gerados**: Executar `npm run diag:logos`
- ❌ **data-brand ausente**: Verificar presença em page.tsx e work/page.tsx

### Imagens
- ❌ **Missing sizes**: Verificar `reports/diag/next-image-audit.json`
- ❌ **Hero sem priority**: Verificar `priority` em StylizedImage
- ❌ **Hero sem blur**: Verificar `placeholder="blur"`

### SEO
- ❌ **Meta scan incompleto**: Executar `npm run diag:seo`
- ❌ **JSON-LD ausente**: Verificar home page
- ❌ **HTTP endpoints falhando**: Verificar robots.txt e sitemap.xml

### Performance
- ❌ **First Load JS > 170kB**: Otimizar bundle
- ❌ **LCP report inválido**: Verificar `reports/perf/lcp.json`

## Adicionando Novos Invariantes

1. **Adicione o node** em `scripts/memory/build-graph.mjs`
2. **Implemente a validação** em `scripts/memory/assert-invariants.mjs`
3. **Atualize a documentação** aqui
4. **Teste** com `npm run mem:all`

## Arquivos de Evidência

O grafo se baseia nos seguintes relatórios:

- `reports/diag/nav-grid.json` - Navegação
- `reports/diag/logos-layout.json` - Logos
- `reports/diag/next-image-audit.json` - Imagens
- `reports/seo/meta-scan.json` - SEO metadata
- `reports/seo/ld-json.json` - JSON-LD
- `reports/diag/http-endpoints.json` - HTTP endpoints
- `reports/perf/lcp.json` - LCP
- `reports/diag/rsc-boundaries.json` - RSC boundaries
- `reports/diag/build.json` - Build info

## Troubleshooting

### Relatórios Ausentes
```bash
# Gerar relatórios básicos
npm run diag:all

# Gerar relatórios SEO
npm run qa:seo

# Gerar relatórios de performance
npm run perf:budget
```

### Validação Falhando
1. Verifique os logs de erro específicos
2. Execute o diagnóstico correspondente
3. Corrija a configuração
4. Re-execute `npm run mem:all`

### Grafo Corrompido
```bash
# Reconstruir do zero
rm -rf reports/memory/
npm run mem:update
```

## Contribuindo

1. **Mantenha invariantes específicos** e testáveis
2. **Documente evidências** claras
3. **Teste localmente** antes de commitar
4. **Atualize esta documentação** quando necessário

---

**Última atualização**: $(date)
**Versão do grafo**: $(cat reports/memory/graph.json | jq -r .version)
