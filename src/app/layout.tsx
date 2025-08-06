import { type Metadata } from 'next'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - SMN Tecnologia',
    default: 'SMN Tecnologia - Software sob medida e squads de alta performance',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-primary-900 text-base antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
