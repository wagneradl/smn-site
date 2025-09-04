# Guia Rápido para Contribuidores — SMN Site

> **Pilares**: Next.js 15 • React 19 • Tailwind v4 • MDX + Shiki • Memory‑Graph (MCP)  
> **Regra de ouro**: *Não suba PR se `npm run mem:assert` não estiver verde.*

## 1) Setup local
```bash
git clone <repo> && cd <repo>
cp .env.example .env.local          # ajuste NEXT_PUBLIC_SITE_URL
npm i
npm run dev                         # porta 3000
```
Checagens rápidas:
```bash
npm run diag:all    # diagnósticos gerais
npm run qa:seo      # servidor efêmero + SEO/LCP/robots/sitemap
npm run mem:graph   # gera o grafo
npm run mem:assert  # valida invariantes (merge blocker)
```

## 2) Fluxos seguros do dia‑a‑dia

### A. Alterar conteúdo de uma página existente
1. Edite `src/app/<rota>/page.tsx` (ou `.mdx` quando aplicável).
2. **SEO**: ajuste `export const metadata` (title/description).  
3. **Imagens**: use `next/image` ou `StylizedImage` com `sizes` corretos:
   - 1 col: `100vw`
   - 2 col: `(min-width:1024px) 50vw, 100vw`
   - 3 col: `(min-width:1024px) 33vw, 100vw`
   - Hero: `priority` + `placeholder="blur"` (usa `BLUR_DATA_URL`)
4. Rode: `npm run qa:seo && npm run mem:graph && npm run mem:assert`.

### B. Criar uma nova página
1. Crie `src/app/<slug>/page.tsx` (ou `page.mdx`).  
2. Adicione `metadata` mínimo (title/description).  
3. Se aparecer no menu, atualize a navegação (6 itens fixos; **GCPro** externo).  
4. Valide com `diag:all` e `qa:seo` (verifique OG/Twitter e sitemap).

### C. Novo post de blog (MDX)
1. Pasta: `src/app/blog/<slug>/page.mdx`.  
2. Use componentes MDX do projeto (citações, imagens, etc.).  
3. Imagens no MDX passam pelo wrapper — mantenha `alt` e evite arquivos gigantes.  
4. `qa:seo` + `mem:assert` antes do PR.

### D. Trocar/Adicionar imagens
- Prefira `src/images/...` versionado.  
- Para heros, use `StylizedImage` com `priority` e `blur` quando necessário.  
- Confirme com `npm run diag:image` e `qa:seo`.

## 3) Guardrails (não quebre isso)
- **MDX/Shiki**: ordem **remark → rehype**; tema `css-variables` ativo.
- **Menu**: 6 itens; **GCPro** link externo com `target="_blank"` e `rel="noopener noreferrer"`; foco visível; `aria-current` no ativo.
- **Imagens**: `sizes` **obrigatório** em *todas* (`missingSizes=0`).
- **SEO**: title/description por rota; OG/Twitter; JSON‑LD **somente** na home.
- **RSC**: não mover Server↔Client sem motivo técnico.
- **Segurança**: headers padrão ativos no `next.config.mjs`.

## 4) Pipeline de validação (pré‑PR)
```bash
npm run diag:all  && npm run qa:seo  && npm run mem:graph  && npm run mem:assert  && npm run perf:budget   # opcional, mas recomendado
```
Se algum passo falhar, ajuste e rode novamente. O CI repete esse pipeline.

## 5) Abrindo PR
- Crie branch: `feat/...`, `fix/...` ou `chore/...`.
- Use o **template** do PR (checklist obrigatório).
- Anexe relatórios de `reports/` (SEO, perf, diag, memory).

## 6) Prompts úteis para o Cursor (Agente)
> Cole no chat do Cursor, dentro do repo.

**Atualizar conteúdo da Home com segurança**  
```
Considere o namespace de memória smn_site. 
Atualize a seção hero da Home: novo título X, descrição Y e troque a imagem hero por src/images/laptop-2025.jpg.
Respeite os guardrails: manter `priority` + `placeholder="blur"` e `sizes="(min-width:1024px) 50vw, 100vw"`.
No final, rode: npm run qa:seo && npm run mem:graph && npm run mem:assert e cole os resumos dos relatórios.
```

**Novo post de blog (MDX) com imagens otimizadas**  
```
Crie src/app/blog/<slug>/page.mdx com título T, autor A e seções S1..Sn. 
Use imagens de src/images/blog/<slug>/ com alt text e deixe o pipeline MDX/Shiki intacto.
Finalize executando qa:seo + mem:assert e mostre os paths dos artefatos.
```

**Checagem de navegação**  
```
Garanta que o menu tenha 6 itens e o link GCPro seja externo com target/_blank e rel noopener. 
Rode diag:nav e retorne o reports/diag/nav-grid.json.
```

## 7) Troubleshooting
- **`qa:seo` não conecta**: confirme `.env.local` (`NEXT_PUBLIC_SITE_URL`) e use o servidor efêmero incluso.  
- **`missingSizes > 0`**: ajuste `sizes` nos componentes citados em `reports/diag/next-image-audit.json`.  
- **Shiki quebrado**: verifique a ordem `remark → rehype` e o tema `css-variables` no `next.config.mjs`.  
- **Sitemap/robots 404**: confira `src/app/robots.ts` e `src/app/sitemap.ts`.

---

**Dúvidas rápidas?** Abra o PR com o checklist marcando o que já está ok e descreva o que precisa de revisão.
