import { type Metadata } from 'next'

import '@/styles/tailwind.css'
import SkipLink from '@/components/SkipLink'

export const metadata: Metadata = {
  title: {
    template: '%s - SMN Tecnologia',
    default: 'SMN Tecnologia - Fábrica de software para missão crítica',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-primary-900 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <SkipLink />
        {children}
      </body>
    </html>
  )
}
