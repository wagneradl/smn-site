import fs from 'node:fs';
import glob from 'fast-glob';
const files = await glob(['src/styles/**/*.css']);
const res = { issues: [] };
for (const f of files) {
  const css = fs.readFileSync(f,'utf8');
  let stack=0,line=1;
  for (const ch of css) {
    if (ch==='{') stack++; if (ch==='}') stack--; if (ch==='\n') line++;
    if (stack<0){ res.issues.push({file:f, msg:"extra '}'", line}); break; }
  }
  if (stack>0){ res.issues.push({file:f, msg:"missing '}'", balance: stack}); }
  if (/[^\x09\x0A\x0D\x20-\x7E]/.test(css)) res.issues.push({file:f, msg:'non-ascii-characters'});
}
fs.mkdirSync('reports',{recursive:true});
fs.writeFileSync('reports/css-brace-sanity.json', JSON.stringify(res,null,2));
console.log('reports/css-brace-sanity.json');
