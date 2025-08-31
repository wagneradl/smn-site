/**
 * SMN Design System - Example Components
 * Demonstração dos tokens SMN integrados ao Tailwind v4
 */

import React from 'react'

export function SMNColorPalette() {
  return (
    <div className="space-y-6 p-8">
      <h2 className="font-display text-3xl font-bold text-primary-900">
        SMN Color Palette
      </h2>

      {/* Cores Primárias */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Primary Colors</h3>
        <div className="flex gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div
              key={shade}
              className={`h-12 w-12 bg-primary-${shade} rounded border`}
              title={`primary-${shade}`}
            />
          ))}
        </div>
      </div>

      {/* Cores de Destaque */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Accent Colors</h3>
        <div className="flex gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div
              key={shade}
              className={`h-12 w-12 bg-accent-${shade} rounded border`}
              title={`accent-${shade}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SMNTypography() {
  return (
    <div className="space-y-6 p-8">
      <h2 className="font-display text-3xl font-bold text-primary-900">
        SMN Typography
      </h2>

      <div className="space-y-4">
        <div className="font-display text-6xl font-bold text-primary-800">
          Display Font
        </div>
        <div className="font-body text-xl text-gray-700">
          Body text with SMN typography tokens
        </div>
        <div className="font-code rounded bg-gray-100 p-2 text-sm text-gray-600">
          Code font for technical content
        </div>
      </div>
    </div>
  )
}

export function SMNComponents() {
  return (
    <div className="space-y-6 p-8">
      <h2 className="font-display text-3xl font-bold text-primary-900">
        SMN Components
      </h2>

      {/* Botões SMN */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Buttons</h3>
        <div className="flex gap-4">
          <button className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700">
            Primary Button
          </button>
          <button className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-600">
            Accent Button
          </button>
          <button className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50">
            Secondary Button
          </button>
        </div>
      </div>

      {/* Cards SMN */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Cards</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <h4 className="mb-2 font-display text-xl font-bold text-primary-800">
              SMN Card
            </h4>
            <p className="font-body text-gray-600">
              Card component using SMN design tokens for consistent styling.
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 p-6 text-white">
            <h4 className="mb-2 font-display text-xl font-bold">
              Gradient Card
            </h4>
            <p className="font-body opacity-90">
              Card with SMN brand gradient background.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
