import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

try {
  const build = {
    timestamp: new Date().toISOString(),
    duration: null,
    pages: {
      static: 0,
      dynamic: 0,
      total: 0
    },
    metrics: {
      firstLoadJS: null,
      totalJS: null
    },
    warnings: [],
    errors: [],
    hasMissingOpeningBrace: false
  };

  const startTime = Date.now();

  try {
    const buildOutput = execSync('npm run build', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 300000 // 5 minutos
    });

    const endTime = Date.now();
    build.duration = endTime - startTime;

    // Analisar output do build
    const output = buildOutput;

    // Verificar "Missing opening {"
    build.hasMissingOpeningBrace = output.includes('Missing opening {');

    // Extrair métricas de páginas
    const pageMatches = output.match(/(\d+)\s+pages?/i);
    if (pageMatches) {
      build.pages.total = parseInt(pageMatches[1]);
    }

    // Extrair First Load JS
    const firstLoadMatch = output.match(/First Load JS shared by all:\s*([\d.]+)\s*([KM]B)/i);
    if (firstLoadMatch) {
      build.metrics.firstLoadJS = `${firstLoadMatch[1]} ${firstLoadMatch[2]}`;
    }

    // Extrair warnings
    const warningLines = output.split('\n').filter(line => 
      line.includes('Warning:') || 
      line.includes('warn') ||
      line.toLowerCase().includes('warning')
    );
    build.warnings = warningLines.slice(0, 10); // Primeiros 10 warnings

    // Extrair erros
    const errorLines = output.split('\n').filter(line => 
      line.includes('Error:') || 
      line.includes('error') ||
      line.toLowerCase().includes('failed')
    );
    build.errors = errorLines.slice(0, 10); // Primeiros 10 erros

    // Tentar extrair mais métricas
    const staticMatch = output.match(/(\d+)\s+static\s+pages?/i);
    if (staticMatch) {
      build.pages.static = parseInt(staticMatch[1]);
    }

    const dynamicMatch = output.match(/(\d+)\s+dynamic\s+pages?/i);
    if (dynamicMatch) {
      build.pages.dynamic = parseInt(dynamicMatch[1]);
    }

    build.success = true;
    build.output = output;

  } catch (e) {
    const endTime = Date.now();
    build.duration = endTime - startTime;
    build.success = false;
    build.output = e.stdout?.toString() || e.stderr?.toString() || e.message;
    
    // Mesmo com erro, tentar extrair informações
    const output = build.output;
    build.hasMissingOpeningBrace = output.includes('Missing opening {');
    
    const warningLines = output.split('\n').filter(line => 
      line.includes('Warning:') || 
      line.includes('warn') ||
      line.toLowerCase().includes('warning')
    );
    build.warnings = warningLines.slice(0, 10);

    const errorLines = output.split('\n').filter(line => 
      line.includes('Error:') || 
      line.includes('error') ||
      line.toLowerCase().includes('failed')
    );
    build.errors = errorLines.slice(0, 10);
  }

  // Salvar relatório
  const reportPath = join(process.cwd(), 'reports', 'diag', 'build.json');
  writeFileSync(reportPath, JSON.stringify(build, null, 2));
  console.log('✅ Build probe completed');
} catch (error) {
  const errorReport = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack
    }
  };
  const reportPath = join(process.cwd(), 'reports', 'diag', 'build.json');
  writeFileSync(reportPath, JSON.stringify(errorReport, null, 2));
  console.error('❌ Build probe failed:', error.message);
}
