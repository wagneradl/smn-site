#!/usr/bin/env node

import { readReport, readFile, parseNextConfig, parsePackageJson, ensureDirectory, writeFile } from './utils.ts';

async function buildGraph() {
  console.log('Building SMN Memory Graph...');
  
  try {
    // Read all existing reports
    const navGrid = readReport('reports/diag/nav-grid.json');
    const logosLayout = readReport('reports/diag/logos-layout.json');
    const nextImageAudit = readReport('reports/diag/next-image-audit.json');
    const metaScan = readReport('reports/seo/meta-scan.json');
    const ldJson = readReport('reports/seo/ld-json.json');
    const httpEndpoints = readReport('reports/diag/http-endpoints.json');
    const lcp = readReport('reports/perf/lcp.json');
    const rscBoundaries = readReport('reports/diag/rsc-boundaries.json');
    const buildReport = readReport('reports/diag/build.json');
    
    // Parse configuration files
    const nextConfig = parseNextConfig();
    const packageJson = parsePackageJson();
    
    // Build the memory graph
    const graph = {
      version: "1.0.0",
      nodes: [
        {
          id: "design_system",
          type: "design_system",
          summary: "Tailwind v4 + tokens SMN + guards de links",
          detail: {
            tailwindV4: true,
            linkGuards: true,
            focusVisible: true,
            tokens: ["--smn-brand-primary", "--smn-brand-accent", "--smn-brand-gradient", "--smn-nav-gradient", "--smn-hover-gradient"]
          },
          evidence: [
            "src/styles/base.css",
            "src/styles/tailwind.css",
            "src/styles/typography.css"
          ],
          selectors: ["a[data-nav-link]", "[data-button]", "[data-brand]", ".brand", ".brands-grid"],
          invariants: [
            "Tailwind v4 detectado e @tailwindcss/postcss ativo",
            "Links padrão sem underline; hover apenas cor accent; [data-button] blindado",
            "Focus-visible presente nos links de navegação"
          ],
          validate: ["tailwind_v4", "link_guards", "focus_visible"]
        },
        {
          id: "mdx_shiki",
          type: "mdx_shiki",
          summary: "Shiki com tema css-variables via @shikijs/rehype",
          detail: {
            rehypePkg: "@shikijs/rehype@3.11.0",
            theme: nextConfig.shikiTheme || "unknown",
            plugins: nextConfig.plugins || [],
            order: nextConfig.order || ["unknown"]
          },
          evidence: [
            "next.config.mjs",
            "package.json",
            "reports/diag/next-mdx-shiki.json"
          ],
          selectors: ["pre[data-shiki]", "code[data-shiki]"],
          invariants: [
            "createCssVariablesTheme({ name: 'css-variables' }) configurado",
            "Ordem MDX: remark → rehype",
            "rehype-unwrap-images, remark-gfm, remark-rehype-wrap ativos"
          ],
          validate: ["shiki_theme", "mdx_order", "mdx_plugins"]
        },
        {
          id: "navigation",
          type: "navigation",
          summary: "Grade 2×3 (6 itens): Sobre nós, Soluções, Cases, Carreiras, Blog (interno), GCPro (externo)",
          detail: {
            items: ["Sobre nós", "Soluções", "Cases", "Carreiras", "Blog", "GCPro"],
            gcpro: {
              external: navGrid.gcproExternal || false,
              target: "_blank",
              rel: "noopener noreferrer",
              prefetch: navGrid.gcproPrefetch || false,
              env: "NEXT_PUBLIC_GCPRO_URL"
            }
          },
          evidence: [
            "src/components/RootLayout.tsx",
            "reports/diag/nav-grid.json"
          ],
          selectors: ["[data-nav-link]"],
          invariants: [
            "Existem 6 itens no desktop (nav-grid.hasSixItems == true)",
            "GCPro abre em nova aba (target=_blank) com rel='noopener noreferrer' e prefetch={false}",
            "Linhas divisórias contínuas e hover verde cobrindo cada tile (divide-x/y nas rows; span consistente)"
          ],
          validate: ["nav_six_items", "gcpro_external", "gcpro_prefetch", "nav_focus_visible"]
        },
        {
          id: "logos",
          type: "logos",
          summary: "Buckets (wide≥3, standard, emblem≤1.5) + microajustes óticos (--dx,--dy,--s)",
          detail: {
            buckets: {
              wide: ["magalu", "momentum", "autovox", "leve-asset", "casa-do-construtor"],
              standard: ["teixeira-fortes", "liceu-francano"],
              emblem: ["cea"]
            },
            dials: {
              magalu: { s: 0.96, dx: -3 },
              cea: { s: 1.22, dy: -2 }
            }
          },
          evidence: [
            "reports/diag/logos-layout.json",
            "src/app/page.tsx",
            "src/app/work/page.tsx"
          ],
          selectors: [".brand[data-brand]", "[data-debug-logos]"],
          invariants: [
            "Há data-brand no wrapper .brand de cada item",
            "Manifest/layout com buckets e aspect ratios gerado",
            "Custom props detectadas (—dx/—dy/—s) quando aplicáveis"
          ],
          validate: ["data_brand_present", "buckets_generated", "custom_props_detected"]
        },
        {
          id: "images",
          type: "images",
          summary: "next/image sizes padronizados + LCP otimizado",
          detail: {
            sizes: {
              oneCol: "100vw",
              twoCol: "(min-width:1024px) 50vw, 100vw",
              threeCol: "(min-width:1024px) 33vw, 100vw"
            },
            hero: {
              priority: true,
              blur: true
            }
          },
          evidence: [
            "reports/diag/next-image-audit.json",
            "src/components/StylizedImage.tsx",
            "src/app/page.tsx"
          ],
          selectors: ["img[sizes]", "[data-image-hero]"],
          invariants: [
            "Relatório next-image-audit: missingSizes == 0",
            "Hero com priority e sizes corretos",
            "Blur placeholder disponível para hero"
          ],
          validate: ["missing_sizes_zero", "hero_priority", "blur_placeholder"]
        },
        {
          id: "seo",
          type: "seo",
          summary: "Metadata por rota + OG/Twitter + robots + sitemap + JSON-LD na home",
          detail: {
            pages: ["/", "/work", "/blog", "/contact", "/solucoes", "/about"],
            ogFallback: "/og/og-default.jpg",
            jsonLdHome: ["Organization", "WebSite"]
          },
          evidence: [
            "reports/seo/meta-scan.json",
            "reports/seo/ld-json.json",
            "reports/diag/http-endpoints.json"
          ],
          selectors: ["meta[property='og:image']", "meta[name='twitter:image']", "script[type='application/ld+json']"],
          invariants: [
            "meta-scan.json com title/description/og/tw nas rotas core",
            "ld-json.json com Organization + WebSite na /",
            "robots.txt e sitemap.xml retornam 200"
          ],
          validate: ["meta_scan_complete", "json_ld_home", "http_endpoints_200"]
        },
        {
          id: "perf",
          type: "perf",
          summary: "Perf budgets + bundle analyzer opt-in + LCP capturado",
          detail: {
            budgets: {
              firstLoadJS_kb: 170,
              routes: {
                "/": 180,
                "/work": 180,
                "/contact": 170
              }
            },
            lcp: {
              expectElement: ["H1", "IMG"]
            }
          },
          evidence: [
            "reports/perf/lcp.json",
            "reports/diag/build.json"
          ],
          selectors: ["[data-lcp-element]"],
          invariants: [
            "First Load JS ≤ 170 kB",
            "LCP report válido (elemento e tempo presentes)"
          ],
          validate: ["first_load_js_budget", "lcp_report_valid"]
        },
        {
          id: "security",
          type: "security",
          summary: "Headers low-risk (HSTS, X-CTO, Referrer-Policy, X-Frame-Options, Permissions-Policy)",
          detail: {
            headers: ["HSTS", "X-Content-Type-Options", "Referrer-Policy", "X-Frame-Options", "Permissions-Policy"]
          },
          evidence: [
            "next.config.mjs"
          ],
          selectors: [],
          invariants: [
            "Todos os headers configurados no next.config.mjs"
          ],
          validate: ["security_headers_configured"]
        },
        {
          id: "rsc",
          type: "rsc",
          summary: "Limites RSC client/server respeitados",
          detail: {
            clientComponents: [
              "FadeIn.tsx",
              "GrayscaleTransitionImage.tsx",
              "GridPattern.tsx",
              "Logo.tsx",
              "RootLayout.tsx",
              "SkipLink.tsx",
              "StylizedImage.tsx"
            ]
          },
          evidence: [
            "reports/diag/rsc-boundaries.json"
          ],
          selectors: ["[data-rsc-boundary]"],
          invariants: [
            "Relatório rsc-boundaries lista apenas componentes esperados com 'use client'"
          ],
          validate: ["rsc_boundaries_coherent"]
        },
        {
          id: "qa",
          type: "qa",
          summary: "Harness de servidor efêmero + qa:seo + qa:smoke",
          detail: {
            scripts: ["qa:seo", "qa:smoke", "diag:*", "perf:budget"],
            ephemeralServer: true
          },
          evidence: [
            "scripts/utils/with-server.mjs",
            "package.json"
          ],
          selectors: [],
          invariants: [
            "qa:seo executa sem falhas",
            "qa:smoke passa (nav 6 itens, GCPro externo, focus-visible, Shiki vars)"
          ],
          validate: ["qa_seo_success", "qa_smoke_success"]
        }
      ]
    };
    
    // Ensure memory directory exists
    ensureDirectory('reports/memory');
    
    // Write the graph
    writeFile('reports/memory/graph.json', JSON.stringify(graph, null, 2));
    
    // Generate markdown summary
    const markdown = generateMarkdownSummary(graph);
    writeFile('reports/memory/graph.md', markdown);
    
    console.log('✅ Memory Graph built successfully!');
    console.log('📁 reports/memory/graph.json');
    console.log('📝 reports/memory/graph.md');
    
  } catch (error) {
    console.error('❌ Failed to build memory graph:', error.message);
    process.exit(1);
  }
}

function generateMarkdownSummary(graph) {
  let md = `# SMN Memory Graph Summary\n\n`;
  md += `**Version:** ${graph.version}\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  
  md += `## Nodes Overview\n\n`;
  
  graph.nodes.forEach(node => {
    md += `### ${node.id.replace('_', ' ').toUpperCase()}\n`;
    md += `**Summary:** ${node.summary}\n\n`;
    md += `**Invariants:**\n`;
    node.invariants.forEach(invariant => {
      md += `- [ ] ${invariant}\n`;
    });
    md += `\n`;
  });
  
  return md;
}

buildGraph();
