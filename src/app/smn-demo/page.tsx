/**
 * SMN Design System - Demo Page
 * Demonstração visual da integração SMN com Tailwind Studio Pro
 */

import React from 'react';
import { SMNColorPalette, SMNTypography, SMNComponents } from '../../components/smn-examples';

export default function SMNDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header SMN */}
      <header className="bg-gradient-to-r from-primary-600 to-accent-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-display text-6xl font-bold mb-4">
            SMN Design System
          </h1>
          <p className="font-body text-xl opacity-90 max-w-2xl mx-auto">
            Integração completa dos tokens SMN com Tailwind Studio Pro. 
            Demonstração das cores, tipografia e componentes da marca SMN.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 py-4">
            <a href="#colors" className="text-primary-600 hover:text-primary-800 font-semibold">
              Colors
            </a>
            <a href="#typography" className="text-primary-600 hover:text-primary-800 font-semibold">
              Typography
            </a>
            <a href="#components" className="text-primary-600 hover:text-primary-800 font-semibold">
              Components
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto">
        {/* Status da Integração */}
        <section className="px-6 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-primary-800">
                  Integração SMN Ativa
                </h2>
                <p className="text-gray-600 font-body">
                  39 variáveis de design SMN integradas com sucesso ao Tailwind CSS v4
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 mb-2">39</div>
                <div className="text-sm text-primary-800 font-semibold">Variáveis CSS</div>
              </div>
              <div className="text-center p-4 bg-accent-50 rounded-lg">
                <div className="text-2xl font-bold text-accent-600 mb-2">8</div>
                <div className="text-sm text-accent-800 font-semibold">Paletas de Cores</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600 mb-2">5</div>
                <div className="text-sm text-gray-800 font-semibold">Famílias Tipográficas</div>
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
        <section className="px-6 py-12 border-t">
          <h2 className="text-3xl font-display font-bold text-primary-900 mb-8 text-center">
            Comparação: Antes vs Depois
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Antes */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Template Original</h3>
              <div className="bg-neutral-950 text-white p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Neutral Colors</h4>
                <p className="text-neutral-300">
                  Template usando cores neutras padrão do Tailwind
                </p>
                <button className="mt-4 px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600">
                  Botão Original
                </button>
              </div>
            </div>

            {/* Depois */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary-800">Com SMN Design System</h3>
              <div className="bg-gradient-to-br from-primary-600 to-accent-500 text-white p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-2 font-display">SMN Branding</h4>
                <p className="opacity-90 font-body">
                  Template customizado com a identidade visual SMN
                </p>
                <button className="mt-4 px-4 py-2 bg-white text-primary-600 rounded hover:bg-gray-100 font-semibold">
                  Botão SMN
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Instruções de Uso */}
        <section className="px-6 py-12 bg-gray-50 border-t">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-primary-900 mb-8 text-center">
              Como Usar os Tokens SMN
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-primary-800 mb-4">Cores</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div><span className="text-gray-500">bg-primary-600</span> - Cor primária</div>
                  <div><span className="text-gray-500">bg-accent-500</span> - Cor de destaque</div>
                  <div><span className="text-gray-500">text-primary-800</span> - Texto primário</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-primary-800 mb-4">Tipografia</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div><span className="text-gray-500">font-display</span> - Títulos</div>
                  <div><span className="text-gray-500">font-body</span> - Texto corpo</div>
                  <div><span className="text-gray-500">font-code</span> - Código</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="font-display text-2xl font-bold mb-4">SMN Design System</h3>
          <p className="font-body opacity-80 mb-6">
            Sistema de design integrado com Tailwind Studio Pro
          </p>
          <div className="flex justify-center gap-4">
            <span className="px-3 py-1 bg-primary-700 rounded-full text-sm">39 Variables</span>
            <span className="px-3 py-1 bg-accent-600 rounded-full text-sm">Tailwind v4</span>
            <span className="px-3 py-1 bg-primary-700 rounded-full text-sm">TypeScript</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
