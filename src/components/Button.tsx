import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps = {
  invert?: boolean
  variant?: 'primary' | 'accent' | 'secondary'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  invert = false,
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 font-body items-center justify-center'
  
  // Variant styles
  const variantStyles = {
    primary: invert
      ? 'bg-white text-primary-800 hover:bg-gray-50 border border-primary-200 hover:border-primary-300 focus:ring-4 focus:ring-primary-200/50 active:bg-gray-100'
      : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-primary-600/30 active:bg-primary-800 transform hover:scale-105',
    accent: invert
      ? 'bg-white text-accent-700 hover:bg-accent-50 border border-accent-200 hover:border-accent-300 focus:ring-4 focus:ring-accent-200/50 active:bg-accent-100'
      : 'bg-accent-500 text-white hover:bg-accent-600 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-accent-500/30 active:bg-accent-700 transform hover:scale-105',
    secondary: invert
      ? 'bg-primary-800 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-600/30 active:bg-primary-900'
      : 'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-4 focus:ring-primary-600/20 active:bg-primary-100'
  }
  
  className = clsx(
    className,
    baseStyles,
    variantStyles[variant],
  )

  let inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
