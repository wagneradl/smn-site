import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

try {
  const quality = {
    timestamp: new Date().toISOString(),
    eslint: null,
    typecheck: null,
    prettier: null,
    summary: {
      totalIssues: 0,
      criticalIssues: 0,
      warnings: 0
    }
  };

  // Função helper para executar comandos
  const run = (cmd) => {
    try { 
      return { ok: true, out: execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }) } 
    } catch (e) { 
      return { 
        ok: false, 
        out: e.stdout?.toString() || '', 
        err: e.stderr?.toString() || '',
        message: e.message 
      } 
    }
  }

  // Executar ESLint
  const eslintResult = run('next lint || true');
  quality.eslint = {
    success: eslintResult.ok,
    output: eslintResult.out,
    error: eslintResult.err,
    issues: 0
  };
  
  // Tentar extrair número de issues do output
  const output = quality.eslint.output;
  const issueMatches = output.match(/(\d+)\s+problems?/i);
  if (issueMatches) {
    quality.eslint.issues = parseInt(issueMatches[1]);
    quality.summary.totalIssues += quality.eslint.issues;
  }

  // Executar TypeScript check
  const typecheckResult = run('npx tsc --noEmit');
  quality.typecheck = {
    success: typecheckResult.ok,
    output: typecheckResult.out,
    error: typecheckResult.err,
    issues: 0
  };
  
  // Tentar extrair número de issues do output
  const typecheckOutput = quality.typecheck.output;
  const errorMatches = typecheckOutput.match(/(\d+)\s+errors?/i);
  if (errorMatches) {
    quality.typecheck.issues = parseInt(errorMatches[1]);
    quality.summary.totalIssues += quality.typecheck.issues;
    quality.summary.criticalIssues += quality.typecheck.issues;
  }

  // Verificar Prettier
  const prettierResult = run('npx prettier --check "**/*.{ts,tsx,js,jsx,css,md,mdx,json}"');
  quality.prettier = {
    success: prettierResult.ok,
    output: prettierResult.out,
    error: prettierResult.err,
    issues: 0
  };
  
  // Tentar extrair número de arquivos com problemas
  const prettierOutput = quality.prettier.output;
  const fileMatches = prettierOutput.match(/(\d+)\s+files?/i);
  if (fileMatches) {
    quality.prettier.issues = parseInt(fileMatches[1]);
    quality.summary.totalIssues += quality.prettier.issues;
    quality.summary.warnings += quality.prettier.issues;
  }

  // Salvar relatório
  const reportPath = join(process.cwd(), 'reports', 'diag', 'quality.json');
  writeFileSync(reportPath, JSON.stringify(quality, null, 2));
  console.log('✅ Code quality check completed');
} catch (error) {
  const errorReport = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack
    }
  };
  const reportPath = join(process.cwd(), 'reports', 'diag', 'quality.json');
  writeFileSync(reportPath, JSON.stringify(errorReport, null, 2));
  console.error('❌ Code quality check failed:', error.message);
}
