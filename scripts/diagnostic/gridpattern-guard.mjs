import fs from 'node:fs';
let ok=false;
try{
  const gp = fs.readFileSync('src/components/GridPattern.tsx','utf8');
  ok = /<svg[^>]*data-gridpattern/.test(gp);
}catch{}
const out = { svg_guard_present: ok };
fs.writeFileSync('reports/gridpattern-guard.json', JSON.stringify(out,null,2));
console.log('reports/gridpattern-guard.json');
