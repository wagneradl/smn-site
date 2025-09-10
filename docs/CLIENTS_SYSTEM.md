# Sistema de Logos de Clientes - SMN Site

## Visão Geral

O sistema de logos de clientes foi refatorado para ser sustentável, escalável e seguir as boas práticas do template. A estrutura centralizada elimina duplicação de código e facilita a manutenção.

## Arquitetura

### Arquivos Principais

- `src/lib/clients.ts` - Configuração centralizada
- `src/components/ClientsGrid.tsx` - Componente reutilizável
- `src/app/page.tsx` - Página inicial (usa ClientsGrid)
- `src/app/work/page.tsx` - Página de trabalhos (usa ClientsGrid)
- `src/styles/base.css` - Estilos CSS do sistema

### Estrutura de Dados

```typescript
interface ClientConfig {
  name: string
  logoDark: any
  logoLight: any
  bucket: 'wide' | 'standard' | 'emblem'
  scale: number
  offsetX?: number
  offsetY?: number
}
```

## Sistema de Buckets

- **wide**: Logos largos (aspect ratio > 3.5)
- **standard**: Logos padrão (aspect ratio 2-3.5)
- **emblem**: Emblemas/círculos (aspect ratio < 2)

## Ajustes Ópticos

Via variáveis CSS customizadas:

- `--s`: Escala geral (ex: 1.04)
- `--dx`: Offset horizontal (ex: -2px)
- `--dy`: Offset vertical (ex: -2px)

## Como Adicionar Novos Clientes

1. **Adicionar imports** no topo de `src/lib/clients.ts`:

```typescript
import logoNovoClienteDark from '@/images/clients/novo-cliente/logo-dark.svg'
import logoNovoClienteLight from '@/images/clients/novo-cliente/logo-light.svg'
```

2. **Adicionar configuração** no `CLIENTS_CONFIG`:

```typescript
'Novo Cliente': {
  name: 'Novo Cliente',
  logoDark: logoNovoClienteDark,
  logoLight: logoNovoClienteLight,
  bucket: 'wide', // ou 'standard' ou 'emblem'
  scale: 1.0,
  offsetX: 0, // opcional
  offsetY: 0, // opcional
},
```

3. **Organizar arquivos** em `src/images/clients/novo-cliente/`:
   - `logo-dark.svg`
   - `logo-light.svg`

## Problemas Comuns e Soluções

### Logo com Espaço Vazio

**Problema**: ViewBox do SVG maior que o conteúdo real
**Solução**: Ajustar viewBox para corresponder ao conteúdo (ex: 184x36 → 120x36)

### Logo Muito Pequeno/Grande

**Problema**: Desequilíbrio visual entre logos
**Solução**: Ajustar `scale` na configuração (ex: 0.96 → 1.04)

### Logo Desalinhado

**Problema**: Posicionamento incorreto
**Solução**: Usar `offsetX` e `offsetY` para ajustes finos

## Funcionalidades

- ✅ Responsividade (grid adaptativo)
- ✅ Temas dark/light
- ✅ Animações FadeIn
- ✅ Debug tools (`data-debug-logos="on"`)
- ✅ Acessibilidade (alt text, role="list")
- ✅ Performance (unoptimized para SVGs)

## Debug

Para ativar modo debug:

```typescript
<ClientsGrid debugMode={true} />
```

Isso mostra:

- Linhas de baseline
- Bordas dos containers
- Grid de referência

## Boas Práticas

1. **Sempre centralizar configurações** em `src/lib/clients.ts`
2. **Usar o componente ClientsGrid** em vez de duplicar código
3. **Manter consistência** na nomenclatura de arquivos
4. **Testar responsividade** em diferentes breakpoints
5. **Verificar viewBox** dos SVGs para evitar espaços vazios
6. **Usar tipagem TypeScript** para type safety

## Histórico de Problemas Resolvidos

### Commit 3e41b76 - Refatoração Completa

- Eliminou duplicação entre page.tsx e work/page.tsx
- Corrigiu viewBox do logo Magalu (184x36 → 120x36)
- Ajustou escala do logo Magalu (0.96 → 1.04)
- Centralizou configurações em src/lib/clients.ts
- Criou componente ClientsGrid reutilizável
- Adicionou tipagem TypeScript forte

## Estrutura de Pastas

```
src/
├── lib/
│   └── clients.ts              # Configuração centralizada
├── components/
│   └── ClientsGrid.tsx         # Componente reutilizável
├── app/
│   ├── page.tsx                # Página inicial
│   └── work/page.tsx           # Página de trabalhos
├── styles/
│   └── base.css                # Estilos CSS
└── images/
    └── clients/
        ├── magalu/
        │   ├── logo-dark.svg
        │   └── logo-light.svg
        ├── momentum/
        │   ├── logo-dark.svg
        │   └── logo-light.svg
        └── ... (outros clientes)
```
