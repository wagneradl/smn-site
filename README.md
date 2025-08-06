# Studio

Studio is a [Tailwind Plus](https://tailwindcss.com/plus) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## SMN Site - Template Tailwind Studio Pro Integrado

Site institucional da SMN Tecnologia desenvolvido com integração inteligente do SMN Design System no template premium Tailwind Studio Pro.

## Tecnologias

- **Next.js 15** - Framework React de produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Framework CSS utilitário
- **Framer Motion** - Animações fluidas
- **MDX** - Markdown com componentes React

## Design System SMN

Os tokens do SMN Design System estão integrados via `@theme` no arquivo `src/styles/tailwind.css`:

- **Cores primárias**: Azul SMN (#2e304f, #26314c, #1f2537)
- **Cor de destaque**: Verde SMN (#40df80, #38c271)
- **Tipografia**: SF Pro Display/Text
- **Espaçamentos**: Grid 8px base

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

## Estrutura

```
src/
├── app/                 # App Router (Next.js 15)
├── components/          # Componentes React
├── images/             # Assets de imagem
├── lib/                # Utilitários
└── styles/             # Estilos globais + tokens SMN
```

## Conteúdo SMN

- Hero section com tagline SMN
- Serviços: Software sob medida, GCPro, Squads
- Case studies: Magazine Luiza, Momentum, Baterias Moura
- Formulários de contato em português
- Navegação e footer com conteúdo SMN

## Deploy

O site está pronto para deploy em:
- Vercel (recomendado)
- Netlify
- AWS Amplify
- Qualquer provedor que suporte Next.js

---

**SMN Tecnologia** - Software sob medida e squads de alta performance desde 2008.

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Framer Motion](https://www.framer.com/docs/) - the official Framer Motion documentation
- [MDX](https://mdxjs.com/) - the official MDX documentation
