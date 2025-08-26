import fs from 'node:fs';
const src = fs.readFileSync('next.config.mjs','utf8');
const hasLeafac = src.includes("@leafac/rehype-shiki");
const hasShikijs = src.includes("@shikijs/rehype");
const usesCreateHighlighter = /createHighlighter\s*\(/.test(src);
const usesCssVarsTheme = /createCssVariablesTheme\s*\(/.test(src);
const themeCssVars = /name:\s*['"]css-variables['"]/.test(src);
const rehypeOrder = [];
if (/@next\/mdx/.test(src)) rehypeOrder.push('next-mdx');
if (hasLeafac) rehypeOrder.push('@leafac/rehype-shiki');
if (hasShikijs) rehypeOrder.push('@shikijs/rehype');
if (/rehype-unwrap-images/.test(src)) rehypeOrder.push('rehype-unwrap-images');
if (/remark-rehype-wrap/.test(src)) rehypeOrder.push('remark-rehype-wrap');

const out = {
  leafac_present: hasLeafac,
  shikijs_present: hasShikijs,
  createHighlighter: usesCreateHighlighter,
  createCssVariablesTheme: usesCssVarsTheme,
  css_variables_theme_named: themeCssVars,
  rehype_order_detected: rehypeOrder
};
fs.writeFileSync('reports/next-mdx-highlight.json', JSON.stringify(out, null, 2));
console.log('reports/next-mdx-highlight.json');
