import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

try {
  const logosLayout = {
    timestamp: new Date().toISOString(),
    pageContent: null,
    brands: [],
    buckets: {
      wide: 0,
      emblem: 0,
      standard: 0
    },
    customProps: [],
    aspectRatios: {}
  };

  // Ler página principal
  try {
    const pagePath = join(process.cwd(), 'src', 'app', 'page.tsx');
    const pageContent = readFileSync(pagePath, 'utf8');
    
    logosLayout.pageContent = {
      exists: true,
      size: pageContent.length,
      hasBrandSection: pageContent.includes('brand') || pageContent.includes('client')
    };

    // Extrair itens de marca
    const brandMatches = pageContent.match(/data-brand="([^"]+)"/g);
    if (brandMatches) {
      logosLayout.brands = brandMatches.map(match => match.match(/data-brand="([^"]+)"/)[1]);
    }

    // Verificar buckets
    const bucketMatches = pageContent.match(/brand--([^"'\s]+)/g);
    if (bucketMatches) {
      bucketMatches.forEach(match => {
        const bucket = match.replace('brand--', '');
        if (bucket === 'wide') logosLayout.buckets.wide++;
        else if (bucket === 'emblem') logosLayout.buckets.emblem++;
        else if (bucket === 'standard') logosLayout.buckets.standard++;
      });
    }

    // Verificar custom props
    const customPropsMatches = pageContent.match(/--[a-z]+:\s*[^;]+/g);
    if (customPropsMatches) {
      logosLayout.customProps = customPropsMatches.map(prop => prop.trim());
    }

  } catch (e) {
    logosLayout.pageContent = { error: e.message };
  }

  // Analisar SVGs dos clientes
  try {
    const clientsDir = join(process.cwd(), 'src', 'images', 'clients');
    if (existsSync(clientsDir)) {
      const clientFolders = readdirSync(clientsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      clientFolders.forEach(client => {
        const clientPath = join(clientsDir, client);
        const svgFiles = readdirSync(clientPath).filter(file => file.endsWith('.svg'));
        
        svgFiles.forEach(svgFile => {
          try {
            const svgPath = join(clientPath, svgFile);
            const svgContent = readFileSync(svgPath, 'utf8');
            
            // Extrair viewBox
            const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
            if (viewBoxMatch) {
              const [, viewBox] = viewBoxMatch;
              const [x, y, width, height] = viewBox.split(' ').map(Number);
              const aspectRatio = width / height;
              
              const key = `${client}/${svgFile}`;
              logosLayout.aspectRatios[key] = {
                width,
                height,
                aspectRatio: aspectRatio.toFixed(3),
                isWide: aspectRatio > 2,
                isTall: aspectRatio < 0.5
              };
            }

            // Verificar custom props no SVG
            const svgCustomProps = svgContent.match(/--[a-z]+:\s*[^;]+/g);
            if (svgCustomProps) {
              logosLayout.customProps.push(...svgCustomProps.map(prop => `${client}/${svgFile}: ${prop.trim()}`));
            }

          } catch (e) {
            // Ignorar erros de SVG individual
          }
        });
      });
    }
  } catch (e) {
    logosLayout.svgAnalysis = { error: e.message };
  }

  // Salvar relatório
  const reportPath = join(process.cwd(), 'reports', 'diag', 'logos-layout.json');
  writeFileSync(reportPath, JSON.stringify(logosLayout, null, 2));
  console.log('✅ Logos layout scan completed');
} catch (error) {
  const errorReport = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack
    }
  };
  const reportPath = join(process.cwd(), 'reports', 'diag', 'logos-layout.json');
  writeFileSync(reportPath, JSON.stringify(errorReport, null, 2));
  console.error('❌ Logos layout scan failed:', error.message);
}
