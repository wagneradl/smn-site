# SMN Site - Site Institucional Enterprise

Site institucional da **SMN Tecnologia** desenvolvido com stack enterprise moderna, governança automatizada e sistema de colaboração robusto.

## 🚀 Sobre o Projeto

Este repositório contém o site institucional da SMN Tecnologia, uma empresa de software sob medida e squads de alta performance desde 2003. O projeto utiliza tecnologias enterprise e segue as melhores práticas de desenvolvimento web com **governança automatizada** e **qualidade garantida**.

### 🎯 Características Enterprise

- **22 rotas estáticas** geradas no build (performance instantânea)
- **LCP 184ms** (excelente, < 200ms)
- **First Load JS 102kB** (40% de margem no budget de 170kB)
- **25 invariantes** validados automaticamente
- **5 security headers** implementados
- **SEO otimizado** com metadata por rota e JSON-LD estruturado

## 🛠️ Stack Tecnológica

### Core Framework
- **Next.js 15** - Framework React enterprise com App Router
- **React 19** - Server Components e RSC para performance
- **TypeScript 5.8** - Tipagem estática e desenvolvimento seguro

### Styling & Design
- **Tailwind CSS v4** - Framework CSS com tokens SMN integrados
- **Framer Motion** - Animações fluidas e transições
- **SMN Design System** - 39 variáveis CSS customizadas

### Content & Code
- **MDX** - Markdown com componentes React para conteúdo dinâmico
- **Shiki** - Syntax highlighting profissional com tema css-variables
- **Puppeteer** - Testes automatizados e validação de qualidade

## 🎨 Design System SMN

Os tokens do SMN Design System estão integrados via `@theme` no arquivo `src/styles/tailwind.css`:

```css
@theme {
  /* Cores Primárias SMN */
  --color-primary-600: #4f6e7c;
  --color-primary-700: #2e304f;
  --color-primary-800: #26314c;
  
  /* Cores de Destaque SMN */
  --color-accent-500: #40df80;
  --color-accent-600: #38c271;
  
  /* Tokens Inteligentes */
  --smn-brand-primary: var(--color-primary-600);
  --smn-brand-accent: var(--color-accent-500);
}
```

### Características do Design System
- **Cores primárias**: Azul SMN (#2e304f, #26314c, #1f2537)
- **Cor de destaque**: Verde SMN (#40df80, #38c271)
- **Tipografia**: Mona Sans com variáveis CSS customizadas
- **Espaçamentos**: Grid 8px base para consistência visual
- **39 variáveis CSS** integradas ao Tailwind v4

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── about/             # Página Sobre Nós
│   ├── blog/              # Blog com MDX + Shiki
│   │   ├── [slug]/        # Artigos dinâmicos
│   │   └── wrapper.tsx    # Layout do blog
│   ├── careers/           # Carreiras
│   ├── contact/           # Contato
│   ├── process/           # Processo
│   ├── solucoes/          # Soluções
│   ├── work/              # Portfólio
│   │   ├── [slug]/        # Cases dinâmicos
│   │   └── wrapper.tsx    # Layout dos cases
│   ├── robots.ts          # SEO robots
│   └── sitemap.ts         # SEO sitemap
├── components/            # Componentes React reutilizáveis
├── images/               # Assets otimizados
│   ├── team/             # Fotos da equipe
│   └── clients/          # Logos dos clientes
├── lib/                  # Utilitários e configurações
├── styles/               # Estilos globais + tokens SMN
└── types/                # Definições TypeScript

scripts/                  # Sistema de governança
├── memory/               # Memory-Graph e invariantes
├── perf/                 # Performance e budgets
├── qa/                   # Quality Assurance
└── diag/                 # Diagnósticos automatizados

reports/                  # Relatórios de qualidade
├── memory/               # Grafo de memória
├── perf/                 # Métricas de performance
├── seo/                  # Relatórios de SEO
└── diag/                 # Diagnósticos técnicos
```

## 🚦 Scripts de Governança

### Desenvolvimento
```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm run start            # Servidor de produção
npm run lint             # Verificação de código
npm run typecheck        # Verificação de tipos TypeScript
npm run format           # Formatação automática com Prettier
```

### Diagnósticos e Qualidade
```bash
npm run diag:all         # Diagnósticos completos
npm run diag:extended    # Diagnósticos estendidos
npm run qa:seo           # Verificação de SEO e endpoints
npm run qa:smoke         # Testes de fumaça
npm run qa:all           # QA completo
```

### Performance e Monitoramento
```bash
npm run perf:budget      # Verificação de orçamentos
npm run perf:lcp         # Detecção de LCP
npm run perf:all         # Performance completa
npm run mem:graph        # Geração do grafo de memória
npm run mem:assert       # Validação de invariantes
npm run mem:all          # Memory-Graph completo
```

### Correções Automáticas
```bash
npm run fix:all          # Correções automáticas
npm run analyze          # Análise de bundle
```

## 📝 Guia de Colaboração

### 🎯 Como Contribuir com Conteúdo

Qualquer desenvolvedor da SMN pode contribuir com artigos, cases e conteúdo seguindo nossas práticas consolidadas de desenvolvimento.

#### 📰 Artigos do Blog

**Localização**: `src/app/blog/[slug]/page.mdx`

**Template obrigatório**:
```mdx
import imageAuthor from '@/images/team/nome-do-autor.jpg'

export const article = {
  date: '2024-01-15',
  title: 'Título do Artigo',
  description: 'Descrição do artigo para SEO (máximo 160 caracteres)',
  author: {
    name: 'Nome do Autor',
    role: 'Cargo / Área',
    image: { src: imageAuthor },
  },
}

export const metadata = {
  title: article.title,
  description: article.description,
}

## Introdução

Conteúdo do artigo aqui...

### Seção com Código

```typescript
// Exemplo de código TypeScript
interface Example {
  name: string;
  value: number;
}

const example: Example = {
  name: "SMN",
  value: 100
};
```

## Conclusão

Finalização do artigo...
```

**Regras para artigos**:
- ✅ Use **MDX** (Markdown + JSX)
- ✅ Inclua **metadata** obrigatória
- ✅ Adicione **foto do autor** em `src/images/team/`
- ✅ Use **Shiki** para código (veja seção abaixo)
- ✅ Máximo **2000 palavras**
- ✅ Inclua **call-to-action** no final

#### 🏢 Cases de Sucesso

**Localização**: `src/app/work/[slug]/page.mdx`

**Template obrigatório**:
```mdx
import imageHero from './hero.jpg'
import imageClient from './cliente-foto.jpg'

export const caseStudy = {
  client: 'Nome do Cliente',
  title: 'Título do Case',
  description: 'Descrição do projeto e resultados',
  year: '2024',
  services: ['Desenvolvimento', 'Consultoria', 'DevOps'],
  testimonial: {
    content: 'Depoimento do cliente sobre o projeto',
    author: {
      name: 'Nome do Cliente',
      role: 'Cargo',
      image: { src: imageClient },
    },
  },
}

export const metadata = {
  title: `${caseStudy.title} | SMN`,
  description: caseStudy.description,
}

## O Desafio

Contexto e desafios do cliente...

## Nossa Solução

Como resolvemos o problema...

### Tecnologias Utilizadas

- **Frontend**: React, TypeScript
- **Backend**: Node.js, PostgreSQL
- **Infraestrutura**: AWS, Docker, Kubernetes

## Resultados

Métricas e resultados alcançados...

## Depoimento

<Testimonial {...caseStudy.testimonial} />
```

**Regras para cases**:
- ✅ Use **fotos reais** do projeto
- ✅ Inclua **depoimento** do cliente
- ✅ Liste **tecnologias** utilizadas
- ✅ Apresente **métricas** de resultado
- ✅ Máximo **1500 palavras**

#### 👥 Citações de Colaboradores

**Localização**: `src/app/careers/page.tsx`

**Template para adicionar citação**:
```tsx
{
  name: 'Nome do Colaborador',
  role: 'Cargo',
  quote: 'Citação sobre trabalhar na SMN',
  image: { src: imageColaborador },
}
```

**Regras para citações**:
- ✅ **Foto profissional** em `src/images/team/`
- ✅ **Citação autêntica** sobre a experiência na SMN
- ✅ **Cargo atual** e área de atuação
- ✅ **Máximo 100 palavras** por citação

### 🎨 Guia de Formatação

#### Syntax Highlighting com Shiki

O projeto usa **Shiki** para syntax highlighting profissional. Suporta:

**Linguagens disponíveis**:
- `typescript`, `tsx`, `javascript`, `jsx`
- `bash`, `shell`, `json`, `yaml`
- `dockerfile`, `sql`, `markdown`

**Exemplo de uso**:
````mdx
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  return response.json();
};
```
````

**Resultado**: Código com highlighting igual ao VS Code, cores alinhadas com o design system SMN.

#### Imagens e Mídia

**Regras para imagens**:
- ✅ **Formato**: JPG para fotos, SVG para logos
- ✅ **Otimização**: Use `next/image` sempre
- ✅ **Alt text**: Descritivo e acessível
- ✅ **Sizes**: Especifique `sizes` para responsividade

**Exemplo correto**:
```tsx
import Image from 'next/image'
import imageHero from '@/images/hero.jpg'

<Image
  src={imageHero}
  alt="Equipe SMN trabalhando em projeto de software"
  sizes="(min-width: 1024px) 50vw, 100vw"
  className="rounded-lg"
/>
```

**Localização de imagens**:
- `src/images/team/` - Fotos da equipe
- `src/images/clients/` - Logos dos clientes
- `src/images/` - Imagens gerais

#### Vídeos e Links Externos

**Vídeos**: Não há suporte nativo para vídeos. Use:
- **YouTube**: Embed via iframe (responsivo)
- **Vimeo**: Embed via iframe (responsivo)
- **Arquivos**: Host externo + link

**Links externos**:
```tsx
<a 
  href="https://exemplo.com" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-accent-500 hover:text-accent-600"
>
  Link externo
</a>
```

### 🔧 Processo de Contribuição

#### 1. Preparação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd SMN-Site-Main

# Instale dependências
npm install

# Crie uma branch
git checkout -b feature/novo-artigo
```

#### 2. Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Abra http://localhost:3000
# Crie seu conteúdo seguindo os templates
```

#### 3. Validação
```bash
# Execute a rede de segurança
npm run diag:all && npm run qa:seo && npm run perf:budget

# Verifique se todos os testes passam
npm run mem:assert
```

#### 4. Commit e PR
```bash
# Commit com mensagem descritiva
git add .
git commit -m "feat: adiciona artigo sobre [tema]"

# Push e crie Pull Request
git push origin feature/novo-artigo
```

### 🛡️ Guardrails e Qualidade

#### Invariantes Automáticos
O sistema valida automaticamente:
- ✅ **Navegação**: Exatamente 6 itens
- ✅ **SEO**: Metadata em todas as páginas
- ✅ **Performance**: JS < 170kB
- ✅ **Imagens**: Todas com `sizes` attribute
- ✅ **MDX**: Ordem remark → rehype
- ✅ **Shiki**: Tema css-variables

#### Definição de Done
Antes de qualquer merge:
- ✅ Build compila sem erros
- ✅ Todos os diagnósticos passam
- ✅ SEO e endpoints funcionam
- ✅ Orçamentos de performance respeitados
- ✅ Invariantes de memória validados
- ✅ Testes de fumaça passam

## 🚀 Deploy e Produção

### Ambientes Suportados
- **Vercel** (recomendado para Next.js)
- **Netlify** (com suporte a SSR)
- **AWS Amplify** (para infraestrutura AWS)
- **Qualquer provedor** que suporte Next.js

### Variáveis de Ambiente
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://smn.com.br
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Performance em Produção
- **LCP**: 184ms (excelente)
- **First Load JS**: 102kB (40% de margem)
- **Rotas Estáticas**: 22 páginas
- **Security Headers**: 5 implementados
- **SEO Score**: 100%

## 📋 Pré-requisitos

- **Node.js** >= 24.1.0
- **npm** >= 9.0.0
- **Git** para controle de versão

## 🚀 Primeiros Passos

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd SMN-Site-Main

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas configurações

# 4. Inicie desenvolvimento
npm run dev

# 5. Abra no navegador
open http://localhost:3000
```

## 🧪 Testes e Validação

### Rede de Segurança Completa
```bash
# Execute antes de qualquer commit
npm run diag:all && npm run qa:seo && npm run perf:budget && npm run mem:all
```

### Relatórios de Qualidade
- **Performance**: `reports/perf/lcp.json`
- **SEO**: `reports/seo/meta-scan.json`
- **Memory-Graph**: `reports/memory/graph.json`
- **Diagnósticos**: `reports/diag/`

## 📚 Documentação Técnica

- **Memory-Graph**: Sistema de invariantes e governança
- **Performance Budgets**: Monitoramento automático de JS/CSS
- **SEO Automation**: Validação de metadata e endpoints
- **Quality Assurance**: Testes automatizados e smoke tests

## 🤝 Contribuição

1. Leia este README completamente
2. Siga os templates de conteúdo
3. Execute a rede de segurança
4. Crie Pull Request com descrição detalhada
5. Aguarde review e merge

## 📄 Licença

Este template de site é um produto comercial licenciado sob a [Tailwind Plus license](https://tailwindcss.com/plus/license).

## 🏢 Sobre a SMN Tecnologia

**SMN Tecnologia** é uma empresa de desenvolvimento de software especializada em:

- **Software sob medida** para empresas de todos os portes
- **Squads de alta performance** para projetos complexos
- **Integração de sistemas** legados e modernos
- **Consultoria técnica** e arquitetura de software

Desde 2003, entregamos soluções robustas e escaláveis para clientes em diversos setores da economia.

---

**Desenvolvido com ❤️ pela equipe SMN Tecnologia**

_Para mais informações: [contato@smn.com.br](mailto:contato@smn.com.br)_