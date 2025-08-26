import fs from 'node:fs';
function safeRead(p){ try{ return fs.readFileSync(p,'utf8')}catch{ return ''}}
const tw = safeRead('src/styles/tailwind.css');
const base = safeRead('src/styles/base.css');
const postcss = safeRead('postcss.config.js');

const importsOk = /^@import 'tailwindcss';\s*@import '.\/base.css';\s*@import '.\/typography.css' layer\(components\);/m.test(tw);
const hasTheme = /@theme\s*{[\s\S]*}/m.test(tw);

const baseHasLinks = /@layer\s+base\s*{[\s\S]*a\s*{[\s\S]*}/m.test(base);
const baseAccentsOnHover = /a:hover\s*{\s*color:\s*var\(--color-accent-/.test(base);
const dataButtonGuard = /a\[data-button\]/.test(base);

const out = {
  v4_detected: postcss.includes("@tailwindcss/postcss"),
  imports_top_ok: importsOk,
  theme_block_present: hasTheme,
  base_links_block: baseHasLinks,
  base_hover_accent: baseAccentsOnHover,
  data_button_guard: dataButtonGuard
};
import fs2 from 'node:fs';
fs2.writeFileSync('reports/tailwind-postcss.json', JSON.stringify(out, null, 2));
console.log('reports/tailwind-postcss.json');
