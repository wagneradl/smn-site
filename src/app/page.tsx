import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import { ClientsGrid } from '@/components/ClientsGrid'
import { CLIENTS_CONFIG } from '@/lib/clients'
import imageLaptop from '@/images/laptop.jpg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'
import { JsonLd } from '@/lib/seo'

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-gradient-to-br from-primary-800 to-primary-900 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="brands-header flex items-center gap-6">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Confiança em missão crítica.
          </h2>
          <div className="brands-divider flex-1" />
        </FadeIn>
        <ClientsGrid theme="light" />
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Casos que comprovam nossa entrega"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Exemplos de como transformamos desafios complexos em resultado
          tangível para grandes marcas.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
                {/* Exemplos reais para exibição inicial */}
                {/*
                Ano: 2024 | Case study | Squad Ágil E-commerce Magalu | Aumento de R$ 200 mil/mês ao evoluir o e-commerce do Magazine Luiza com equipe dedicada e CI/CD automatizado.
                Ano: 2023 | Case study | ERP Momentum sob medida | Construção completa do ERP da Momentum, projeto iniciado antes mesmo da fundação da SMN e ativo há 20 anos.
                Ano: 2025 | Case study | Logística inteligente Moura | Sistema que otimiza rotas e reduz 18 % do tempo de entrega para Baterias Moura em João Pessoa. (impacto estimado)
                */}
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Soluções"
        title="Construímos software sob medida com squads especialistas e turnover baixíssimo."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Da descoberta ao deploy: sistemas tailor-made, BI, GCPro e equipes
          dedicadas que aceleram o go-to-market.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-135 flex-none lg:w-180">
                              <StylizedImage
                  src={imageLaptop}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  placeholder="blur"
                  className="justify-center lg:justify-end"
                />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4">
            <ListItem title="Software Sob Medida">
              Arquitetura moderna, performance e escalabilidade para
              necessidades exclusivas.
            </ListItem>
            <ListItem title="Alocação de Times">
              Squads dedicados, cultura forte e rotatividade mínima para
              projetos críticos.
            </ListItem>
            <ListItem title="Business Intelligence">
              Dashboards e data-marts que transformam dados brutos em decisões
              estratégicas.
            </ListItem>
            <ListItem title="GCPro ERP">
              ERP modular próprio da SMN, pronto para customizações específicas
              de cada negócio.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Fábrica de Software para Missão Crítica',
  description: 'Desde 2003, entregamos arquiteturas e sistemas que sustentam operações estratégicas no Brasil — com prazos firmes, ética e transparência.',
  openGraph: {
    title: 'Fábrica de Software para Missão Crítica - SMN Tecnologia',
    description: 'Desde 2003, entregamos arquiteturas e sistemas que sustentam operações estratégicas no Brasil.',
    images: ['/og/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fábrica de Software para Missão Crítica - SMN Tecnologia',
    description: 'Desde 2003, entregamos arquiteturas e sistemas que sustentam operações estratégicas no Brasil.',
  },
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <RootLayout>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Fábrica de software para missão crítica.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Desde 2003, entregamos arquiteturas e sistemas que sustentam
            operações estratégicas no Brasil — com prazos firmes, ética e
            transparência.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Magalu', logo: CLIENTS_CONFIG.Magalu.logoDark }}
      >
        A SMN é responsável por nossos sistemas de trocas, devoluções e
        cancelamentos, além do módulo de montagens. Front-end e back office
        entregues com solidez e suporte constante.
      </Testimonial>

      <Services />

      <ContactSection />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SMN Tecnologia',
          url: 'https://smn.example',
          logo: 'https://smn.example/logo.png',
          description: 'Fábrica de software para missão crítica desde 2003',
          foundingDate: '2003',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'João Pessoa',
            addressRegion: 'PB',
            addressCountry: 'BR',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'contato@smn.com.br',
          },
        }}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'SMN Tecnologia',
          url: 'https://smn.example',
          description: 'Fábrica de software para missão crítica',
          publisher: {
            '@type': 'Organization',
            name: 'SMN Tecnologia',
          },
        }}
      />
    </RootLayout>
  )
}
