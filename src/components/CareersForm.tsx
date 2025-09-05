'use client'

import { useId, useState } from 'react'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

function TextInput({
  label,
  required = false,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string
  required?: boolean
}) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        required={required}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    </div>
  )
}

function EmailInput({
  label,
  required = false,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string
  required?: boolean
}) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="email"
        id={id}
        {...props}
        placeholder=" "
        required={required}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    </div>
  )
}

function TelInput({
  label,
  required = false,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string
  required?: boolean
}) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="tel"
        id={id}
        {...props}
        placeholder=" "
        required={required}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    </div>
  )
}

function SelectInput({
  label,
  required = false,
  options,
  ...props
}: React.ComponentPropsWithoutRef<'select'> & {
  label: string
  required?: boolean
  options: string[]
}) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <select
        id={id}
        {...props}
        required={required}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    </div>
  )
}

function FileInput({
  label,
  required = false,
  accept,
  maxSize,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string
  required?: boolean
  accept?: string
  maxSize?: number
}) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="file"
        id={id}
        {...props}
        accept={accept}
        required={required}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl file:mr-4 file:rounded-full file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-neutral-700 hover:file:bg-neutral-200 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
        {maxSize && (
          <span className="mt-1 block text-xs text-neutral-400">
            Máximo: {(maxSize / (1024 * 1024)).toFixed(0)}MB
          </span>
        )}
      </label>
    </div>
  )
}

function TextAreaInput({
  label,
  required = false,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'> & {
  label: string
  required?: boolean
}) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        id={id}
        {...props}
        placeholder=" "
        required={required}
        rows={4}
        className="peer block w-full resize-none border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    </div>
  )
}

export function CareersForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        e.currentTarget.reset()
      } else {
        setSubmitStatus('error')
        setErrorMessage(
          result.error || 'Erro ao enviar o currículo. Tente novamente.',
        )
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        'Erro de conexão. Verifique sua internet e tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-display text-base font-semibold text-white">
        Candidate-se
      </h2>

      <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/90 backdrop-blur-sm">
        <TextInput
          label="Nome Completo"
          name="nome"
          autoComplete="name"
          required={true}
        />
        <EmailInput
          label="E-mail"
          name="email"
          autoComplete="email"
          required={true}
        />
        <TelInput
          label="Telefone"
          name="telefone"
          autoComplete="tel"
          required={true}
        />
        <SelectInput
          label="Área de Interesse"
          name="area"
          options={[
            'Desenvolvimento de Software',
            'BI',
            'Infraestrutura',
            'Estágio',
          ]}
          required={true}
        />
        <FileInput
          label="Selecione seu currículo"
          name="curriculo"
          accept=".pdf"
          maxSize={5 * 1024 * 1024} // 5MB
          required={true}
        />
        <TextAreaInput
          label="Mensagem ou Complemento (Opcional)"
          name="mensagem"
          required={false}
        />
      </div>

      <Button type="submit" className="mt-8" disabled={isSubmitting} invert>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </Button>

      {submitStatus === 'success' && (
        <p className="mt-4 text-sm text-green-300">
          Currículo enviado com sucesso! Entraremos em contato caso surjam
          oportunidades alinhadas ao seu perfil.
        </p>
      )}

      {submitStatus === 'error' && (
        <p className="mt-4 text-sm text-red-300">{errorMessage}</p>
      )}

      <p className="mt-4 text-sm text-white/80">
        Seus dados estão seguros conosco. Entraremos em contato caso surjam
        oportunidades alinhadas ao seu perfil.
      </p>
    </form>
  )
}
