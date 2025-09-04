# SMN Site — Guardrails (fonte de verdade: namespace "smn_site")

- MDX/Shiki: ordem `remark → rehype`, tema `css-variables` (@shikijs/rehype).
- Navegação: 6 itens principais; GCPro externo (`target=_blank`, `rel="noopener noreferrer"`, `prefetch={false}`); foco visível; `data-nav-link` nos itens.
- Imagens: `next/image` SEMPRE com `sizes`; padrões:
  • 1 col: `100vw`
  • 2 col: `(min-width:1024px) 50vw, 100vw`
  • 3 col: `(min-width:1024px) 33vw, 100vw`
  Hero: `priority`, `placeholder="blur"` (BLUR_DATA_URL).
- SEO: `title/description` por rota; OpenGraph/Twitter; JSON-LD na home; `robots.txt` e `sitemap.xml` 200.
- Performance: First Load JS ≤ 170 kB (atual ~102 kB); budgets verdes.
- RSC: não cruzar boundaries (componentes client já mapeados).
- QA obrigatório pós-mudança:
  `3npm run diag:all && npm run qa:seo && npm run mem:graph && npm run mem:assert`
- Modo estrito: se `mem:assert` falhar → NÃO dar merge.

