# Mapeamento de Campos de Texto – SMN Site

Este documento lista todos os campos de texto do template do site SMN, indicando o texto atual (ou placeholder), o tipo/conteúdo esperado, sugestões de limite de caracteres e observações para garantir a elegância do design. Preencha os campos marcados como "FALTA TEXTO" ou "EM INGLÊS" conforme for produzindo os textos finais.

---

## 1. Página Inicial (`src/app/page.tsx`)

### Hero Section
- **Título Principal:**
  - Texto atual: `Software sob medida e squads de alta performance.`
  - Limite sugerido: 70 caracteres
- **Parágrafo de apoio:**
  - Texto atual: `Desde 2008, desenvolvemos sistemas personalizados e fornecemos squads com turnover baixíssimo. Criadores do ERP GCPro, usado por centenas de empresas.`
  - Limite sugerido: 220 caracteres

### Seção "Empresas que confiam na SMN"
- **Título:** `Empresas que confiam na SMN` (60 caracteres)
- **Lista de clientes:**
  - Exemplo: `Phobia`, `Family Fund`, etc. (25 caracteres por nome)

### Seção "Casos que comprovam nossa entrega"
- **Título:** `Casos que comprovam nossa entrega` (60 caracteres)
- **Parágrafo:** `Alguns exemplos de como a SMN gera valor real a grandes marcas.` (140 caracteres)
- **Cards de Case Study:**
  - Ano: `2024` (4 caracteres)
  - Tipo: `Case study` (20 caracteres)
  - Título do case: (70 caracteres)
  - Descrição: (180 caracteres)

### Depoimento de Cliente
- **Nome:** `Magazine Luiza` (30 caracteres)
- **Depoimento:** `A SMN desenvolveu nosso sistema de gestão de campanhas que processa milhões de transações diariamente. Entrega no prazo, qualidade excepcional e suporte contínuo.` (220 caracteres)

### Seção "Soluções"
- **Eyebrow:** `Soluções` (25 caracteres)
- **Título:** `Construímos software sob medida com squads especialistas e turnover baixíssimo.` (90 caracteres)
- **Parágrafo:** `Da concepção ao deploy: sistemas personalizados, BI, GCPro e alocação de times completos.` (140 caracteres)
- **Lista de serviços:**
  - Título: `Software Sob Medida`, `Alocação de Times`, etc. (35 caracteres)
  - Descrição: (110 caracteres)

### Botões
- Exemplo: `Vamos trabalhar juntos` (30 caracteres)

---

## 2. Sobre Nós (`src/app/about/page.tsx`)

### Hero Section
- **Eyebrow:** `Sobre nós` (25 caracteres)
- **Título:** `Nossa força é a colaboração` (50 caracteres)
- **Parágrafo:** `Acreditamos que nossa força está na abordagem colaborativa, que coloca nossos clientes no centro de tudo o que fazemos.` (140 caracteres)
- **Bloco institucional:**
  - Parágrafos sobre história, valores e cultura da SMN (250 caracteres cada)

### Estatísticas
- Exemplo: `35 Underpaid employees`, `52 Placated clients`, `$25M Invoices billed`
  - Valor: 20 caracteres
  - Label: 30 caracteres
  - **ATENÇÃO:** Atualizar para português e dados reais.

### Seção "Nossa Cultura" (FALTA TEXTO EM PORTUGUÊS)
- **Eyebrow:** `Nossa cultura` (25 caracteres)
- **Título:** SUGERIR frase inspiradora sobre equilíbrio (70 caracteres)
- **Parágrafo:** SUGERIR mensagem sobre valores compartilhados (120 caracteres)
- **Lista de valores:**
  - Título: (20 caracteres)
  - Descrição: (90 caracteres)

### Seção "Equipe"
- **Título grupo:** `Liderança`, `Equipe` (20 caracteres)
- **Nome:** (30 caracteres)
- **Cargo:** (35 caracteres)

### Seção "Do nosso blog" (FALTA TEXTO EM PORTUGUÊS)
- **Título:** `Do nosso blog` (25 caracteres)
- **Intro:** SUGERIR frase sobre expertise do time (120 caracteres)

---

## 3. Blog (`src/app/blog/page.tsx`)

- **Eyebrow:** `Blog` (15 caracteres)
- **Título:** FALTA TEXTO EM PORTUGUÊS (Exemplo: `Últimos artigos e novidades`, 35 caracteres)
- **Parágrafo:** FALTA TEXTO EM PORTUGUÊS (120 caracteres)
- **Cards de artigo:**
  - Título: (60 caracteres)
  - Descrição: (150 caracteres)
  - Botão: FALTA TEXTO EM PORTUGUÊS (Exemplo: `Leia mais`, 15 caracteres)

---

## 4. Contato (`src/app/contact/page.tsx`)

### Hero Section
- **Eyebrow:** `Fale conosco` (15 caracteres)
- **Título:** `Vamos trabalhar juntos` (30 caracteres)
- **Parágrafo:** `Estamos ansiosos para ouvir sobre seu projeto.` (60 caracteres)

### Formulário de contato
- **Campos:**
  - Nome, Email, Empresa, Telefone (40 caracteres)
  - Mensagem (400 caracteres)
- **Orçamento:**
  - Opções: `R$ 50K – R$ 100K`, etc. (25 caracteres)
- **Botão:** `Vamos trabalhar juntos` (30 caracteres)

### Detalhes de contato
- **Título:** `Nossos escritórios` (25 caracteres)
- **Parágrafo:** (120 caracteres)
- **Bloco de emails:** `Carreiras`, `Imprensa` (20 caracteres cada)
- **Título:** `Envie um email` (20 caracteres)
- **Título:** FALTA TEXTO EM PORTUGUÊS (Exemplo: `Redes sociais`, 20 caracteres)

---

## 5. Serviços/Processo (`src/app/process/page.tsx`)

### Hero Section
- **Eyebrow:** `Nossos serviços` (25 caracteres)
- **Título:** `Como trabalhamos` (30 caracteres)
- **Parágrafo:** (140 caracteres)

### Seções do processo (FALTA TEXTO EM PORTUGUÊS)
- **Títulos:** `Descoberta`, `Construção`, `Entrega` (20 caracteres)
- **Parágrafos:** (180 caracteres cada)
- **Listas de itens:**
  - Título: (25 caracteres)
  - Descrição: (80 caracteres)

### Seção "Nossos valores" (FALTA TEXTO EM PORTUGUÊS)
- **Eyebrow:** `Nossos valores` (20 caracteres)
- **Título:** SUGERIR frase curta sobre valores (60 caracteres)
- **Parágrafo:** (120 caracteres)
- **Lista de valores:**
  - Título: (20 caracteres)
  - Descrição: (80 caracteres)

---

## 6. Projetos/Work (`src/app/work/page.tsx`)

### Hero Section
- **Eyebrow:** `Nossos projetos` (25 caracteres)
- **Título:** `Soluções comprovadas para desafios reais.` (50 caracteres)
- **Parágrafo:** (180 caracteres)

### Cards de case study, depoimentos e clientes – ver Página Inicial.

---

## 7. SMN Demo (`src/app/smn-demo/page.tsx`)

- **Título:** `SMN Design System` (30 caracteres)
- **Parágrafo:** `Integração completa dos tokens SMN com Tailwind Studio Pro...` (120 caracteres)
- **Navegação:** FALTA TEXTO EM PORTUGUÊS (Exemplo: `Cores`, `Tipografia`, `Componentes`, 15 caracteres cada)
- **Seções de demonstração:**
  - Títulos: (40 caracteres)
  - Parágrafos: (120 caracteres)
- **Botões:** `Botão Original`, `Botão SMN` (20 caracteres)
- **Rodapé:**
  - Título: `SMN Design System` (30 caracteres)
  - Parágrafo: `Sistema de design integrado com Tailwind Studio Pro` (60 caracteres)
  - Tags: (20 caracteres cada)

---

## 8. Campos Globais e Componentes

### Botões (Button.tsx)
- **Texto:** (30 caracteres)

### Depoimentos (Testimonial.tsx, Blockquote.tsx)
- **Nome do cliente:** (30 caracteres)
- **Cargo:** (35 caracteres)
- **Depoimento:** (220 caracteres)

---

# Observações Gerais

- Todos os campos em inglês, placeholders ou textos genéricos devem ser substituídos por conteúdo relevante, objetivo e alinhado ao tom institucional da SMN.
- Os limites sugeridos consideram responsividade e harmonia visual do template.
- Recomenda-se revisar também os componentes em `src/components` para identificar textos hardcoded ou reutilizáveis.

---

**Preencha os campos marcados como FALTA TEXTO ou EM INGLÊS conforme for produzindo os textos finais.**
