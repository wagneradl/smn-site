import Image from 'next/image'

import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import {
  getClientList,
  getBrandClass,
  getClientStyle,
  getClientSlug,
} from '@/lib/clients'

interface ClientsGridProps {
  theme?: 'dark' | 'light'
  title?: string
  subtitle?: string
  className?: string
  showBorder?: boolean
  debugMode?: boolean
}

export function ClientsGrid({
  theme = 'light',
  title,
  subtitle,
  className = '',
  showBorder = false,
  debugMode = false,
}: ClientsGridProps) {
  const clients = getClientList(theme)

  return (
    <div className={className}>
      {title && (
        <FadeIn>
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            {title}
          </h2>
        </FadeIn>
      )}

      <FadeInStagger className={title ? 'mt-10' : ''} faster>
        {showBorder && <Border as={FadeIn} />}

        <ul
          role="list"
          className="brands-grid"
          data-debug-logos={debugMode ? 'on' : 'off'}
        >
          {clients.map(([client, logo]) => (
            <li
              key={client}
              data-logo-item
              className={getBrandClass(client)}
              style={getClientStyle(client)}
              data-brand={getClientSlug(client)}
            >
              <FadeIn>
                <Image src={logo} alt={client} unoptimized />
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </div>
  )
}
