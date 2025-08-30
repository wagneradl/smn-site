import { useId } from 'react'
import clsx from 'clsx'

export interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  className?: string
  children?: React.ReactNode
}

export interface InputFieldProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> {
  label: string
  required?: boolean
  error?: string
  type?: 'text' | 'email' | 'tel' | 'password'
}

export interface SelectFieldProps extends Omit<React.ComponentPropsWithoutRef<'select'>, 'id'> {
  label: string
  required?: boolean
  error?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export interface TextareaFieldProps extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'id'> {
  label: string
  required?: boolean
  error?: string
  rows?: number
}

export interface RadioFieldProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'id' | 'type'> {
  label: string
  options: Array<{ value: string; label: string }>
  name: string
  error?: string
}

// Componente base para campos de formulário
function FormField({ label, required = false, error, className, children }: FormFieldProps) {
  const id = useId()
  
  return (
    <div className={clsx('group relative z-0 transition-all focus-within:z-10', className)}>
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

// Campo de input genérico
export function InputField({ 
  label, 
  required = false, 
  error, 
  type = 'text',
  className,
  ...props 
}: InputFieldProps) {
  const id = useId()
  
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <input
        id={id}
        type={type}
        {...props}
        placeholder=" "
        required={required}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
    </FormField>
  )
}

// Campo de select genérico
export function SelectField({ 
  label, 
  required = false, 
  error, 
  options,
  placeholder = "Selecione...",
  className,
  ...props 
}: SelectFieldProps) {
  const id = useId()
  
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <select
        id={id}
        {...props}
        required={required}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  )
}

// Campo de textarea genérico
export function TextareaField({ 
  label, 
  required = false, 
  error, 
  rows = 4,
  className,
  ...props 
}: TextareaFieldProps) {
  const id = useId()
  
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <textarea
        id={id}
        {...props}
        placeholder=" "
        required={required}
        rows={rows}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden resize-none"
      />
    </FormField>
  )
}

// Campo de radio genérico
export function RadioField({ 
  label, 
  options,
  name,
  error,
  className,
  ...props 
}: RadioFieldProps) {
  return (
    <div className={className}>
      <fieldset>
        <legend className="text-base/6 text-neutral-500">{label}</legend>
        <div className="mt-6 grid grid-cols-1 gap-4">
          {options.map((option) => (
            <label key={option.value} className="flex gap-x-3">
              <input
                type="radio"
                name={name}
                value={option.value}
                {...props}
                className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-hidden checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              />
              <span className="text-base/6 text-neutral-950">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

