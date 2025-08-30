import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

try {
  const mdxShiki = {
    timestamp: new Date().toISOString(),
    nextConfig: null,
    shikiConfig: {
      hasShikijsRehype: false,
      hasCreateHighlighter: false,
      hasCssVariablesTheme: false,
      themeName: null,
      pipelineOrder: {
        hasRemark: false,
        hasRehype: false,
        hasRecma: false,
        order: []
      },
      plugins: {
        hasRehypeUnwrapImages: false,
        hasRemarkGfm: false,
        hasRemarkRehypeWrap: false
      }
    }
  };

  // Ler next.config.mjs
  try {
    const configPath = join(process.cwd(), 'next.config.mjs');
    const configContent = readFileSync(configPath, 'utf8');
    
    mdxShiki.nextConfig = {
      exists: true,
      size: configContent.length
    };

    // Verificar @shikijs/rehype
    mdxShiki.shikiConfig.hasShikijsRehype = configContent.includes('@shikijs/rehype');
    
    // Verificar createHighlighter
    mdxShiki.shikiConfig.hasCreateHighlighter = configContent.includes('createHighlighter');
    
    // Verificar createCssVariablesTheme
    const cssVarsMatch = configContent.match(/createCssVariablesTheme\s*\(\s*['"`]css-variables['"`]\s*\)/);
    mdxShiki.shikiConfig.hasCssVariablesTheme = !!cssVarsMatch;
    mdxShiki.shikiConfig.themeName = cssVarsMatch ? 'css-variables' : null;

    // Verificar ordem do pipeline
    const pipelineMatch = configContent.match(/remark.*rehype.*recma|rehype.*remark.*recma|recma.*remark.*rehype/);
    if (pipelineMatch) {
      const order = pipelineMatch[0];
      mdxShiki.shikiConfig.pipelineOrder.hasRemark = order.includes('remark');
      mdxShiki.shikiConfig.pipelineOrder.hasRehype = order.includes('rehype');
      mdxShiki.shikiConfig.pipelineOrder.hasRecma = order.includes('recma');
      mdxShiki.shikiConfig.pipelineOrder.order = order.split(/\s+/).filter(word => ['remark', 'rehype', 'recma'].includes(word));
    }

    // Verificar plugins específicos
    mdxShiki.shikiConfig.plugins.hasRehypeUnwrapImages = configContent.includes('rehype-unwrap-images');
    mdxShiki.shikiConfig.plugins.hasRemarkGfm = configContent.includes('remark-gfm');
    mdxShiki.shikiConfig.plugins.hasRemarkRehypeWrap = configContent.includes('remark-rehype-wrap');

  } catch (e) {
    mdxShiki.nextConfig = { error: e.message };
  }

  // Salvar relatório
  const reportPath = join(process.cwd(), 'reports', 'diag', 'next-mdx-shiki.json');
  writeFileSync(reportPath, JSON.stringify(mdxShiki, null, 2));
  console.log('✅ Next MDX/Shiki probe completed');
} catch (error) {
  const errorReport = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack
    }
  };
  const reportPath = join(process.cwd(), 'reports', 'diag', 'next-mdx-shiki.json');
  writeFileSync(reportPath, JSON.stringify(errorReport, null, 2));
  console.error('❌ Next MDX/Shiki probe failed:', error.message);
}
