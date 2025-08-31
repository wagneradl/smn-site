import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

try {
  const audit = {
    timestamp: new Date().toISOString(),
    npmAudit: null,
    packageLock: null,
    peerDeps: null,
  }

  // Executar npm audit
  try {
    const auditOutput = execSync('npm audit --audit-level=moderate --json', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    const auditData = JSON.parse(auditOutput)
    audit.npmAudit = {
      vulnerabilities: auditData.metadata?.vulnerabilities || {},
      summary: {
        total: auditData.metadata?.vulnerabilities?.total || 0,
        critical: auditData.metadata?.vulnerabilities?.critical || 0,
        high: auditData.metadata?.vulnerabilities?.high || 0,
        moderate: auditData.metadata?.vulnerabilities?.moderate || 0,
        low: auditData.metadata?.vulnerabilities?.low || 0,
      },
    }
  } catch (e) {
    audit.npmAudit = { error: e.message }
  }

  // Analisar package-lock.json
  try {
    const lockPath = join(process.cwd(), 'package-lock.json')
    const lockContent = JSON.parse(readFileSync(lockPath, 'utf8'))

    const lockedVersions = {}
    const peerDeps = []

    Object.entries(lockContent.dependencies || {}).forEach(([name, dep]) => {
      lockedVersions[name] = dep.version

      if (dep.peerDependencies) {
        peerDeps.push({
          package: name,
          peerDeps: dep.peerDependencies,
        })
      }
    })

    audit.packageLock = {
      totalDeps: Object.keys(lockedVersions).length,
      lockedVersions: Object.keys(lockedVersions).slice(0, 10), // Primeiros 10 para exemplo
    }

    audit.peerDeps = {
      count: peerDeps.length,
      packages: peerDeps.slice(0, 5), // Primeiros 5 para exemplo
    }
  } catch (e) {
    audit.packageLock = { error: e.message }
  }

  // Salvar relatório
  const reportPath = join(process.cwd(), 'reports', 'diag', 'audit.json')
  writeFileSync(reportPath, JSON.stringify(audit, null, 2))
  console.log('✅ Dependencies audit completed')
} catch (error) {
  const errorReport = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack,
    },
  }
  const reportPath = join(process.cwd(), 'reports', 'diag', 'audit.json')
  writeFileSync(reportPath, JSON.stringify(errorReport, null, 2))
  console.error('❌ Dependencies audit failed:', error.message)
}
