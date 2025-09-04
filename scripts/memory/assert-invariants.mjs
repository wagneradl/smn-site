// scripts/memory/assert-invariants.mjs
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
const P = (p) => resolve(process.cwd(), p);

const graphPath = P("reports/memory/graph.json");
const errors = [];
const warns = [];

function die() {
  const ok = errors.length === 0;
  console.log(`\n${ok ? "✅" : "❌"} Invariants ${ok ? "OK" : "FALHARAM"}\n`);
  if (warns.length) {
    console.log("⚠️  Avisos:");
    for (const w of warns) console.log(" - "+w);
    console.log("");
  }
  if (!ok) {
    console.log("Motivos:");
    for (const e of errors) console.log(" - "+e);
    console.log("\nDica: rode antes:");
    console.log("  npm run diag:all && npm run qa:seo && npm run mem:graph");
    process.exit(1);
  }
}

if (!existsSync(graphPath)) {
  errors.push("reports/memory/graph.json ausente — rode npm run mem:graph.");
  die();
}

let graph = null;
try { graph = JSON.parse(readFileSync(graphPath, "utf8")); }
catch (e) {
  errors.push("Falha ao ler graph.json: " + e.message);
  die();
}

const mustPass = graph.invariants || [];
for (const inv of mustPass) {
  if (inv.status !== "pass") {
    errors.push(`${inv.domain} — ${inv.desc} [${inv.status}] (evidence: ${inv.evidence})`);
  }
}

die();
