import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const read = (p) => {
  try {
    return readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}

try {
  const out = {
    timestamp: new Date().toISOString(),
    nextConfig: { exists: false, size: 0 },
    shikiConfig: {
      hasShikijsRehype: false,
      hasCreateHighlighter: false,
      hasCssVariablesTheme: false,
      themeName: null,
      pipelineOrder: {
        hasRemark: false,
        hasRehype: false,
        hasRecma: false,
        order: [],
      },
      plugins: {
        hasRehypeUnwrapImages: false,
        hasRemarkGfm: false,
        hasRemarkRehypeWrap: false,
      },
    },
  }

  const cfgPath = join(process.cwd(), 'next.config.mjs')
  const src = read(cfgPath)
  out.nextConfig.exists = !!src
  out.nextConfig.size = src.length

  out.shikiConfig.hasShikijsRehype = /\@shikijs\/rehype/.test(src)
  out.shikiConfig.hasCreateHighlighter = /createHighlighter\s*\(/.test(src)

  const cssVars =
    /createCssVariablesTheme\s*\(\s*{[^}]*name\s*:\s*['"]css-variables['"]/s.exec(
      src,
    )
  out.shikiConfig.hasCssVariablesTheme = !!cssVars
  out.shikiConfig.themeName = cssVars ? 'css-variables' : null

  out.shikiConfig.plugins.hasRehypeUnwrapImages = /rehype-unwrap-images/.test(
    src,
  )
  out.shikiConfig.plugins.hasRemarkGfm = /remark-gfm/.test(src)
  out.shikiConfig.plugins.hasRemarkRehypeWrap = /remark-rehype-wrap/.test(src)

  const hasRemark = /remarkPlugins\s*:\s*\[/.test(src)
  const hasRehype = /rehypePlugins\s*:\s*\[/.test(src)
  out.shikiConfig.pipelineOrder.hasRemark = hasRemark
  out.shikiConfig.pipelineOrder.hasRehype = hasRehype
  if (hasRemark && hasRehype)
    out.shikiConfig.pipelineOrder.order = ['remark', 'rehype']

  writeFileSync(
    join(process.cwd(), 'reports', 'diag', 'next-mdx-shiki.json'),
    JSON.stringify(out, null, 2),
  )
  console.log('✅ Next MDX/Shiki probe (robusto) concluído')
} catch (error) {
  writeFileSync(
    join(process.cwd(), 'reports', 'diag', 'next-mdx-shiki.json'),
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        error: { message: error.message, stack: error.stack },
      },
      null,
      2,
    ),
  )
  console.error('❌ Next MDX/Shiki probe failed:', error.message)
}
