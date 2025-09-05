import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { RootLayout } from '@/components/RootLayout'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

export default async function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
