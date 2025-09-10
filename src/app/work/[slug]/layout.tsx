import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { loadCaseStudies } from '@/lib/mdx'
import CaseStudyLayout from '../wrapper'

interface CaseLayoutProps {
  children: ReactNode
  params: Promise<{ slug: string }>
}

export default async function CaseLayout({
  children,
  params,
}: CaseLayoutProps) {
  // Carregar todos os cases para encontrar o caseStudy correspondente
  const { slug } = await params
  const caseStudies = await loadCaseStudies()
  const caseStudy = caseStudies.find((cs) => cs.href === `/work/${slug}`)

  if (!caseStudy) {
    notFound()
  }

  return <CaseStudyLayout caseStudy={caseStudy}>{children}</CaseStudyLayout>
}
