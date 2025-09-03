import { type Metadata } from 'next'
import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { RootLayout } from '@/components/RootLayout'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'

export const metadata: Metadata = {
  title: 'Soluções sob medida para operações estratégicas',
  description:
    'Da concepção ao suporte contínuo: software, squads e ERP modular para empresas que não podem parar.',
  openGraph: {
    title: 'Soluções sob medida para operações estratégicas - SMN Tecnologia',
    description: 'Da concepção ao suporte contínuo: software, squads e ERP modular para empresas que não podem parar.',
    images: ['/og/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soluções sob medida para operações estratégicas - SMN Tecnologia',
    description: 'Da concepção ao suporte contínuo: software, squads e ERP modular para empresas que não podem parar.',
  },
}

function ProcessSection() {
  return (
    <>
      <SectionIntro title="Nosso Processo" className="mt-24 sm:mt-32 lg:mt-40">
        <p>
          Processo enxuto e transparente — da descoberta ao deploy — sempre com
          foco em valor de negócio e confiabilidade.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-135 flex-none lg:w-180">
              <StylizedImage
                src={imageMeeting}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4">
            <ListItem title="Descoberta">
              Workshops colaborativos que alinham desafios, objetivos e roadmap.
            </ListItem>
            <ListItem title="Construção">
              Arquiteturas modulares, testes automatizados e integrações seguras
              que garantem escalabilidade.
            </ListItem>
            <ListItem title="Entrega Contínua">
              Deploy estável, monitoramento ativo e transferência de
              conhecimento para o seu time.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

function SolutionsSection() {
  return (
    <>
      <SectionIntro title="Nossas Soluções" className="mt-24 sm:mt-32 lg:mt-40">
        <p>
          Tecnologias e metodologias que transformam desafios complexos em
          vantagens competitivas sustentáveis.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Software sob medida">
            Sistemas tailor-made com performance, escalabilidade e aderência
            total ao seu negócio.
          </GridListItem>
          <GridListItem title="Alocação de squads">
            Times dedicados, turnover baixíssimo e cultura forte para missões
            críticas.
          </GridListItem>
          <GridListItem title="Business Intelligence">
            Dashboards e data-marts que transformam dados brutos em decisões
            estratégicas.
          </GridListItem>
          <GridListItem title="GCPro ERP">
            Nosso ERP modular, pronto para customizações específicas e evolução
            constante.
          </GridListItem>
        </GridList>
      </Container>
    </>
  )
}

function DiferenciaisSection() {
  return (
    <>
      <SectionIntro
        title="Nossos Diferenciais"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Valores que guiam nossa entrega e garantem resultados consistentes em
          projetos de alta complexidade.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Qualidade">
            Código limpo, arquitetura sólida e entregas auditáveis.
          </GridListItem>
          <GridListItem title="Ética & Transparência">
            Compromisso total com prazos, escopo e comunicação aberta.
          </GridListItem>
          <GridListItem title="Inovação">
            Tecnologias modernas e soluções criativas aplicadas a cenários
            complexos.
          </GridListItem>
          <GridListItem title="Formação Contínua">
            Base sólida de talentos formados e preparados internamente.
          </GridListItem>
        </GridList>
      </Container>
    </>
  )
}

function CTASection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-gradient-to-br from-primary-800 to-primary-900 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-medium text-balance text-white sm:text-4xl">
            Pronto para inovar com confiança?
          </h2>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" invert>
              Vamos Conversar
            </Button>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

export default function SolucoesPage() {
  return (
    <RootLayout>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-7xl">
            Soluções sob medida para operações estratégicas.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Da concepção ao suporte contínuo: software, squads e ERP modular
            para empresas que não podem parar.
          </p>
        </FadeIn>
      </Container>

      <ProcessSection />
      <SolutionsSection />
      <DiferenciaisSection />
      <CTASection />
    </RootLayout>
  )
}
