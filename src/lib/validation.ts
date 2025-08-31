import { z } from 'zod'

// Schema de validação para o formulário de contato
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),

  email: z.string().email('E-mail inválido').max(255, 'E-mail muito longo'),

  company: z
    .string()
    .min(2, 'Empresa deve ter pelo menos 2 caracteres')
    .max(100, 'Empresa deve ter no máximo 100 caracteres'),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[\d\s\(\)\-\+]+$/.test(val), {
      message:
        'Telefone deve conter apenas números, espaços, parênteses, hífens e +',
    }),

  subject: z.enum(['Projeto', 'Parceria', 'Dúvida técnica', 'Outro']),

  message: z
    .string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(2000, 'Mensagem deve ter no máximo 2000 caracteres'),

  deadline: z.enum(['immediate', 'quarter', 'no-urgency']).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Função para sanitizar dados
export function sanitizeContactData(data: ContactFormData): ContactFormData {
  return {
    name: data.name.trim().replace(/\s+/g, ' '),
    email: data.email.trim().toLowerCase(),
    company: data.company.trim().replace(/\s+/g, ' '),
    phone: data.phone?.trim().replace(/\s+/g, ' ') || undefined,
    subject: data.subject,
    message: data.message.trim().replace(/\s+/g, ' '),
    deadline: data.deadline,
  }
}

// Função para validar dados
export function validateContactForm(
  data: unknown,
):
  | { success: true; data: ContactFormData }
  | { success: false; errors: Record<string, string> } {
  try {
    const validatedData = contactFormSchema.parse(data)
    const sanitizedData = sanitizeContactData(validatedData)
    return { success: true, data: sanitizedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.issues.forEach((err) => {
        const field = err.path[0] as string
        errors[field] = err.message
      })
      return { success: false, errors }
    }
    return {
      success: false,
      errors: { general: 'Erro de validação desconhecido' },
    }
  }
}
