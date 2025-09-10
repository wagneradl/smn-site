import fg from 'fast-glob'
import { readFileSync, writeFileSync } from 'fs'

const files = await fg(['src/**/*.{tsx,jsx}'], { dot: false })
let patched = 0
for (const f of files) {
  let s = readFileSync(f, 'utf8')
  if (!s.includes("from 'next/image'")) continue
  // adiciona sizes="100vw" somente se <Image ...> não tiver sizes
  const before = s
  s = s.replace(/<Image\b(?![^>]*\bsizes=)/g, '<Image sizes="100vw" ')
  if (s !== before) {
    writeFileSync(f, s)
    patched++
  }
}
console.log(`✅ image-sizes codemod: arquivos atualizados = ${patched}`)
