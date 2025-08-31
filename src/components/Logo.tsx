'use client'

import { useId } from 'react'
import clsx from 'clsx'

export function Logomark({
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        d="M1.2677,21.2628l-.0552-.1226c.0982-2.683-.2597-5.4686.3747-8.092C3.1026,6.7808,9.535,1.4054,16.0231,1.2056l14.7763.0017c.0573,3.1048-2.2982,5.8314-5.3571,6.2882-.207.0309-.4622.0673-.6684.0784-3.0185.1626-6.1897-.1538-9.2129-.003-4.3518.2171-7.857,3.857-7.9831,8.1964l.0015,5.4954H1.2677v.0002Z M30.7998,10.7728l.0015,5.9577c-.339,7.0593-7.3608,13.6164-14.3125,14.064l-15.2746-.0016c.0327-1.3128.4122-2.5803,1.1657-3.6528,1.0416-1.4826,2.8523-2.5692,4.6824-2.6784,2.9592-.1765,6.0933.1341,9.0707.003,4.4407-.1771,7.8985-3.3652,8.3031-7.8053l-.0015-5.8866h6.3652Z"
        className={clsx(
          'transition-colors duration-300',
          invert
            ? 'fill-white'
            : filled
              ? 'fill-neutral-950'
              : fillOnHover
                ? 'fill-primary-600 group-hover/logo:fill-accent-500'
                : 'fill-primary-600 hover:fill-accent-500',
        )}
      />
      <circle
        cx="16.0413"
        cy="16.0626"
        r="5.7348"
        className={clsx(
          'transition-colors duration-300',
          fillOnHover
            ? 'fill-accent-500 group-hover/logo:fill-accent-600'
            : 'fill-accent-500',
        )}
      />
    </svg>
  )
}

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  return (
    <svg
      viewBox="0 0 130 32"
      aria-hidden="true"
      className={clsx(fillOnHover && 'group/logo', className)}
      {...props}
    >
      <Logomark
        preserveAspectRatio="xMinYMid meet"
        invert={invert}
        filled={filled}
        fillOnHover={fillOnHover}
      />
      <path
        className={clsx(
          'transition-colors duration-300',
          invert ? 'fill-white' : 'fill-neutral-950',
        )}
        d="M65.3084,4.521v4.1439l-.1018.0824c-2.3221-.0816-4.6617-.0596-6.9914-.0492-1.6763.0075-3.4677-.1115-5.1464.0668-2.8068.298-5.5959,2.327-6.239,5.1489h18.4172c.7506,4.6936-1.3741,9.2843-5.309,11.8497-1.8921,1.2335-3.8901,1.6825-6.141,1.7784l-11.5105.0009-.0036-4.2095c1.3816-.0364,2.7682-.0426,4.1507-.0297,2.55.0238,5.4503.2522,7.97-.005,2.7243-.278,5.7599-2.3449,6.3004-5.149h-18.4786c.0127-1.8324-.007-3.7048.5086-5.477,1.2801-4.4,5.3694-7.7615,9.9592-8.0897l12.6152-.062Z M76.7271,6.0558v-1.4734c1.3797.0298,2.7665-.0389,4.1464-.0025,2.6582.07,4.1993.3713,6.2295,2.181,3.9139,3.4887,3.267,7.2253,3.2499,11.9692-.0106,2.9373.014,5.876.0029,8.8125h-4.1746l.0025-13.4778c-.0635-1.2692-.3138-2.2063-1.0575-3.2398-.9543-1.3263-2.5285-2.0678-4.1632-2.0679v9.3314l-4.1749.0617c-.0658-1.7944.1653-3.7034-.2124-5.4662-.4951-2.3107-2.6616-3.9335-5.0055-3.9269v18.7856h-4.1746l-.0617-23.0219,3.8398-.0636c.6887.083,1.3813.0879,2.0669.2045,1.2097.2058,2.4768.7089,3.4864,1.3942Z M111.2901,27.5426l-.0006-11.8171c-.2094-3.3962-2.8538-6.6349-6.3508-6.9096l-8.1982.0026v18.7242c-.0594-.0493-.1159,0-.1535,0h-4.0825l-.0617-23.0219,12.1279-.0026c6.2932.4028,10.6643,5.2383,10.9547,11.4529.1691,3.618-.1277,7.3596.0036,10.9907l-.0951.5809h-4.1439Z"
      />
    </svg>
  )
}
