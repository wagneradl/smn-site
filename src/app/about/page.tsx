import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { StylizedImage } from '@/components/StylizedImage'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageBlakeReid from '@/images/team/blake-reid.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageFachada from '@/images/fachada.jpg'
import { loadArticles } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-primary-800 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Nossa cultura"
        title="Gente, ética e cooperação acima de tudo"
        invert
      >
        <p>
          Valores que sustentam todas as nossas relações e guiam nossa busca por
          excelência técnica e humana.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Ética e transparência" invert>
            Sustentam todas as nossas relações com clientes, parceiros e
            colaboradores.
          </GridListItem>
          <GridListItem title="Colaboração" invert>
            Times unidos em torno de desafios complexos, compartilhando
            conhecimento e responsabilidades.
          </GridListItem>
          <GridListItem title="Inovação" invert>
            Busca constante por arquiteturas modernas e soluções criativas para
            problemas reais.
          </GridListItem>
          <GridListItem title="Educação" invert>
            Desde o início, investimos em formação de talentos e desenvolvimento
            de liderança.
          </GridListItem>
          <GridListItem title="Responsabilidade" invert>
            Impacto social e inclusão através da tecnologia, contribuindo para o
            desenvolvimento regional.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Liderança',
    people: [
      {
        name: 'Ricardo Corrales',
        role: 'Fundador — 40+ anos em tecnologia',
        image: { src: imageLeslieAlexander }, // Substitua pela imagem real se disponível
      },
      {
        name: 'Marcus Mandara',
        role: 'Sócio — Análise de requisitos e entrega',
        image: { src: imageMichaelFoster }, // Substitua pela imagem real se disponível
      },
      {
        name: 'Rafael Pessoni',
        role: 'CTO — Chief Technology Officer',
        image: { src: imageBenjaminRussel }, // Placeholder - substitua pela imagem real quando disponível
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            sizes="100vw"
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

function Locations() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeInStagger>
        <Border as={FadeIn} />
        <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
          <FadeIn>
            <h2 className="font-display text-2xl font-semibold text-neutral-950">
              Onde estamos
            </h2>
          </FadeIn>
          <div className="lg:col-span-3">
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8"
            >
              {[
                {
                  name: 'Sede — João Pessoa (PB)',
                  address: 'Rua Dep. Geraldo Mariz, 291A — Tambauzinho',
                },
                {
                  name: 'Ingá (PB)',
                  address: 'Sítio Hotel Cruzeiro, s/n — Zona Rural, BR-230',
                },
                {
                  name: 'Franca (SP)',
                  address: 'R. dos Pracinhas, 1720 — Núcleo Agrícola Alpha',
                },
                {
                  name: 'Passos (MG)',
                  address: 'R. Noruega, 274 — Novo Mundo',
                },
              ].map((location) => (
                <li key={location.name}>
                  <FadeIn>
                    <div className="rounded-3xl bg-neutral-100 p-6">
                      <h3 className="font-display text-base font-semibold text-neutral-950">
                        {location.name}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600">
                        {location.address}
                      </p>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeInStagger>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description:
    'Desde 2003, construímos software que sustenta operações críticas no Brasil. Nossa história é feita de tecnologia e pessoas.',
  openGraph: {
    title: 'Sobre Nós - SMN Tecnologia',
    description:
      'Desde 2003, construímos software que sustenta operações críticas no Brasil. Nossa história é feita de tecnologia e pessoas.',
    images: ['/og/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nós - SMN Tecnologia',
    description:
      'Desde 2003, construímos software que sustenta operações críticas no Brasil. Nossa história é feita de tecnologia e pessoas.',
  },
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <RootLayout>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <FadeIn className="max-w-3xl">
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-7xl">
                  Nossa história é feita de tecnologia e pessoas
                </h1>
                <p className="mt-6 text-xl text-neutral-600">
                  Desde 2003, construímos software que sustenta operações
                  críticas no Brasil. O que começou com a visão de Ricardo
                  Corrales hoje é uma empresa sólida, com equipes distribuídas e
                  clientes em setores estratégicos.
                </p>
              </div>
              <div className="space-y-6 text-base text-neutral-600">
                <p>
                  A SMN nasceu em 2003, fruto da experiência de mais de 40 anos
                  de Ricardo Corrales em tecnologia e do encontro com parceiros
                  que acreditaram no mesmo propósito: formar times de excelência
                  e entregar software que faz diferença real nos negócios.
                </p>
                <p>
                  De um início marcado por projetos robustos de ERP para
                  empresas como a Momentum, evoluímos para uma fábrica de
                  software referência em soluções sob medida, Business
                  Intelligence e o ERP modular GCPro. Hoje, mantemos presença em
                  João Pessoa, Ingá, Franca e Passos, com squads especializados
                  em missão crítica e um programa contínuo de formação de
                  talentos.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn className="flex justify-center lg:justify-end">
            <StylizedImage
              src={imageFachada}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full max-w-xl"
            />
          </FadeIn>
        </div>
      </Container>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="2003" label="Fundação da SMN" />
          <StatListItem value="20+" label="Anos de experiência em TI" />
          <StatListItem value="200+" label="Profissionais formados" />
          <StatListItem value="3×" label="Premiada como Great Place to Work" />
          <StatListItem value="GCPro" label="ERP em evolução contínua" />
        </StatList>
      </Container>

      <Culture />

      <Team />

      <Locations />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="Do nosso blog"
        intro="Insights sobre software sob medida, cultura de squads e inovação contínua."
        pages={blogArticles}
      />

      <ContactSection />
    </RootLayout>
  )
}
