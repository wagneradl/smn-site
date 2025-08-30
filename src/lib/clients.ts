import React from 'react'
import logoMagaluDark from '@/images/clients/magalu/logo-dark.svg'
import logoMagaluLight from '@/images/clients/magalu/logo-light.svg'
import logoMomentumDark from '@/images/clients/momentum/logo-dark.svg'
import logoMomentumLight from '@/images/clients/momentum/logo-light.svg'
import logoAutovoxDark from '@/images/clients/autovox/logo-dark.svg'
import logoAutovoxLight from '@/images/clients/autovox/logo-light.svg'
import logoTeixeiraFortesDark from '@/images/clients/teixeira-fortes/logo-dark.svg'
import logoTeixeiraFortesLight from '@/images/clients/teixeira-fortes/logo-light.svg'
import logoCeaDark from '@/images/clients/cea/logo-dark.svg'
import logoCeaLight from '@/images/clients/cea/logo-light.svg'
import logoLeveAssetDark from '@/images/clients/leve-asset/logo-dark.svg'
import logoLeveAssetLight from '@/images/clients/leve-asset/logo-light.svg'
import logoCasaDoConstrutorDark from '@/images/clients/casa-do-construtor/logo-dark.svg'
import logoCasaDoConstrutorLight from '@/images/clients/casa-do-construtor/logo-light.svg'
import logoLiceuFrancanoDark from '@/images/clients/liceu-francano/logo-dark.svg'
import logoLiceuFrancanoLight from '@/images/clients/liceu-francano/logo-light.svg'

export type ClientBucket = 'wide' | 'standard' | 'emblem'

export interface ClientConfig {
  name: string
  logoDark: any
  logoLight: any
  bucket: ClientBucket
  scale: number
  offsetX?: number
  offsetY?: number
}

export const CLIENTS_CONFIG: Record<string, ClientConfig> = {
  Magalu: {
    name: 'Magalu',
    logoDark: logoMagaluDark,
    logoLight: logoMagaluLight,
    bucket: 'wide',
    scale: 1.04,
    offsetX: -2,
  },
  Momentum: {
    name: 'Momentum',
    logoDark: logoMomentumDark,
    logoLight: logoMomentumLight,
    bucket: 'wide',
    scale: 1.0,
  },
  Autovox: {
    name: 'Autovox',
    logoDark: logoAutovoxDark,
    logoLight: logoAutovoxLight,
    bucket: 'wide',
    scale: 1.0,
  },
  'Teixeira Fortes': {
    name: 'Teixeira Fortes',
    logoDark: logoTeixeiraFortesDark,
    logoLight: logoTeixeiraFortesLight,
    bucket: 'standard',
    scale: 1.06,
  },
  CEA: {
    name: 'CEA',
    logoDark: logoCeaDark,
    logoLight: logoCeaLight,
    bucket: 'emblem',
    scale: 1.22,
    offsetY: -2,
  },
  'Leve Asset': {
    name: 'Leve Asset',
    logoDark: logoLeveAssetDark,
    logoLight: logoLeveAssetLight,
    bucket: 'wide',
    scale: 0.98,
  },
  'Casa do Construtor': {
    name: 'Casa do Construtor',
    logoDark: logoCasaDoConstrutorDark,
    logoLight: logoCasaDoConstrutorLight,
    bucket: 'wide',
    scale: 1.0,
  },
  'Liceu Francano': {
    name: 'Liceu Francano',
    logoDark: logoLiceuFrancanoDark,
    logoLight: logoLiceuFrancanoLight,
    bucket: 'standard',
    scale: 1.02,
  },
}

export function getClientList(theme: 'dark' | 'light' = 'light'): Array<[string, any]> {
  return Object.values(CLIENTS_CONFIG).map(client => [
    client.name,
    theme === 'dark' ? client.logoDark : client.logoLight
  ])
}

export function getClientConfig(clientName: string): ClientConfig | undefined {
  return CLIENTS_CONFIG[clientName]
}

export function getClientSlug(clientName: string): string {
  return clientName.toLowerCase().replaceAll(' ', '-')
}

export function getBrandClass(clientName: string): string {
  const config = getClientConfig(clientName)
  if (!config) return 'brand'
  
  const classes = ['brand']
  
  if (config.bucket === 'wide') classes.push('brand--wide')
  if (config.bucket === 'emblem') classes.push('brand--emblem')
  
  return classes.join(' ')
}

export function getClientStyle(clientName: string): React.CSSProperties {
  const config = getClientConfig(clientName)
  if (!config) return {}
  
  const style: React.CSSProperties = {
    ['--s' as any]: config.scale.toString(),
  }
  
  if (config.offsetX !== undefined) {
    (style as any)['--dx'] = `${config.offsetX}px`
  }
  
  if (config.offsetY !== undefined) {
    (style as any)['--dy'] = `${config.offsetY}px`
  }
  
  return style
}
