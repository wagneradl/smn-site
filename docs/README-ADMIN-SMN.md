# SMN Site — Manual do Administrador (Next.js 15 / React 19 / Tailwind v4)

> Guia prático para **manter e evoluir** o site com segurança — com e sem IA (Cursor/Claude).  
> Este manual resume _o que fazer_ e _como não quebrar_ o template, usando os diagnósticos e o **Memory Graph**.

---

## 0) Objetivo & Escopo

- Garantir que qualquer colaborador consiga **atualizar conteúdo**, **criar páginas/posts**, **trocar imagens** e **abrir PR** com segurança.
- Evitar regressões em **SEO, performance, acessibilidade, MDX/Shiki, RSC boundaries** e **navegação**.
- Padronizar o uso de IA (Cursor/Claude) com prompts confiáveis.

---

## 1) Pré‑requisitos

- **Node** `>= 24.1.0` (há `.nvmrc`)
- **npm** (scripts prontos)
- **Variáveis de ambiente** (`.env` baseado em `.env.example`):
  - `NEXT_PUBLIC_SITE_URL=https://www.smn.example`
  - `NEXT_PUBLIC_GCPRO_URL=https://gcpro.smn.com.br`
  - (Opcional) `ENABLE_SOURCEMAPS=true` para gerar sourcemaps de produção

```bash
# Instalação
nvm use
npm ci
cp .env.example .env
```

---

## 2) Comandos Essenciais (DX)

### Desenvolvimento

```bash
npm run dev                # servidor local
```

### Qualidade & Diagnóstico

```bash
npm run format:check       # Prettier (ignora reports/**, .next/)
npm run lint               # ESLint (regras reforçadas)
npm run typecheck          # TypeScript

npm run diag:all           # build + mdx + logos + nav
npm run qa:smoke           # nav 6 itens, GCPro externo, focus-visible, Shiki vars
npm run qa:seo             # servidor efêmero + SEO scan + JSON-LD + robots/sitemap
npm run perf:budget        # budgets de JS e rotas (verde por padrão)
npm run analyze            # ANALYZE=true next build → .next/analyze/
```

### Memory Graph (proteções)

```bash
npm run mem:graph          # consolida relatórios → reports/memory/graph.json|md
npm run mem:assert         # valida 26 invariantes (falha o CI se quebrar)
npm run mem:all            # diag:all + qa:seo + mem:graph + mem:assert
```

> **Definition of Done** local: `npm run mem:all` deve **passar** sem erros **antes** de abrir PR.

---

## 3) Fluxo seguro de trabalho (manual)

1. **Crie uma branch** descritiva:
   ```bash
   git checkout -b feat/conteudo-home-hero
   ```
2. **Edite o conteúdo** (ver seções 4 e 5).
3. **Rode validações**:  
   `npm run format:check && npm run lint && npm run typecheck`  
   `npm run qa:seo && npm run perf:budget && npm run mem:all`
4. **Abra PR** com título claro e checklist (seção 8).

---

## 4) Editando Páginas (App Router)

- Páginas vivem em `src/app/<rota>/page.tsx` (ou `.mdx` em blog/work).
- **Imagens com `next/image`**:
  - **Regra de sizes**:
    - 1 coluna (mobile): `100vw`
    - **2 colunas (internas)**: `"(min-width:1024px) 50vw, 100vw"`
    - **3 colunas (listagens/blog/work)**: `"(min-width:1024px) 33vw, 100vw"`
  - **Hero**: adicione `priority` e, se quiser, `placeholder="blur"` (usa `BLUR_DATA_URL`).
  - **Sempre** defina `alt` descritivo.
- **Acessibilidade**: `SkipLink` já existe; mantenha `id="main"` e `aria-current="page"` na nav ativa.
- **Navegação**: preserve **6 itens** e o GCPro como **externo** (`target="_blank" rel="noopener noreferrer"`).

---

## 5) Conteúdo em MDX (Blog & Cases)

- Estrutura de post:

  ```md
  ---
  title: 'Título do post'
  description: 'Resumo curto para SEO'
  date: '2025-09-10'
  author:
    name: 'Nome'
    role: 'Cargo'
  cover: './capa.jpg'
  ---

  # Título H1

  Conteúdo em MDX…
  ```

- **Imagens no MDX**: use o componente de imagem do template ou `next/image` com `sizes` corretos.
- **Code blocks**: já renderizam com Shiki (`@shikijs/rehype`) e tema `css-variables`.
- **Checklist** após adicionar/editar:
  - `npm run diag:image` → **missingSizes: 0**
  - `npm run qa:seo` → meta/OG/Twitter/JSON‑LD ok
  - `npm run mem:all` → invariantes todos verdes

---

## 6) SEO & Share

- **Global** em `src/app/layout.tsx`: `metadataBase`, template de `title`, OG/Twitter.
- **Por página**: exporte `metadata` local com `title` + `description`.  
  Imagem fallback: `public/og/og-default.jpg`.
- **JSON-LD**: `src/lib/seo.tsx` tem `<JsonLd />`. Usado na **home** para `Organization` e `WebSite`.
- **Robots/Sitemap**: `src/app/robots.ts` e `src/app/sitemap.ts` (validados por `qa:seo`).

---

## 7) Uso com IA (Cursor/Claude) — prompts rápidos

> **Sempre cole isso primeiro** no chat do agente para dar contexto mínimo:

```
Contexto: Projeto Next.js 15 / React 19 / Tailwind v4 com Shiki e Memory Graph.
NUNCA altere a estrutura crítica sem atualizar os diagnósticos.
Após qualquer mudança rode: format:check, lint, typecheck, qa:seo, perf:budget, mem:all.
Se quebrar, proponha um diff mínimo e a correção.
```

### Exemplos

- **Trocar textos da Home (hero e seções)**  
  “Atualize o headline e subtítulo da Home em `src/app/page.tsx` preservando classes. Ajuste alt das imagens se necessário. Em seguida rode `qa:seo` e `mem:all` e mostre o resumo dos relatórios.”

- **Novo post de blog**  
  “Crie um post MDX em `src/app/blog/<slug>/page.mdx` com front‑matter, imagens otimizadas e `sizes` corretos (3 colunas). Depois rode `diag:image`, `qa:seo` e `mem:all`.”

- **Nova página institucional**  
  “Crie `src/app/parcerias/page.tsx` com copy base, metadata e imagens (`twoCol`). Inclua no sitemap e valide com `qa:seo` e `mem:all`.”

- **Auditar regressão**  
  “Execute `npm run mem:all` e liste invariantes que falharam com links para os relatórios.”

---

## 8) Checklist antes do PR

1. `npm run format:check` → ✅
2. `npm run lint && npm run typecheck` → ✅
3. `npm run qa:seo` → **status ok** (meta + JSON‑LD + robots/sitemap)
4. `npm run perf:budget` → ✅ (First Load JS ≤ 170kB)
5. `npm run mem:all` → **0 fails** em invariantes
6. Sem mudanças visuais indesejadas
7. **Commit** claro + descrição do que foi tocado
8. **PR** com:
   - Objetivo
   - Screenshots (se houver UI)
   - Saída de `mem:all` resumida
   - Itens a validar no review

---

## 9) Playbooks técnicos rápidos

### Imagens (`next/image`)

- **Sempre** preencher `alt`.
- Use **sizes** por contexto: 1col `100vw` · 2col `50vw` · 3col `33vw`.
- Para **hero**: `priority` + `placeholder="blur"` (via `BLUR_DATA_URL`).

### MDX/Shiki

- Pipeline **remark → rehype**; **não** altere a ordem.
- Tema `css-variables` já aplicado.

### A11y

- `SkipLink` ativo; mantenha `#main` no elemento principal.
- `aria-current="page"` no link ativo.

---

## 10) CI/CD (GitHub Actions)

Pipeline (resumo do workflow):

- `typecheck`, `lint`, `build`
- `qa:seo` (servidor efêmero)
- `mem:graph` + `mem:assert`
- `perf:budget`

Falhas em qualquer etapa bloqueiam o merge.

---

## 11) Solução de problemas

- **SEO scan não conecta**: confirme `.env` e rode `npm run dev` ou use o harness efêmero embutido pelo `qa:seo`.
- **Imagem sem `sizes`**: confira `reports/diag/next-image-audit.json` (procure pelo arquivo).
- **Navegação quebrou**: `reports/diag/nav-grid.json` (deve ter 6 itens + GCPro externo).
- **Shiki sem cores**: verifique `reports/diag/next-mdx-shiki.json` (tema `css-variables`).

---

## 12) Anexos & Referências

- Relatórios automatizados em `reports/**`
- Harness efêmero: `scripts/utils/with-server.mjs`
- Memory Graph: `scripts/memory/*`, `reports/memory/*`

---

**Mantra**: _faça a mudança mínima, valide tudo, e só então abra PR._  
Qualquer dúvida, rode `npm run mem:all` e verifique os relatórios.
