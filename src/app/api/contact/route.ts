import { NextRequest, NextResponse } from 'next/server'

// Configurações de e-mail
const TO_EMAIL = 'projetos@smn.com.br'

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

    // Log para debug - remover em produção ou ajustar para um caminho seguro
    const logEnabled = false
    const logMessage = (message: string) => {
      if (logEnabled) {
        console.log(`[${new Date().toISOString()}] ${message}`)
      }
    }

    logMessage('Recebido formulário de contato')

    // Validar dados
    const body = await request.json()

    // Validar campos obrigatórios
    const { name, email, company, subject, message } = body

    if (!name || !email || !company || !subject || !message) {
      logMessage('Erro: Campos obrigatórios ausentes')
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 },
      )
    }

    // Preparar o e-mail
    const subjectLine = `Novo Contato - ${subject}`
    let emailBody = `Nome: ${name}\n`
    emailBody += `E-mail: ${email}\n`
    emailBody += `Empresa: ${company}\n`
    emailBody += `Assunto: ${subject}\n`
    if (body.phone) {
      emailBody += `Telefone: ${body.phone}\n`
    }
    if (body.deadline) {
      emailBody += `Prazo Desejado: ${body.deadline}\n`
    }
    emailBody += `Mensagem: ${message}\n`

    // Headers para o e-mail
    const boundary = `boundary_${Date.now()}`
    const headers = {
      From: email,
      To: TO_EMAIL,
      Subject: subjectLine,
      'MIME-Version': '1.0',
      'Content-Type': `multipart/mixed; boundary="${boundary}"`,
    }

    // Corpo do e-mail
    let bodyContent = `--${boundary}\r\n`
    bodyContent += 'Content-Type: text/plain; charset=UTF-8\r\n'
    bodyContent += 'Content-Transfer-Encoding: 7bit\r\n\r\n'
    bodyContent += emailBody + '\r\n'
    bodyContent += `--${boundary}--`

    // Enviar e-mail usando Resend ou outro serviço
    // Por enquanto, vamos simular o envio
    logMessage(`Tentando enviar e-mail para ${TO_EMAIL}`)

    // TODO: Implementar envio real de e-mail
    // Por exemplo, usando Resend, SendGrid, ou outro serviço
    // const mailResult = await sendEmail(headers, bodyContent)

    // Simulando sucesso
    const mailResult = true

    logMessage(`Resultado do envio: ${mailResult ? 'sucesso' : 'falha'}`)

    if (mailResult) {
      return NextResponse.json(
        {
          success: true,
          message: 'Recebemos sua mensagem. Em breve entraremos em contato.',
        },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        {
          error:
            'Erro interno do servidor. Tente novamente ou escreva para projetos@smn.com.br.',
        },
        { status: 500 },
      )
    }
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
