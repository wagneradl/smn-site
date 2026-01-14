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
import imageJaquelineMara from '@/images/team/jaqueline-mara.jpg'
import imageRafaelMorais from '@/images/team/rafael-morais.jpg'
import imageMoisesWarlen from '@/images/team/moises-warlen.jpg'
import imageMariaAndressa from '@/images/team/maria-andressa.jpg'
import imageGustavoSousa from '@/images/team/gustavo-sousa.jpg'
import imageDouglasMata from '@/images/team/douglas-mata.jpg'
import imageMariaLuiza from '@/images/team/maria-luiza.jpg'
import imageYagoSilva from '@/images/team/yago-silva.jpg'
import { RootLayout } from '@/components/RootLayout'

export const metadata: Metadata = {
  title: 'Oportunidades na SMN',
  description:
    'Faça parte de uma fábrica de software que atua em missões críticas para clientes estratégicos no Brasil.',
}

const testimonials = [
  {
    quote:
      'Entrei como estagiária e encontrei um lugar que me transformou. Evoluí, amadureci e sou grata por crescer em um time leve e humano.',
    author: {
      name: 'Jaqueline Mara',
      role: 'Analista de Negócios',
    },
    image: { src: imageJaquelineMara },
  },
  {
    quote:
      'A SMN acreditou em mim e investiu na minha formação. Evoluímos juntos, com foco em parceria e no sucesso dos nossos clientes.',
    author: {
      name: 'Rafael Morais',
      role: 'Desenvolvedor',
    },
    image: { src: imageRafaelMorais },
  },
  {
    quote:
      'Na SMN, desafio é combustível. Aprendizados viram conquistas e constroem, comigo, uma trajetória de vitórias.',
    author: {
      name: 'Moises Warlen',
      role: 'DevOps',
    },
    image: { src: imageMoisesWarlen },
  },
  {
    quote:
      'Entrei há 7 anos pelo programa de formação e me encontrei na análise de negócios, onde sigo me aperfeiçoando até hoje.',
    author: {
      name: 'Maria Andressa',
      role: 'Analista de Negócios',
    },
    image: { src: imageMariaAndressa },
  },
  {
    quote:
      'Na SMN, cresço como desenvolvedor em um time que acolhe, ensina e evolui junto. Aqui, cada desafio é uma oportunidade real de aprendizado.',
    author: {
      name: 'Gustavo Sousa',
      role: 'Desenvolvedor',
    },
    image: { src: imageGustavoSousa },
  },
  {
    quote:
      'Entrei como estagiário em 2017 e hoje sou gerente de projetos. Orgulho de crescer em uma empresa que valoriza e desenvolve pessoas.',
    author: {
      name: 'Douglas da Mata',
      role: 'Gerente de Projetos',
    },
    image: { src: imageDouglasMata },
  },
  {
    quote:
      'Na SMN, tenho diariamente oportunidades reais de aprendizado e crescimento profissional e pessoal.',
    author: {
      name: 'Maria Luiza',
      role: 'Analista de Negócios',
    },
    image: { src: imageMariaLuiza },
  },
  {
    quote:
      'Um ótimo lugar para crescer, com incentivos ao aprendizado e profissionais dispostos a ensinar e compartilhar conhecimento.',
    author: {
      name: 'Yago Silva',
      role: 'Desenvolvedor',
    },
    image: { src: imageYagoSilva },
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
                  <div className="order-2 sm:order-1 sm:col-span-4 lg:col-span-3">
                    <div className="flex flex-col gap-6 text-left">
                      <div className="max-w-[200px] overflow-hidden rounded-2xl bg-neutral-100 sm:max-w-none">
                        <Image
                          alt={`${testimonial.author.name}, ${testimonial.author.role}`}
                          {...testimonial.image}
                          className="aspect-square w-full object-cover grayscale transition duration-300 hover:grayscale-0"
                          priority={index === 0}
                          quality={90}
                          sizes="(min-width: 1024px) 17.625rem, (min-width: 768px) 16rem, 200px"
                        />
                      </div>
                      <figcaption className="text-base text-neutral-950">
                        <span className="font-semibold">
                          {testimonial.author.name}
                        </span>
                        <span className="text-neutral-600">
                          , {testimonial.author.role}
                        </span>
                      </figcaption>
                    </div>
                  </div>
                  <div className="order-1 sm:order-2 sm:col-span-8 lg:col-span-9">
                    <blockquote className="text-xl/7 text-neutral-600 sm:text-2xl/8">
                      <p className="relative">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-2 -left-4 text-4xl text-neutral-300"
                        >
                          &ldquo;
                        </span>
                        {testimonial.quote}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none relative ml-1 inline text-4xl text-neutral-300"
                          style={{ lineHeight: 0 }}
                        >
                          &rdquo;
                        </span>
                      </p>
                    </blockquote>
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
                  Estamos sempre em busca de profissionais talentosos e
                  apaixonados por tecnologia que queiram crescer junto conosco.
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
                  <h4 className="font-semibold text-neutral-950">
                    João Pessoa (PB)
                  </h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    Rua Dep. Geraldo Mariz, 291A
                    <br />
                    Tambauzinho, João Pessoa – PB
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-950">Ingá (PB)</h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    Sítio Hotel Cruzeiro, s/n
                    <br />
                    Zona Rural, BR-230 – Ingá – PB
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-950">
                    Franca (SP)
                  </h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    R. dos Pracinhas, 1720
                    <br />
                    Núcleo Agrícola Alpha, Franca – SP
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-950">
                    Passos (MG)
                  </h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    Av. Arouca, 660, Sala 911
                    <br />
                    Centro, Passos – MG
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
      <PageIntro eyebrow="Oportunidades" title="Oportunidades na SMN">
        <p>
          Faça parte de uma fábrica de software que atua em missões críticas
          para clientes estratégicos no Brasil.
        </p>
      </PageIntro>

      <Container className="mt-16">
        <StatList>
          <StatListItem value="500+" label="Profissionais formados" />
          <StatListItem value="3 ×" label="Prêmio GPTW" />
          <StatListItem value="20+" label="Anos de experiência" />
        </StatList>
      </Container>

      <CultureSection />
      <Benefits />
      <Testimonials />
      <JobOpenings />
    </RootLayout>
  )
}
