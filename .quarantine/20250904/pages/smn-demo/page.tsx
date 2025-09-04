/**
 * SMN Design System - Demo Page
 * Demonstração visual da integração SMN com Tailwind Studio Pro
 */

import React from 'react'
import {
  SMNColorPalette,
  SMNTypography,
  SMNComponents,
} from '../../components/smn-examples'

export default function SMNDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header SMN */}
      <header className="bg-gradient-to-r from-primary-600 to-accent-500 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="mb-4 font-display text-6xl font-bold">
            SMN Design System
          </h1>
          <p className="font-body mx-auto max-w-2xl text-xl opacity-90">
            Integração completa dos tokens SMN com Tailwind Studio Pro.
            Demonstração das cores, tipografia e componentes da marca SMN.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex space-x-8 py-4">
            <a
              href="#colors"
              className="font-semibold text-primary-600 hover:text-primary-800"
            >
              Cores
            </a>
            <a
              href="#typography"
              className="font-semibold text-primary-600 hover:text-primary-800"
            >
              Tipografia
            </a>
            <a
              href="#components"
              className="font-semibold text-primary-600 hover:text-primary-800"
            >
              Componentes
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-7xl">
        {/* Status da Integração */}
        <section className="px-6 py-12">
          <div className="mb-12 rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-primary-800">
                  Integração SMN Ativa
                </h2>
                <p className="font-body text-gray-600">
                  39 variáveis de design SMN integradas com sucesso ao Tailwind
                  CSS v4
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-primary-50 p-4 text-center">
                <div className="mb-2 text-2xl font-bold text-primary-600">
                  39
                </div>
                <div className="text-sm font-semibold text-primary-800">
                  Variáveis CSS
                </div>
              </div>
              <div className="rounded-lg bg-accent-50 p-4 text-center">
                <div className="mb-2 text-2xl font-bold text-accent-600">8</div>
                <div className="text-sm font-semibold text-accent-800">
                  Paletas de Cores
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="mb-2 text-2xl font-bold text-gray-600">5</div>
                <div className="text-sm font-semibold text-gray-800">
                  Famílias Tipográficas
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demonstrações */}
        <section id="colors">
          <SMNColorPalette />
        </section>

        <section id="typography" className="border-t">
          <SMNTypography />
        </section>

        <section id="components" className="border-t">
          <SMNComponents />
        </section>

        {/* Comparação Antes/Depois */}
        <section className="border-t px-6 py-12">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-primary-900">
            Comparativo: Antes e Depois
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Antes */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Template Original
              </h3>
              <div className="rounded-lg bg-neutral-950 p-6 text-white">
                <h4 className="mb-2 text-lg font-bold">Cores Neutras</h4>
                <p className="text-neutral-300">
                  Template usando cores neutras padrão do Tailwind
                </p>
                <button className="mt-4 rounded bg-neutral-700 px-4 py-2 text-white hover:bg-neutral-600">
                  Botão Original
                </button>
              </div>
            </div>

            {/* Depois */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary-800">
                Com SMN Design System
              </h3>
              <div className="rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 p-6 text-white">
                <h4 className="mb-2 font-display text-lg font-bold">
                  Identidade SMN
                </h4>
                <p className="font-body opacity-90">
                  Template customizado com a identidade visual SMN
                </p>
                <button className="mt-4 rounded bg-white px-4 py-2 font-semibold text-primary-600 hover:bg-gray-100">
                  Botão SMN
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Instruções de Uso */}
        <section className="border-t bg-gray-50 px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-display text-3xl font-bold text-primary-900">
              Como usar os tokens SMN
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-primary-800">
                  Cores
                </h3>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-gray-500">bg-primary-600</span> - Cor
                    primária
                  </div>
                  <div>
                    <span className="text-gray-500">bg-accent-500</span> - Cor
                    de destaque
                  </div>
                  <div>
                    <span className="text-gray-500">text-primary-800</span> -
                    Texto primário
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-primary-800">
                  Tipografia
                </h3>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-gray-500">font-display</span> -
                    Títulos
                  </div>
                  <div>
                    <span className="text-gray-500">font-body</span> - Texto
                    corpo
                  </div>
                  <div>
                    <span className="text-gray-500">font-code</span> - Código
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-primary-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="mb-4 font-display text-2xl font-bold">
            SMN Design System
          </h3>
          <p className="font-body mb-6 opacity-80">
            Sistema de design integrado com Tailwind Studio Pro
          </p>
          <div className="flex justify-center gap-4">
            <span className="rounded-full bg-primary-700 px-3 py-1 text-sm">
              39 Variáveis
            </span>
            <span className="rounded-full bg-accent-600 px-3 py-1 text-sm">
              Tailwind v4
            </span>
            <span className="rounded-full bg-primary-700 px-3 py-1 text-sm">
              TypeScript
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
