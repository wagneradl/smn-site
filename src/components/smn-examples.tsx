/**
 * SMN Design System - Example Components
 * Demonstração dos tokens SMN integrados ao Tailwind v4
 */

import React from 'react';

export function SMNColorPalette() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-display font-bold text-primary-900">
        SMN Color Palette
      </h2>
      
      {/* Cores Primárias */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Primary Colors</h3>
        <div className="flex gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
            <div
              key={shade}
              className={`w-12 h-12 bg-primary-${shade} rounded border`}
              title={`primary-${shade}`}
            />
          ))}
        </div>
      </div>

      {/* Cores de Destaque */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Accent Colors</h3>
        <div className="flex gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
            <div
              key={shade}
              className={`w-12 h-12 bg-accent-${shade} rounded border`}
              title={`accent-${shade}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SMNTypography() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-display font-bold text-primary-900">
        SMN Typography
      </h2>
      
      <div className="space-y-4">
        <div className="font-display text-6xl font-bold text-primary-800">
          Display Font
        </div>
        <div className="font-body text-xl text-gray-700">
          Body text with SMN typography tokens
        </div>
        <div className="font-code text-sm text-gray-600 bg-gray-100 p-2 rounded">
          Code font for technical content
        </div>
      </div>
    </div>
  );
}

export function SMNComponents() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-display font-bold text-primary-900">
        SMN Components
      </h2>
      
      {/* Botões SMN */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Buttons</h3>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold">
            Primary Button
          </button>
          <button className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors font-semibold">
            Accent Button
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Secondary Button
          </button>
        </div>
      </div>

      {/* Cards SMN */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h4 className="font-display text-xl font-bold text-primary-800 mb-2">
              SMN Card
            </h4>
            <p className="text-gray-600 font-body">
              Card component using SMN design tokens for consistent styling.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-6 rounded-xl text-white">
            <h4 className="font-display text-xl font-bold mb-2">
              Gradient Card
            </h4>
            <p className="font-body opacity-90">
              Card with SMN brand gradient background.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
