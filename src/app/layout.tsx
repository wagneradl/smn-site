import { type Metadata } from 'next'

import '@/styles/tailwind.css'
import SkipLink from '@/components/SkipLink'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://smn.example',
  ),
  title: { default: 'SMN Tecnologia', template: '%s | SMN' },
  description:
    'Somos especialistas em missões críticas e engenharia de produto.',
  openGraph: {
    type: 'website',
    siteName: 'SMN Tecnologia',
    images: ['/og/og-default.jpg'],
  },
  twitter: { card: 'summary_large_image' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full bg-primary-900 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <SkipLink />
        {children}
      </body>
    </html>
  )
}
