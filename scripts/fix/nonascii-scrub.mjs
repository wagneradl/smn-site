import fs from 'node:fs';
import fg from 'fast-glob';

const files = await fg(['src/styles/**/*.{css}']);
const repl = s => s
  .replace(/\uFEFF/g, '')   // BOM
  .replace(/\u00A0/g, ' ')  // NBSP
  .replace(/\u200B/g, '');  // ZWSP

for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  const after = repl(before);
  if (before !== after) {
    fs.writeFileSync(f, after);
    console.log('cleaned:', f);
  }
}
