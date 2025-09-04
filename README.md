# SMN Site - Site Institucional

Site institucional da **SMN Tecnologia** desenvolvido com integração inteligente do SMN Design System no template premium **Tailwind Studio Pro**.

## 🚀 Sobre o Projeto

Este repositório contém o site institucional da SMN Tecnologia, uma empresa de software sob medida e squads de alta performance desde 2008. O projeto utiliza tecnologias modernas e segue as melhores práticas de desenvolvimento web.

## 🛠️ Tecnologias

- **Next.js 15** - Framework React de produção com App Router
- **TypeScript 5.8** - Tipagem estática e desenvolvimento seguro
- **Tailwind CSS v4** - Framework CSS utilitário com tokens SMN
- **Framer Motion** - Animações fluidas e transições
- **MDX** - Markdown com componentes React para conteúdo dinâmico
- **Shiki** - Highlighting de código com temas personalizados

## 🎨 Design System SMN

Os tokens do SMN Design System estão integrados via `@theme` no arquivo `src/styles/tailwind.css`:

- **Cores primárias**: Azul SMN (#2e304f, #26314c, #1f2537)
- **Cor de destaque**: Verde SMN (#40df80, #38c271)
- **Tipografia**: SF Pro Display/Text com variáveis CSS customizadas
- **Espaçamentos**: Grid 8px base para consistência visual
- **39 variáveis CSS** integradas ao Tailwind v4

## 🏗️ Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 15)
│   ├── about/          # Página Sobre
│   ├── blog/           # Blog com MDX
│   ├── careers/        # Carreiras
│   ├── contact/        # Contato
│   ├── process/        # Processo
│   ├── solucoes/       # Soluções
│   └── work/           # Portfólio
├── components/          # Componentes React reutilizáveis
├── images/             # Assets de imagem otimizados
├── lib/                # Utilitários e configurações
├── styles/             # Estilos globais + tokens SMN
└── types/              # Definições TypeScript
```

## 🚦 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev              # Servidor de desenvolvimento (porta 3000)
npm run build            # Build de produção
npm run start            # Servidor de produção
npm run lint             # Verificação de código
npm run typecheck        # Verificação de tipos TypeScript
npm run format           # Formatação automática com Prettier
```

### Diagnósticos e Qualidade
```bash
npm run diag:all         # Diagnósticos completos (build + MDX + logos + nav)
npm run diag:extended    # Diagnósticos estendidos (env + audit + tw + quality + image + rsc)
npm run qa:seo           # Verificação de SEO, endpoints e LCP
npm run qa:smoke         # Testes de fumaça (navegação, acessibilidade)
```

### Performance e Monitoramento
```bash
npm run perf:budget      # Verificação de orçamentos de performance
npm run perf:all         # Testes de performance completos
npm run mem:all          # Grafo de memória e invariantes
npm run mem:graph        # Geração do grafo de memória
npm run mem:assert       # Validação de invariantes
```

### Correções Automáticas
```bash
npm run fix:all          # Correções automáticas (imagens, formatação)
npm run analyze          # Análise de bundle com Next.js
```

## 📱 Conteúdo e Funcionalidades

- **Hero section** com tagline SMN e call-to-action
- **Serviços**: Software sob medida, GCPro, Squads de desenvolvimento
- **Case studies**: Magazine Luiza, Momentum, Baterias Moura, Autovox
- **Formulários** de contato e carreiras em português
- **Blog** com artigos técnicos e insights da indústria
- **Portfólio** com projetos realizados
- **Navegação responsiva** e footer com informações SMN

## 🔒 Qualidade e Segurança

### Clean Pack Implementado
O repositório segue o plano **Clean Pack** para manutenção de qualidade:

- ✅ **CP-01**: Higiene de repositório (.gitignore, .gitattributes, GitHub Actions)
- ✅ **CP-02**: Dependências e scripts organizados e consolidados
- ✅ **CP-03**: Código morto removido e componentes em quarentena
- 🚧 **CP-04**: Assets e imagens (próximo)
- 🚧 **CP-05**: Conteúdo MDX e SEO (próximo)

### Proteções Automatizadas
- **GitHub Actions** bloqueiam arquivos > 1MB em PRs
- **Rede de segurança** com diagnósticos automáticos
- **Invariantes** validados em cada build
- **Orçamentos de performance** monitorados

## 🚀 Deploy

O site está pronto para deploy em:

- **Vercel** (recomendado para Next.js)
- **Netlify** (com suporte a SSR)
- **AWS Amplify** (para infraestrutura AWS)
- **Qualquer provedor** que suporte Next.js estático/SSR

## 📋 Pré-requisitos

- **Node.js** >= 24.1.0
- **npm** >= 9.0.0
- **Git** para controle de versão

## 🚀 Primeiros Passos

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd SMN-Site-Main

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp env.example .env.local
# Editar .env.local com suas configurações

# 4. Iniciar desenvolvimento
npm run dev

# 5. Abrir no navegador
open http://localhost:3000
```

## 🧪 Testes e Validação

### Rede de Segurança
Antes de qualquer commit, execute:
```bash
npm run diag:all && npm run qa:seo && npm run perf:budget && npm run mem:all
```

### Definição de Done
- ✅ Build compila sem erros
- ✅ Diagnósticos passam (MDX, logos, navegação)
- ✅ SEO e endpoints funcionam
- ✅ Orçamentos de performance respeitados
- ✅ Invariantes de memória validados

## 📚 Documentação Adicional

- **`.github/README-Contrib-SMN.md`** - Guia de contribuição
- **`docs/README-ADMIN-SMN.md`** - Documentação administrativa
- **`docs/CLIENTS_SYSTEM.md`** - Sistema de clientes e logos
- **`docs/memory-graph.md`** - Grafo de memória e invariantes

## 🤝 Contribuição

1. Leia o [guia de contribuição](.github/README-Contrib-SMN.md)
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das mudanças (`git commit -m 'feat: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

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

*Para mais informações: [contato@smn.com.br](mailto:contato@smn.com.br)*
