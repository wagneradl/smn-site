export const contactContent = {
  hero: {
    title: "Fale Conosco",
    subtitle: "Projetos e parcerias. Conte-nos sobre seu contexto e objetivos.",
    noteHtml: 'Para vagas, acesse <a href="/careers" data-nav-link>Carreiras</a> ou escreva para <a href="mailto:carreiras@smn.com.br">carreiras@smn.com.br</a>.'
  },
  channels: [
    {
      title: "Projetos & Parcerias",
      textHtml: 'Use o formulário desta página.',
      email: "projetos@smn.com.br"
    },
    { title: "Imprensa", email: "imprensa@smn.com.br" },
    { title: "Carreiras", email: "carreiras@smn.com.br" }
  ],
  channelsNote: "Mantemos e-mails de imprensa e carreiras aqui para reduzir dúvidas, mas o foco desta página é contato comercial.",
  form: {
    fields: {
      name: { label: "Nome", required: true },
      email: { label: "E-mail", required: true },
      company: { label: "Empresa", required: true },
      phone: { label: "Telefone", required: false },
      subject: {
        label: "Assunto",
        required: true,
        options: ["Projeto", "Parceria", "Dúvida técnica", "Outro"]
      },
      message: { label: "Mensagem", required: true },
      deadline: {
        label: "Prazo desejado (opcional)",
        required: false,
        options: [
          "Imediato (0–30 dias)",
          "Próximo trimestre (31–90 dias)",
          "Sem urgência (90+)"
        ]
      }
    },
    cta: "Enviar",
    lgpd: "Seus dados serão usados exclusivamente para responder seu contato, conforme nossa Política de Privacidade. Você pode revogar este consentimento a qualquer momento.",
    success: "Recebemos sua mensagem. Em breve entraremos em contato.",
    error: "Não foi possível enviar agora. Tente novamente ou escreva para projetos@smn.com.br."
  },
  offices: {
    title: "Nossos escritórios",
    items: [
      { name: "Sede — João Pessoa (PB)", address: "Rua Professor José Coelho, 501 — Tambauzinho" },
      { name: "Ingá (PB)", address: "Sítio Hotel Cruzeiro, s/n — Zona Rural, BR-230" },
      { name: "Franca (SP)", address: "R. dos Pracinhas, 1720 — Núcleo Agrícola Alpha" },
      { name: "Passos (MG)", address: "R. Noruega, 274 — Novo Mundo" }
    ]
  }
};
