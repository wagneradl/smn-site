import fs from 'fs';
import path from 'path';

export interface ReportData {
  [key: string]: any;
}

export function readReport(reportPath: string): ReportData {
  try {
    const fullPath = path.join(process.cwd(), reportPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Report not found: ${reportPath}`);
    }
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to read report ${reportPath}: ${error}`);
  }
}

export function readFile(filePath: string): string {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to read file ${filePath}: ${error}`);
  }
}

export function fileExists(filePath: string): boolean {
  const fullPath = path.join(process.cwd(), filePath);
  return fs.existsSync(fullPath);
}

export function ensureDirectory(dirPath: string): void {
  const fullPath = path.join(process.cwd(), dirPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

export function writeFile(filePath: string, content: string): void {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);
  ensureDirectory(dir);
  fs.writeFileSync(fullPath, content, 'utf-8');
}

export function parseNextConfig(): any {
  const configPath = 'next.config.mjs';
  const content = readFile(configPath);
  
  // Simple parsing for key configurations
  const config: any = {};
  
  // Check for Shiki theme
  if (content.includes("createCssVariablesTheme({ name: 'css-variables' })")) {
    config.shikiTheme = 'css-variables';
  }
  
  // Check for remark/rehype order
  if (content.includes('remark') && content.includes('rehype')) {
    const remarkIndex = content.indexOf('remark');
    const rehypeIndex = content.indexOf('rehype');
    config.order = remarkIndex < rehypeIndex ? ['remark', 'rehype'] : ['rehype', 'remark'];
  }
  
  // Check for plugins
  const plugins = [];
  if (content.includes('rehype-unwrap-images')) plugins.push('rehype-unwrap-images');
  if (content.includes('remark-gfm')) plugins.push('remark-gfm');
  if (content.includes('remark-rehype-wrap')) plugins.push('remark-rehype-wrap');
  config.plugins = plugins;
  
  return config;
}

export function parsePackageJson(): any {
  const content = readFile('package.json');
  return JSON.parse(content);
}
