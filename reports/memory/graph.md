# SMN Memory Graph Summary

**Version:** 1.0.0
**Generated:** 2025-09-03T16:03:35.586Z

## Nodes Overview

### DESIGN SYSTEM
**Summary:** Tailwind v4 + tokens SMN + guards de links

**Invariants:**
- [ ] Tailwind v4 detectado e @tailwindcss/postcss ativo
- [ ] Links padrão sem underline; hover apenas cor accent; [data-button] blindado
- [ ] Focus-visible presente nos links de navegação

### MDX SHIKI
**Summary:** Shiki com tema css-variables via @shikijs/rehype

**Invariants:**
- [ ] createCssVariablesTheme({ name: 'css-variables' }) configurado
- [ ] Ordem MDX: remark → rehype
- [ ] rehype-unwrap-images, remark-gfm, remark-rehype-wrap ativos

### NAVIGATION
**Summary:** Grade 2×3 (6 itens): Sobre nós, Soluções, Cases, Carreiras, Blog (interno), GCPro (externo)

**Invariants:**
- [ ] Existem 6 itens no desktop (nav-grid.hasSixItems == true)
- [ ] GCPro abre em nova aba (target=_blank) com rel='noopener noreferrer' e prefetch={false}
- [ ] Linhas divisórias contínuas e hover verde cobrindo cada tile (divide-x/y nas rows; span consistente)

### LOGOS
**Summary:** Buckets (wide≥3, standard, emblem≤1.5) + microajustes óticos (--dx,--dy,--s)

**Invariants:**
- [ ] Há data-brand no wrapper .brand de cada item
- [ ] Manifest/layout com buckets e aspect ratios gerado
- [ ] Custom props detectadas (—dx/—dy/—s) quando aplicáveis

### IMAGES
**Summary:** next/image sizes padronizados + LCP otimizado

**Invariants:**
- [ ] Relatório next-image-audit: missingSizes == 0
- [ ] Hero com priority e sizes corretos
- [ ] Blur placeholder disponível para hero

### SEO
**Summary:** Metadata por rota + OG/Twitter + robots + sitemap + JSON-LD na home

**Invariants:**
- [ ] meta-scan.json com title/description/og/tw nas rotas core
- [ ] ld-json.json com Organization + WebSite na /
- [ ] robots.txt e sitemap.xml retornam 200

### PERF
**Summary:** Perf budgets + bundle analyzer opt-in + LCP capturado

**Invariants:**
- [ ] First Load JS ≤ 170 kB
- [ ] LCP report válido (elemento e tempo presentes)

### SECURITY
**Summary:** Headers low-risk (HSTS, X-CTO, Referrer-Policy, X-Frame-Options, Permissions-Policy)

**Invariants:**
- [ ] Todos os headers configurados no next.config.mjs

### RSC
**Summary:** Limites RSC client/server respeitados

**Invariants:**
- [ ] Relatório rsc-boundaries lista apenas componentes esperados com 'use client'

### QA
**Summary:** Harness de servidor efêmero + qa:seo + qa:smoke

**Invariants:**
- [ ] qa:seo executa sem falhas
- [ ] qa:smoke passa (nav 6 itens, GCPro externo, focus-visible, Shiki vars)

