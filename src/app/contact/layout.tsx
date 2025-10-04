import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fale Conosco',
  description:
    'Projetos e parcerias. Conte-nos sobre seu contexto e objetivos. Para vagas, acesse Oportunidades.',
  openGraph: {
    title: 'Fale Conosco - SMN Tecnologia',
    description:
      'Projetos e parcerias. Conte-nos sobre seu contexto e objetivos.',
    images: ['/og/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fale Conosco - SMN Tecnologia',
    description:
      'Projetos e parcerias. Conte-nos sobre seu contexto e objetivos.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
