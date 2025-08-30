import { useState, useCallback } from 'react'
import { ContactFormData, validateContactForm } from '@/lib/validation'

interface UseContactFormReturn {
  formData: ContactFormData
  errors: Record<string, string>
  isSubmitting: boolean
  submitStatus: 'idle' | 'success' | 'error'
  updateField: (field: keyof ContactFormData, value: string) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  resetForm: () => void
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  subject: 'Projeto',
  message: '',
  deadline: undefined
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setErrors({})
    setSubmitStatus('idle')
  }, [])

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [errors])

  const validateForm = useCallback(() => {
    const validation = validateContactForm(formData)
    
    if (!validation.success) {
      setErrors(validation.errors)
      return false
    }
    
    setErrors({})
    return true
  }, [formData])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validation = validateForm()
    if (!validation) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
          resetForm()
        }, 3000)
      } else {
        setSubmitStatus('error')
        if (result.details) {
          setErrors(result.details)
        }
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, resetForm])

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    updateField,
    handleSubmit,
    resetForm
  }
}
