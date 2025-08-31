'use client'

export default function SkipLink() {
  return (
    <a
      href="#main"
      className="skip-link"
      aria-label="Pular para o conteúdo principal"
      data-skip-link
    >
      Pular para o conteúdo
    </a>
  )
}
