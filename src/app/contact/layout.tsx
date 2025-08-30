import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fale Conosco – SMN Tecnologia',
  description: 'Projetos e parcerias. Conte-nos sobre seu contexto e objetivos. Para vagas, acesse Carreiras.',
  keywords: [
    'contato SMN',
    'projetos software',
    'parcerias tecnológicas',
    'consultoria TI',
    'desenvolvimento software',
    'carreiras SMN'
  ],
  openGraph: {
    title: 'Fale Conosco – SMN Tecnologia',
    description: 'Projetos e parcerias. Conte-nos sobre seu contexto e objetivos.',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
