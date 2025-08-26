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
import { loadArticles } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Nossa cultura"
        title="Gente, ética e cooperação acima de tudo"
        invert
      >
        <p>
          Investimos pesado em conhecimento, mas acreditamos que o companheirismo vale ainda mais.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Inovação" invert>
            Busca incessante por soluções criativas e tecnológicas.
          </GridListItem>
          <GridListItem title="Colaboração" invert>
            Parcerias estratégicas e trabalho em equipe constante.
          </GridListItem>
          <GridListItem title="Educação" invert>
            Formação holística que alia técnica, ética e liderança.
          </GridListItem>
          <GridListItem title="Responsabilidade" invert>
            Inclusão e impacto social positivo na tecnologia.
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
        role: 'Founder & CEO',
        image: { src: imageLeslieAlexander }, // Substitua pela imagem real se disponível
      },
      {
        name: 'Marcos Mandara',
        role: 'CTO & Partner',
        image: { src: imageMichaelFoster }, // Substitua pela imagem real se disponível
      },
      {
        name: 'Lilian Gomes',
        role: 'Head de BI',
        image: { src: imageDriesVincent }, // Substitua pela imagem real se disponível
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

export const metadata: Metadata = {
  title: 'Sobre Nós – SMN Tecnologia',
  description:
    'Colocamos clientes e talentos no centro, cultivando cooperação e excelência técnica.',
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <RootLayout>
      <PageIntro eyebrow="Sobre nós" title="Nossa força é a colaboração">
        <p>
          Colocamos clientes e talentos no centro, cultivando cooperação e excelência técnica.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Fundada por Ricardo Corrales em 2008, a SMN surgiu da Sul Minas Net e evoluiu para uma fábrica de software referência em squads de alta performance.
          </p>
          <p>
            Nosso Programa de Formação prepara jovens talentos em tecnologia desde o primeiro estágio, reforçando cultura, ética e conhecimento compartilhado.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="200+" label="Profissionais formados" />
          <StatListItem value="3 ×" label="Prêmio GPTW" />
          <StatListItem value="17 anos" label="Experiência TI (2008 → 2025)" />
        </StatList>
      </Container>

      <Culture />

      <Team />

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
