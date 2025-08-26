import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fale Conosco – SMN Tecnologia',
  description: 'Entre em contato conosco para discutir seu projeto de software sob medida ou contratação de squads.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
