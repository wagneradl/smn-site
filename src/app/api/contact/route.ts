import { NextRequest, NextResponse } from 'next/server'
import { validateContactForm } from '@/lib/validation'

// Rate limiting simples (em produção, usar Redis ou similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minuto
    return true
  }

  if (limit.count >= 3) {
    // Máximo 3 tentativas por minuto
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente em 1 minuto.' },
        { status: 429 },
      )
    }

    // Validar dados
    const body = await request.json()
    const validation = validateContactForm(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.errors },
        { status: 400 },
      )
    }

    const { data } = validation

    // Em produção, aqui você enviaria o email
    // Por exemplo, usando Resend, SendGrid, etc.
    console.log('Dados do formulário validados:', data)

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        success: true,
        message: 'Recebemos sua mensagem. Em breve entraremos em contato.',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Erro no processamento do formulário:', error)

    return NextResponse.json(
      {
        error:
          'Erro interno do servidor. Tente novamente ou escreva para projetos@smn.com.br.',
      },
      { status: 500 },
    )
  }
}
