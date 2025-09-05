import { NextRequest, NextResponse } from 'next/server'

// Configurações de e-mail
const TO_EMAIL = 'oportunidades@smn.com.br'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB em bytes

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Log para debug - remover em produção ou ajustar para um caminho seguro
    const logEnabled = false
    const logMessage = (message: string) => {
      if (logEnabled) {
        console.log(`[${new Date().toISOString()}] ${message}`)
      }
    }

    logMessage('Recebido formulário de carreiras')

    // Validar campos obrigatórios
    const nome = formData.get('nome') as string
    const email = formData.get('email') as string
    const telefone = formData.get('telefone') as string
    const area = formData.get('area') as string
    const curriculo = formData.get('curriculo') as File
    const mensagem = formData.get('mensagem') as string

    if (!nome || !email || !telefone || !area || !curriculo) {
      logMessage('Erro: Campos obrigatórios ausentes')
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 },
      )
    }

    // Validar arquivo
    logMessage(
      `Verificando arquivo: ${curriculo.name} (${curriculo.size} bytes)`,
    )

    if (curriculo.size > MAX_FILE_SIZE) {
      logMessage('Erro: Arquivo excede tamanho máximo')
      return NextResponse.json(
        { error: 'O arquivo deve ter no máximo 5MB' },
        { status: 400 },
      )
    }

    if (curriculo.type !== 'application/pdf') {
      logMessage(`Erro: Arquivo não é PDF - tipo: ${curriculo.type}`)
      return NextResponse.json(
        { error: 'O arquivo deve estar no formato PDF' },
        { status: 400 },
      )
    }

    // Preparar o e-mail
    const subject = `Novo Currículo Recebido - ${nome}`
    let message = `Nome: ${nome}\n`
    message += `E-mail: ${email}\n`
    message += `Telefone: ${telefone}\n`
    message += `Área de Interesse: ${area}\n`
    if (mensagem) {
      message += `Mensagem: ${mensagem}\n`
    }

    // Converter arquivo para base64
    const fileBuffer = await curriculo.arrayBuffer()
    const fileBase64 = Buffer.from(fileBuffer).toString('base64')

    // Headers para o e-mail
    const boundary = `boundary_${Date.now()}`
    const headers = {
      From: email,
      To: TO_EMAIL,
      Subject: subject,
      'MIME-Version': '1.0',
      'Content-Type': `multipart/mixed; boundary="${boundary}"`,
    }

    // Corpo do e-mail
    let body = `--${boundary}\r\n`
    body += 'Content-Type: text/plain; charset=UTF-8\r\n'
    body += 'Content-Transfer-Encoding: 7bit\r\n\r\n'
    body += message + '\r\n'

    // Anexo
    body += `--${boundary}\r\n`
    body += `Content-Type: application/pdf; name="${curriculo.name}"\r\n`
    body += `Content-Disposition: attachment; filename="${curriculo.name}"\r\n`
    body += 'Content-Transfer-Encoding: base64\r\n\r\n'
    body += fileBase64 + '\r\n'
    body += `--${boundary}--`

    // Enviar e-mail usando Resend ou outro serviço
    // Por enquanto, vamos simular o envio
    logMessage(`Tentando enviar e-mail para ${TO_EMAIL}`)

    // TODO: Implementar envio real de e-mail
    // Por exemplo, usando Resend, SendGrid, ou outro serviço
    // const mailResult = await sendEmail(headers, body)

    // Simulando sucesso
    const mailResult = true

    logMessage(`Resultado do envio: ${mailResult ? 'sucesso' : 'falha'}`)

    if (mailResult) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Erro ao enviar o currículo. Por favor, tente novamente.' },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error('Erro no processamento do formulário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente.' },
      { status: 500 },
    )
  }
}
