# Relatório: Status dos Formulários do Site SMN

**Data:** 2025-01-27  
**Objetivo:** Documentar o estado atual dos formulários e o que precisa ser configurado para torná-los funcionais.

---

## 📋 Resumo Executivo

O site possui **2 formulários principais**:
1. **Formulário de Contato** (`/contact`) - Para solicitações de projeto
2. **Formulário de Carreiras** (`/careers`) - Para candidaturas

**Status Geral:** ⚠️ **Frontend completo, Backend parcialmente implementado**

Ambos os formulários têm:
- ✅ Interface visual completa e funcional
- ✅ Validação de campos no frontend
- ✅ Estrutura de API routes criada
- ❌ **Envio de e-mail não implementado** (simulado)
- ❌ **Formulário de contato não usa o hook disponível**

---

## 1. Formulário de Contato (`/contact`)

### 📍 Localização
- **Frontend:** `src/app/contact/page.tsx`
- **Backend:** `src/app/api/contact/route.ts`
- **Hook:** `src/hooks/useContactForm.ts` (existe mas não está sendo usado)
- **Validação:** `src/lib/validation.ts`
- **Conteúdo:** `src/content/contact.ts`

### ✅ O que está implementado

#### Frontend
- ✅ Componentes de input (TextInput, SelectInput, TextAreaInput, RadioInput)
- ✅ Formulário completo com todos os campos:
  - Nome (obrigatório)
  - E-mail (obrigatório)
  - Empresa (obrigatório)
  - Telefone (opcional)
  - Assunto (select: Projeto, Parceria, Dúvida técnica, Outro)
  - Mensagem (obrigatório)
  - Prazo desejado (radio: Imediato, Próximo trimestre, Sem urgência)
- ✅ Validação HTML5 básica (required, type="email", etc.)
- ✅ Estilização completa e responsiva
- ✅ Mensagem LGPD

#### Backend
- ✅ API route criada (`/api/contact`)
- ✅ Validação de campos obrigatórios
- ✅ Rate limiting básico (3 tentativas por minuto por IP)
- ✅ Preparação do corpo do e-mail (formatação)
- ✅ Headers MIME configurados

#### Validação
- ✅ Schema Zod completo (`contactFormSchema`)
- ✅ Validação de formato de e-mail
- ✅ Validação de tamanho de campos
- ✅ Sanitização de dados
- ✅ Função `validateContactForm()` pronta

### ❌ O que falta configurar

#### 1. Integração do Hook no Frontend
**Problema:** O formulário não está usando o hook `useContactForm` que já existe.

**Arquivo:** `src/app/contact/page.tsx` (linha 132-204)

**Status atual:**
```tsx
function ContactForm() {
  return (
    <form> {/* ❌ Sem onSubmit, sem estado, sem validação */}
      {/* Campos do formulário */}
      <Button type="submit">Enviar</Button>
    </form>
  )
}
```

**O que fazer:**
- Integrar o hook `useContactForm` no componente
- Adicionar `onSubmit={handleSubmit}` ao form
- Conectar campos ao estado do hook via `updateField`
- Exibir erros de validação
- Exibir mensagens de sucesso/erro
- Adicionar estado de loading

**Exemplo de implementação:**
```tsx
function ContactForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    updateField,
    handleSubmit,
  } = useContactForm()

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        error={errors.name}
        // ... outros props
      />
      {/* ... outros campos */}
      {submitStatus === 'success' && <SuccessMessage />}
      {submitStatus === 'error' && <ErrorMessage />}
    </form>
  )
}
```

#### 2. Implementação do Envio de E-mail
**Problema:** O backend simula o envio de e-mail, mas não envia de verdade.

**Arquivo:** `src/app/api/contact/route.ts` (linhas 97-106)

**Status atual:**
```typescript
// TODO: Implementar envio real de e-mail
// Por exemplo, usando Resend, SendGrid, ou outro serviço
// const mailResult = await sendEmail(headers, bodyContent)

// Simulando sucesso
const mailResult = true
```

**O que fazer:**

**Opção 1: Resend (Recomendado)**
```bash
npm install resend
```

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const { data, error } = await resend.emails.send({
  from: 'SMN Site <noreply@smn.com.br>',
  to: [TO_EMAIL],
  replyTo: email,
  subject: subjectLine,
  text: emailBody,
})
```

**Opção 2: SendGrid**
```bash
npm install @sendgrid/mail
```

**Opção 3: Nodemailer (SMTP direto)**
```bash
npm install nodemailer
```

**Variáveis de ambiente necessárias:**
```env
# Para Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Para SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Para Nodemailer (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@smn.com.br
SMTP_PASS=sua-senha
```

#### 3. Configuração de Variáveis de Ambiente
**Arquivo:** `.env.local` (criar se não existir)

**Variáveis necessárias:**
```env
# E-mails de destino
NEXT_PUBLIC_PROJECTS_EMAIL=projetos@smn.com.br
NEXT_PUBLIC_PRESS_EMAIL=imprensa@smn.com.br
NEXT_PUBLIC_CAREERS_EMAIL=oportunidades@smn.com.br

# API Key do serviço de e-mail escolhido
RESEND_API_KEY=re_xxxxxxxxxxxxx
# OU
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
# OU (para SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@smn.com.br
SMTP_PASS=sua-senha
```

---

## 2. Formulário de Carreiras (`/careers`)

### 📍 Localização
- **Frontend:** `src/components/CareersForm.tsx`
- **Backend:** `src/app/api/careers/route.ts`

### ✅ O que está implementado

#### Frontend
- ✅ Componentes de input completos
- ✅ Formulário completo com todos os campos:
  - Nome Completo (obrigatório)
  - E-mail (obrigatório)
  - Telefone (obrigatório)
  - Área de Interesse (select: Desenvolvimento, BI, Infraestrutura, Estágio)
  - Currículo (file upload, PDF, máx 5MB)
  - Mensagem (opcional)
- ✅ Validação de arquivo (tipo PDF, tamanho máximo)
- ✅ Estado de loading (`isSubmitting`)
- ✅ Mensagens de sucesso/erro
- ✅ Integração com API (`/api/careers`)
- ✅ Reset do formulário após sucesso

#### Backend
- ✅ API route criada (`/api/careers`)
- ✅ Validação de campos obrigatórios
- ✅ Validação de arquivo (tipo e tamanho)
- ✅ Conversão de arquivo para base64
- ✅ Preparação do e-mail com anexo
- ✅ Headers MIME configurados para anexo

### ❌ O que falta configurar

#### 1. Implementação do Envio de E-mail com Anexo
**Problema:** O backend simula o envio de e-mail, mas não envia de verdade.

**Arquivo:** `src/app/api/careers/route.ts` (linhas 97-106)

**Status atual:**
```typescript
// TODO: Implementar envio real de e-mail
// Por exemplo, usando Resend, SendGrid, ou outro serviço
// const mailResult = await sendEmail(headers, body)

// Simulando sucesso
const mailResult = true
```

**O que fazer:**

**Opção 1: Resend (Recomendado)**
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const fileBuffer = await curriculo.arrayBuffer()
const fileBase64 = Buffer.from(fileBuffer).toString('base64')

const { data, error } = await resend.emails.send({
  from: 'SMN Site <noreply@smn.com.br>',
  to: [TO_EMAIL],
  replyTo: email,
  subject: subject,
  text: message,
  attachments: [
    {
      filename: curriculo.name,
      content: fileBase64,
      type: 'application/pdf',
    },
  ],
})
```

**Opção 2: SendGrid**
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const fileBuffer = await curriculo.arrayBuffer()
const fileBase64 = Buffer.from(fileBuffer).toString('base64')

await sgMail.send({
  to: TO_EMAIL,
  from: 'noreply@smn.com.br',
  replyTo: email,
  subject: subject,
  text: message,
  attachments: [
    {
      content: fileBase64,
      filename: curriculo.name,
      type: 'application/pdf',
      disposition: 'attachment',
    },
  ],
})
```

#### 2. Validação no Backend
**Problema:** Validação básica existe, mas poderia ser mais robusta.

**Melhorias sugeridas:**
- Validar formato de e-mail com regex ou biblioteca
- Validar formato de telefone brasileiro
- Validar extensão do arquivo (não apenas MIME type)
- Sanitizar nomes de arquivo para evitar path traversal

#### 3. Rate Limiting
**Problema:** Não há rate limiting no formulário de carreiras.

**Sugestão:** Implementar rate limiting similar ao formulário de contato.

---

## 3. Checklist de Implementação

### Prioridade Alta 🔴

- [ ] **Integrar hook `useContactForm` no formulário de contato**
  - Arquivo: `src/app/contact/page.tsx`
  - Tempo estimado: 1-2 horas

- [ ] **Escolher e configurar serviço de e-mail**
  - Opções: Resend, SendGrid, ou Nodemailer
  - Tempo estimado: 2-3 horas

- [ ] **Implementar envio real de e-mail no `/api/contact`**
  - Arquivo: `src/app/api/contact/route.ts`
  - Tempo estimado: 1-2 horas

- [ ] **Implementar envio real de e-mail no `/api/careers`**
  - Arquivo: `src/app/api/careers/route.ts`
  - Tempo estimado: 2-3 horas (inclui anexo)

- [ ] **Criar arquivo `.env.local` com variáveis necessárias**
  - Tempo estimado: 15 minutos

### Prioridade Média 🟡

- [ ] **Adicionar rate limiting no formulário de carreiras**
  - Arquivo: `src/app/api/careers/route.ts`
  - Tempo estimado: 30 minutos

- [ ] **Melhorar validação no backend**
  - Validar formato de e-mail
  - Validar formato de telefone
  - Sanitizar dados
  - Tempo estimado: 1 hora

- [ ] **Adicionar logging estruturado**
  - Para monitoramento e debug
  - Tempo estimado: 1 hora

- [ ] **Implementar notificação de erro para administradores**
  - Em caso de falha no envio
  - Tempo estimado: 1 hora

### Prioridade Baixa 🟢

- [ ] **Adicionar testes unitários para validação**
  - Arquivo: `src/lib/validation.ts`
  - Tempo estimado: 2 horas

- [ ] **Adicionar testes de integração para APIs**
  - Arquivos: `src/app/api/contact/route.ts` e `src/app/api/careers/route.ts`
  - Tempo estimado: 3-4 horas

- [ ] **Implementar captcha (reCAPTCHA ou hCaptcha)**
  - Para prevenir spam
  - Tempo estimado: 2-3 horas

- [ ] **Adicionar analytics de conversão**
  - Rastrear submissões de formulários
  - Tempo estimado: 1 hora

---

## 4. Recomendações de Serviços de E-mail

### Resend (Recomendado) ⭐
**Vantagens:**
- ✅ Fácil integração com Next.js
- ✅ API simples e moderna
- ✅ Suporte a anexos
- ✅ Plano gratuito generoso (3.000 e-mails/mês)
- ✅ Boa documentação

**Desvantagens:**
- ⚠️ Serviço relativamente novo

**Custo:** Gratuito até 3.000 e-mails/mês, depois $20/mês

### SendGrid
**Vantagens:**
- ✅ Serviço consolidado e confiável
- ✅ Boa documentação
- ✅ Suporte a anexos
- ✅ Analytics integrado

**Desvantagens:**
- ⚠️ API mais verbosa
- ⚠️ Plano gratuito limitado (100 e-mails/dia)

**Custo:** Gratuito até 100 e-mails/dia, depois $19.95/mês

### Nodemailer (SMTP)
**Vantagens:**
- ✅ Controle total
- ✅ Gratuito (usa seu próprio servidor SMTP)
- ✅ Flexível

**Desvantagens:**
- ⚠️ Requer servidor SMTP próprio
- ⚠️ Mais complexo de configurar
- ⚠️ Pode ter problemas de deliverability

**Custo:** Depende do provedor SMTP

---

## 5. Estrutura de Arquivos

```
src/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts          ✅ Criado (falta envio real)
│   │   └── careers/
│   │       └── route.ts          ✅ Criado (falta envio real)
│   ├── contact/
│   │   └── page.tsx              ✅ Criado (falta integrar hook)
│   └── careers/
│       └── page.tsx              ✅ Usa CareersForm
├── components/
│   └── CareersForm.tsx            ✅ Completo e funcional
├── hooks/
│   └── useContactForm.ts         ✅ Criado (não está sendo usado)
├── lib/
│   └── validation.ts             ✅ Completo (Zod schemas)
└── content/
    └── contact.ts                 ✅ Conteúdo do formulário
```

---

## 6. Próximos Passos Sugeridos

1. **Decidir qual serviço de e-mail usar** (Recomendado: Resend)
2. **Criar conta no serviço escolhido e obter API key**
3. **Criar arquivo `.env.local` com as variáveis**
4. **Instalar dependência do serviço escolhido**
5. **Implementar envio de e-mail no `/api/contact`**
6. **Implementar envio de e-mail no `/api/careers`**
7. **Integrar hook `useContactForm` no formulário de contato**
8. **Testar ambos os formulários em ambiente de desenvolvimento**
9. **Configurar variáveis de ambiente em produção**
10. **Testar em produção**

---

## 7. Notas Técnicas

### Rate Limiting
- O formulário de contato tem rate limiting básico (3 tentativas/minuto)
- Implementado em memória (não persiste entre reinicializações)
- Para produção, considerar Redis ou serviço externo

### Validação
- Frontend: Validação HTML5 + Zod (via hook, quando integrado)
- Backend: Validação básica de campos obrigatórios
- Recomendação: Usar o schema Zod também no backend

### Segurança
- ✅ Rate limiting (contato)
- ✅ Validação de tipo de arquivo (carreiras)
- ✅ Validação de tamanho de arquivo (carreiras)
- ⚠️ Falta: Sanitização de inputs
- ⚠️ Falta: Proteção CSRF (Next.js tem proteção nativa, mas verificar)
- ⚠️ Falta: Captcha para prevenir spam

### LGPD
- ✅ Mensagem LGPD presente no formulário de contato
- ✅ Mensagem de privacidade no formulário de carreiras
- ⚠️ Falta: Política de privacidade linkada
- ⚠️ Falta: Termo de consentimento explícito (checkbox)

---

## 8. Estimativa de Tempo Total

**Para tornar ambos os formulários 100% funcionais:**

- **Tempo mínimo (com Resend):** 6-8 horas
- **Tempo recomendado (com melhorias):** 12-16 horas
- **Tempo completo (com testes e segurança):** 20-24 horas

---

**Última atualização:** 2025-01-27
