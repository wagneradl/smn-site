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

  // Executar ESLint
  try {
    const eslintOutput = execSync('npm run lint', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    quality.eslint = {
      success: true,
      output: eslintOutput,
      issues: 0
    };
  } catch (e) {
    quality.eslint = {
      success: false,
      output: e.stdout?.toString() || e.stderr?.toString() || e.message,
      issues: 0
    };
    
    // Tentar extrair número de issues do output
    const output = quality.eslint.output;
    const issueMatches = output.match(/(\d+)\s+problems?/i);
    if (issueMatches) {
      quality.eslint.issues = parseInt(issueMatches[1]);
      quality.summary.totalIssues += quality.eslint.issues;
    }
  }

  // Executar TypeScript check
  try {
    const typecheckOutput = execSync('npx tsc --noEmit', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    quality.typecheck = {
      success: true,
      output: typecheckOutput,
      issues: 0
    };
  } catch (e) {
    quality.typecheck = {
      success: false,
      output: e.stdout?.toString() || e.stderr?.toString() || e.message,
      issues: 0
    };
    
    // Tentar extrair número de issues do output
    const output = quality.typecheck.output;
    const errorMatches = output.match(/(\d+)\s+errors?/i);
    if (errorMatches) {
      quality.typecheck.issues = parseInt(errorMatches[1]);
      quality.summary.totalIssues += quality.typecheck.issues;
      quality.summary.criticalIssues += quality.typecheck.issues;
    }
  }

  // Verificar Prettier
  try {
    const prettierOutput = execSync('npx prettier --check "**/*.{ts,tsx,css,md,mdx,json}"', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    quality.prettier = {
      success: true,
      output: prettierOutput,
      issues: 0
    };
  } catch (e) {
    quality.prettier = {
      success: false,
      output: e.stdout?.toString() || e.stderr?.toString() || e.message,
      issues: 0
    };
    
    // Tentar extrair número de arquivos com problemas
    const output = quality.prettier.output;
    const fileMatches = output.match(/(\d+)\s+files?/i);
    if (fileMatches) {
      quality.prettier.issues = parseInt(fileMatches[1]);
      quality.summary.totalIssues += quality.prettier.issues;
      quality.summary.warnings += quality.prettier.issues;
    }
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
