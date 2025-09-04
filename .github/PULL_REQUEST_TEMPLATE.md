# PR Template — SMN Site (Next15 / React19 / Tailwind v4)

> **Fonte de verdade:** MCP Memory-Graph `namespace: smn_site`  
> **Regra de ouro:** **NÃO FAZER MERGE** se `npm run mem:assert` não estiver verde.

## 🎯 Resumo
- **Título curto:** 
- **Contexto / objetivo do PR:** 
- **Issue / PBI (opcional):** Closes #

## 🧩 Tipo de mudança
- [ ] Conteúdo (texto/copy/MDX)
- [ ] Estrutura de páginas (rotas/layouts)
- [ ] Componentes (UI/estilo)
- [ ] Imagens/Assets
- [ ] Build/Config/Infra
- [ ] Scripts/Diagnósticos
- [ ] Outro: 

## 🔗 Escopo e rotas afetadas
- Rotas tocadas: `/`, `/work`, `/blog`, etc.
- Componentes tocados: 
- Variáveis de ambiente novas/alteradas: 

## ✅ Checklist de Guardrails (obrigatório)
- [ ] **MDX/Shiki**: pipeline **remark → rehype** preservado; tema `css-variables`; plugins inalterados.
- [ ] **Navegação**: 6 itens; **GCPro** externo (`target="_blank"`, `rel="noopener noreferrer"`, `prefetch={false}`); `aria-current="page"` no ativo; foco visível.
- [ ] **Imagens (`next/image`)**: **todo IMG tem `sizes`**. Padrões:
      - 1 col: `100vw`
      - 2 col: `(min-width:1024px) 50vw, 100vw`
      - 3 col: `(min-width:1024px) 33vw, 100vw`
      - Hero: `priority` + `placeholder="blur"` (usa `BLUR_DATA_URL`)
- [ ] **SEO**: `title`/`description` por rota; OG/Twitter configurados; JSON-LD na home intacto; `robots.txt`/`sitemap.xml` ok.
- [ ] **RSC**: boundaries preservados (sem mover server↔client sem justificativa).
- [ ] **Segurança**: headers de segurança inalterados (HSTS, X-CTO, Referrer-Policy, X-Frame-Options, Permissions-Policy).

## 🧪 Pipeline local (cole os resultados ou paths dos relatórios)
Execute SEMPRE antes de enviar o PR:
```bash
npm run diag:all && npm run qa:seo && npm run mem:graph && npm run mem:assert
```
- [ ] `diag:all` **verde** — artefatos em `reports/diag/`
- [ ] `qa:seo` **verde** — artefatos em `reports/seo/`
- [ ] `mem:graph` **ok** — `reports/memory/graph.json` atualizado
- [ ] `mem:assert` **VERDE** — *merge bloqueado se falhar*
- [ ] (opcional) `npm run perf:budget` — **verde** — `reports/perf/budgets.json`

## 📎 Artefatos anexados a este PR
- [ ] `reports/seo/meta-scan.json`
- [ ] `reports/seo/ld-json.json` (se aplicável)
- [ ] `reports/diag/next-image-audit.json`
- [ ] `reports/diag/logos-layout.json` (se aplicável)
- [ ] `reports/perf/lcp.json` (se mexeu em hero/imagens críticas)
- [ ] Outros: 

## 🖼️ Evidências (opcional, mas recomendado)
- [ ] Capturas de tela antes/depois
- [ ] Diff de texto relevante (copys)
- [ ] Link do bundle analyzer (se executado)

## ⚠️ Riscos & Rollback
- Risco principal (ex.: mudança de rota, imagem pesada, quebra de `sizes`):
- Plano de rollback (reverter commit / feature flag / restaurar assets):

## 📋 Notas para revisão
- Passos para validar localmente:
- Pontos que merecem atenção do revisor:
- Impactos em conteúdo/SEO/acessibilidade:

## 🧰 Pós-merge (se aplicável)
- [ ] Atualizar conteúdo no próximo ciclo
- [ ] Rodar `qa:all` no ambiente de staging
- [ ] Conferir sitemap reindexado
