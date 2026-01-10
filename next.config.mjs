import createMDX from '@next/mdx'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import rehypeShiki from '@shikijs/rehype'
import { createHighlighter } from 'shiki'
import { createCssVariablesTheme } from 'shiki/core'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import * as path from 'path'
import { recmaImportImages } from 'recma-import-images'
import { unifiedConditional } from 'unified-conditional'
import bundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree) => {
    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      },
    )
  }
}

// Tema customizado inspirado no ChatGPT/Claude
const customTheme = {
  name: 'smn-dark',
  type: 'dark',
  colors: {
    'editor.background': '#1a1a1a',
    'editor.foreground': '#e6e6e6',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#6a9955',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: {
        foreground: '#569cd6',
        fontStyle: 'bold',
      },
    },
    {
      scope: ['string', 'string.quoted'],
      settings: {
        foreground: '#ce9178',
      },
    },
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: {
        foreground: '#b5cea8',
      },
    },
    {
      scope: ['variable', 'variable.other'],
      settings: {
        foreground: '#9cdcfe',
      },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: {
        foreground: '#dcdcaa',
      },
    },
    {
      scope: ['entity.name.type', 'support.type'],
      settings: {
        foreground: '#4ec9b0',
      },
    },
    {
      scope: ['entity.name.class', 'entity.name.interface'],
      settings: {
        foreground: '#4ec9b0',
        fontStyle: 'bold',
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#d4d4d4',
      },
    },
    {
      scope: ['meta.tag', 'entity.name.tag'],
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: ['string.quoted.double.yaml', 'string.quoted.single.yaml'],
      settings: {
        foreground: '#ce9178',
      },
    },
    {
      scope: ['entity.name.tag.yaml'],
      settings: {
        foreground: '#569cd6',
      },
    },
  ],
}

const highlighter = await createHighlighter({
  themes: [customTheme],
  langs: [
    'javascript',
    'typescript',
    'tsx',
    'jsx',
    'bash',
    'json',
    'md',
    'yaml',
    'dockerfile',
  ],
})

// Plugin MDX com ordem explícita (remark → rehype) + MDX Layout automático
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    recmaPlugins: [recmaImportImages],
    remarkPlugins: [
      remarkGfm,
      [
        unifiedConditional,
        [
          new RegExp(`^${escapeStringRegexp(path.resolve('src/app/blog'))}`),
          [[remarkMDXLayout, '@/app/blog/wrapper', 'article']],
        ],
        [
          new RegExp(`^${escapeStringRegexp(path.resolve('src/app/work'))}`),
          [[remarkMDXLayout, '@/app/work/wrapper', 'caseStudy']],
        ],
      ],
    ],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          highlighter,
          themes: {
            light: customTheme,
            dark: customTheme,
          },
        },
      ],
      rehypeUnwrapImages,
    ],
  },
})

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  productionBrowserSourceMaps: process.env.ENABLE_SOURCEMAPS === 'true',
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export async function headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'DENY' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/fonts/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ]
}

export default withBundleAnalyzer(withMDX(nextConfig))
