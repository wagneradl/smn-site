// scripts/css-brace-sanity.mjs
import fs from 'node:fs'
import glob from 'fast-glob'

const files = await glob(['src/styles/**/*.css'])
let ok = true

for (const f of files) {
  const css = fs.readFileSync(f, 'utf8')
  let stack = 0,
    line = 1
  for (const ch of css) {
    if (ch === '{') stack++
    if (ch === '}') stack--
    if (ch === '\n') line++
    if (stack < 0) {
      console.log(`[BRACES] Extra '}' em ${f}:${line}`)
      ok = false
      break
    }
  }
  if (stack > 0) {
    console.log(`[BRACES] Faltou '}' em ${f} (saldo: ${stack})`)
    ok = false
  }
}
console.log(ok ? '[BRACES] OK' : '[BRACES] PROBLEMAS DETECTADOS')
