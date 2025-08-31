import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import { RootLayout } from '@/components/RootLayout'

export const metadata: Metadata = {
  title: 'Carreiras na SMN',
  description:
    'Faça parte de uma fábrica de software que atua em missões críticas para clientes estratégicos no Brasil.',
}

const testimonials = [
  {
    quote: 'Aqui aprendi a crescer rápido e assumir responsabilidades reais.',
    author: {
      name: 'Colaborador',
      role: 'Desenvolvedor',
    },
    image: { src: imageBenjaminRussel },
  },
  {
    quote: 'É mais que tecnologia, é sobre confiança e impacto no cliente.',
    author: {
      name: 'Colaboradora',
      role: 'Analista de Sistemas',
    },
    image: { src: imageEmmaDorsey },
  },
  {
    quote:
      'O ambiente de aprendizado contínuo me fez evoluir tanto técnica quanto pessoalmente.',
    author: {
      name: 'Colaboradora',
      role: 'Tech Lead',
    },
    image: { src: imageAngelaFisher },
  },
]

const benefits = [
  {
    title: 'Ambiente de Confiança',
    description: 'Relacionamentos sólidos, baseados em confiança e propósito.',
  },
  {
    title: 'Missões Críticas Reais',
    description: 'Trabalhe em projetos que movem setores estratégicos do país.',
  },
  {
    title: 'Formação e Crescimento',
    description:
      'Programa interno que acelera sua evolução técnica e profissional.',
  },
  {
    title: 'Reconhecimento',
    description:
      'Premiada GPTW por três anos seguidos, no topo das melhores empresas para se trabalhar.',
  },
]

function CultureSection() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro eyebrow="Nossa cultura" title="Nossa Essência" invert>
        <p>
          Desde 2003, a SMN constrói soluções estratégicas que sustentam
          operações de grande porte. Nossa cultura valoriza ética, prazo e
          transparência. Aqui, você cresce em um ambiente que combina desafios
          técnicos reais e desenvolvimento humano.
        </p>
      </SectionIntro>
    </div>
  )
}

function Benefits() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="Por que trabalhar na SMN?"
        title="Cultura que valoriza pessoas e resultados"
      >
        <p>
          Nossa essência combina desafios técnicos reais com desenvolvimento
          humano.
        </p>
      </SectionIntro>
      <GridList className="mt-16">
        {benefits.map((benefit, index) => (
          <GridListItem key={index} title={benefit.title}>
            {benefit.description}
          </GridListItem>
        ))}
      </GridList>
    </Container>
  )
}

function Testimonials() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          O que nossos colaboradores dizem
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-16 sm:space-y-20 lg:space-y-24">
        {testimonials.map((testimonial, index) => (
          <FadeIn key={index}>
            <article>
              <Border className="pt-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-12 sm:gap-12 lg:gap-16">
                  <div className="sm:col-span-8 lg:col-span-9">
                    <blockquote className="text-xl/7 text-neutral-600 sm:text-2xl/8">
                      <p className="relative">
                        <span className="absolute -top-2 -left-4 text-4xl text-neutral-300">
                          "
                        </span>
                        {testimonial.quote}
                        <span className="text-4xl text-neutral-300">"</span>
                      </p>
                    </blockquote>
                    <figcaption className="mt-6 text-base text-neutral-950">
                      <span className="font-semibold">
                        {testimonial.author.name}
                      </span>
                      <span className="text-neutral-600">
                        , {testimonial.author.role}
                      </span>
                    </figcaption>
                  </div>
                  <div className="sm:col-span-4 lg:col-span-3">
                    <div className="overflow-hidden rounded-2xl bg-neutral-100">
                      <Image
                        alt=""
                        {...testimonial.image}
                        className="aspect-square w-full object-cover grayscale transition duration-300 hover:grayscale-0"
                        priority={index === 0}
                        sizes="(min-width: 1024px) 17.625rem, (min-width: 768px) 16rem, (min-width: 640px) 40vw, 3rem"
                      />
                    </div>
                  </div>
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

function JobOpenings() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40" id="vagas">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Junte-se a nós
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        <FadeIn>
          <article>
            <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
              <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                <p className="font-display text-4xl font-medium text-neutral-950">
                  Vagas em Aberto
                </p>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p>
                    Confira as posições disponíveis e inscreva-se. Integração
                    com lista de vagas será implementada aqui.
                  </p>
                </div>
                <div className="mt-8 flex">
                  <Button href="/contact">Envie seu CV</Button>
                </div>
              </div>
              <div className="col-span-full lg:col-span-1">
                <div className="space-y-6">
                  <div className="border-l-4 border-accent-500 pl-4">
                    <h4 className="font-semibold text-neutral-950">
                      Desenvolvedor Full Stack
                    </h4>
                    <p className="text-sm text-neutral-600">
                      São Paulo, SP - Remoto
                    </p>
                  </div>
                  <div className="border-l-4 border-accent-500 pl-4">
                    <h4 className="font-semibold text-neutral-950">
                      Analista de Sistemas
                    </h4>
                    <p className="text-sm text-neutral-600">
                      São Paulo, SP - Híbrido
                    </p>
                  </div>
                  <div className="border-l-4 border-accent-500 pl-4">
                    <h4 className="font-semibold text-neutral-950">
                      Tech Lead
                    </h4>
                    <p className="text-sm text-neutral-600">
                      São Paulo, SP - Presencial
                    </p>
                  </div>
                </div>
              </div>
            </Border>
          </article>
        </FadeIn>
      </div>
    </Container>
  )
}

export default function CareersPage() {
  return (
    <RootLayout>
      <PageIntro eyebrow="Carreiras" title="Carreiras na SMN">
        <p>
          Faça parte de uma fábrica de software que atua em missões críticas
          para clientes estratégicos no Brasil.
        </p>
        <div className="mt-10 max-w-2xl">
          <Button href="#vagas">Ver Vagas Abertas</Button>
        </div>
      </PageIntro>

      <Container className="mt-16">
        <StatList>
          <StatListItem value="200+" label="Profissionais formados" />
          <StatListItem value="3 ×" label="Prêmio GPTW" />
          <StatListItem value="17 anos" label="Experiência TI (2008 → 2025)" />
        </StatList>
      </Container>

      <CultureSection />

      <Benefits />

      <Testimonials />

      <JobOpenings />

      <ContactSection />
    </RootLayout>
  )
}
