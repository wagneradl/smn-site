import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import logoMagalu from '@/images/clients/magalu/logo-dark.svg'
import logoMomentum from '@/images/clients/momentum/logo-dark.svg'
import logoAutovox from '@/images/clients/autovox/logo-dark.svg'
import logoTeixeiraFortes from '@/images/clients/teixeira-fortes/logo-dark.svg'
import logoCea from '@/images/clients/cea/logo-dark.svg'
import logoLeveAsset from '@/images/clients/leve-asset/logo-dark.svg'
import logoCasaDoConstrutor from '@/images/clients/casa-do-construtor/logo-dark.svg'
import logoLiceuFrancano from '@/images/clients/liceu-francano/logo-dark.svg'
import { formatDate } from '@/lib/formatDate'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Cases de sucesso
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.client}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Image
                      src={caseStudy.logo}
                      alt=""
                      className="h-16 w-16 flex-none"
                      unoptimized
                    />
                    <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                      {caseStudy.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {caseStudy.service}
                    </p>
                    <p className="text-sm text-neutral-950 lg:mt-2">
                      <time dateTime={caseStudy.date}>
                        {formatDate(caseStudy.date)}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={caseStudy.href}>{caseStudy.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                    {caseStudy.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={caseStudy.href}
                      aria-label={`Ver case completo: ${caseStudy.client}`}
                    >
                      Ver case completo
                    </Button>
                  </div>
                  {caseStudy.testimonial && (
                    <Blockquote
                      author={caseStudy.testimonial.author}
                      className="mt-12"
                    >
                      {caseStudy.testimonial.content}
                    </Blockquote>
                  )}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

const clients = [
  ['Magalu', logoMagalu],
  ['Momentum', logoMomentum],
  ['Autovox', logoAutovox],
  ['Teixeira Fortes', logoTeixeiraFortes],
  ['CEA', logoCea],
  ['Leve Asset', logoLeveAsset],
  ['Casa do Construtor', logoCasaDoConstrutor],
  ['Liceu Francano', logoLiceuFrancano],
]

function Clients() {
  /** Buckets corrigidos por cliente (com base no manifest) */
  const BUCKET: Record<string, 'wide' | 'standard' | 'emblem'> = {
    Magalu: 'wide',
    Momentum: 'wide',
    Autovox: 'wide',
    'Leve Asset': 'wide',
    'Casa do Construtor': 'wide',
    'Teixeira Fortes': 'standard',
    'Liceu Francano': 'standard',
    CEA: 'emblem',
  }

  /** Ajustes ópticos de escala/posição (valores sutis) */
  const tweaks: Record<string, React.CSSProperties> = {
    'Magalu':              { ['--s' as any]: '0.96' },                  // dx via CSS
    'Momentum':            { ['--s' as any]: '1'    },
    'Autovox':             { ['--s' as any]: '1'    },
    'Teixeira Fortes':     { ['--s' as any]: '1.06' },
    'CEA':                 { ['--s' as any]: '1.22', ['--dy' as any]: '-2px' },
    'Leve Asset':          { ['--s' as any]: '0.98' },
    'Casa do Construtor':  { ['--s' as any]: '1.00' },
    'Liceu Francano':      { ['--s' as any]: '1.02' },
  }

  function brandClassFor(client: string) {
    const bucket = BUCKET[client] ?? 'standard'
    return [
      'brand',
      bucket === 'wide' && 'brand--wide',
      bucket === 'emblem' && 'brand--emblem',
    ].filter(Boolean).join(' ')
  }

  function getSlug(client: string): string {
    return client.toLowerCase().replaceAll(' ', '-')
  }

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Grandes marcas confiam na SMN
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        <ul 
          role="list" 
          className="brands-grid"
          data-debug-logos="off" // Toggle para "on" para inspeção visual
        >
          {clients.map(([client, logo]) => (
            <li
              key={client}
              data-logo-item
              className={brandClassFor(client)}
              style={tweaks[client] ?? {}}
              data-brand={getSlug(client)}
            >
              <Image src={logo} alt={client} unoptimized />
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Nossos Projetos – SMN Tecnologia',
  description:
    'Conheça nossos projetos: sistemas para Magazine Luiza, Momentum, Baterias Moura e muito mais.',
}

export default async function Work() {
  let caseStudies = await loadCaseStudies()

  return (
    <RootLayout>
      <PageIntro
        eyebrow="Nossos projetos"
        title="Soluções comprovadas para desafios reais."
      >
        <p>
          Há mais de 15 anos desenvolvemos sistemas sob medida que transformam negócios.
          Nosso portfólio inclui projetos para grandes varejistas, indústrias e startups,
          sempre focando em performance, escalabilidade e resultados mensuráveis.
        </p>
      </PageIntro>

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Magalu', logo: logoMagalu }}
      >
        Procuramos a <em>SMN</em> pela sua reputação em projetos complexos. Eles
        entregaram uma solução excepcional em tempo recorde.
      </Testimonial>

      <Clients />

      <ContactSection />
    </RootLayout>
  )
}
