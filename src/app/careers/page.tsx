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
import { CareersForm } from '@/components/CareersForm'
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
    <div className="mt-24 rounded-4xl bg-primary-800 py-24 sm:mt-32 lg:mt-40 lg:py-32">
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
                          &ldquo;
                        </span>
                        {testimonial.quote}
                        <span className="text-4xl text-neutral-300">
                          &rdquo;
                        </span>
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
      <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 lg:items-start">
        <FadeIn>
          <div className="space-y-16">
            {/* Seção Principal */}
            <div>
              <h2 className="font-display text-3xl font-medium text-neutral-950 sm:text-4xl">
                Junte-se a nós
              </h2>
              <div className="mt-6 space-y-6 text-lg text-neutral-600">
                <p>
                  Estamos sempre em busca de profissionais talentosos e apaixonados
                  por tecnologia que queiram crescer junto conosco.
                </p>
              </div>
            </div>

            {/* Seção de Escritórios */}
            <div className="border-t border-neutral-200 pt-16">
              <h3 className="font-display text-base font-semibold text-neutral-950">
                Nossos escritórios
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-neutral-950">Sede — João Pessoa (PB)</h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    Rua Dep. Geraldo Mariz, 291A<br />
                    Tambauzinho, João Pessoa – PB
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-950">Ingá (PB)</h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    Sítio Hotel Cruzeiro, s/n<br />
                    Zona Rural, BR-230 – Ingá – PB
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-950">Franca (SP)</h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    R. dos Pracinhas, 1720<br />
                    Núcleo Agrícola Alpha, Franca – SP
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-950">Passos (MG)</h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    R. Noruega, 274<br />
                    Novo Mundo, Passos – MG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Formulário */}
        <FadeIn>
          <div className="rounded-4xl bg-gradient-to-br from-primary-800 to-primary-900 p-8 sm:p-12">
            <CareersForm />
          </div>
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
    </RootLayout>
  )
}
