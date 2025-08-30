import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import os from 'os';

try {
  const env = {
    timestamp: new Date().toISOString(),
    node: {
      version: process.version,
      platform: process.platform,
      arch: process.arch
    },
    npm: {
      version: execSync('npm --version', { encoding: 'utf8' }).trim()
    },
    os: {
      platform: process.platform,
      release: os.release(),
      type: os.type()
    },
    nvmrc: null,
    packageJson: null
  };

  // Verificar .nvmrc
  try {
    const nvmrcPath = join(process.cwd(), '.nvmrc');
    env.nvmrc = readFileSync(nvmrcPath, 'utf8').trim();
  } catch (e) {
    env.nvmrc = null;
  }

  // Ler package.json
  try {
    const packagePath = join(process.cwd(), 'package.json');
    const packageContent = JSON.parse(readFileSync(packagePath, 'utf8'));
    env.packageJson = {
      name: packageContent.name,
      version: packageContent.version,
      engines: packageContent.engines || {},
      dependencies: Object.keys(packageContent.dependencies || {}).length,
      devDependencies: Object.keys(packageContent.devDependencies || {}).length,
      scripts: Object.keys(packageContent.scripts || {}).length
    };
  } catch (e) {
    env.packageJson = { error: e.message };
  }

  // Salvar relatório
  const reportPath = join(process.cwd(), 'reports', 'diag', 'env.json');
  writeFileSync(reportPath, JSON.stringify(env, null, 2));
  console.log('✅ Environment probe completed');
} catch (error) {
  const errorReport = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack
    }
  };
  const reportPath = join(process.cwd(), 'reports', 'diag', 'env.json');
  writeFileSync(reportPath, JSON.stringify(errorReport, null, 2));
  console.error('❌ Environment probe failed:', error.message);
}
