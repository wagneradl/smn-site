import fs from 'node:fs';
const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
const out = {
  name: pkg.name, version: pkg.version,
  scripts: pkg.scripts,
  engines: pkg.engines ?? null,
  declared: {
    dependencies: pkg.dependencies ?? {},
    devDependencies: pkg.devDependencies ?? {}
  }
};
fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/pkg-summary.json', JSON.stringify(out, null, 2));
console.log('reports/pkg-summary.json');
