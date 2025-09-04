import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Sede — João Pessoa (PB)" invert={invert}>
          Rua Dep. Geraldo Mariz, 291A
          <br />
          Tambauzinho, João Pessoa – PB
        </Office>
      </li>
      <li>
        <Office name="Ingá (PB)" invert={invert}>
          Sítio Hotel Cruzeiro, s/n
          <br />
          Zona Rural, BR-230 – Ingá – PB
        </Office>
      </li>
      <li>
        <Office name="Franca (SP)" invert={invert}>
          R. dos Pracinhas, 1720
          <br />
          Núcleo Agrícola Alpha, Franca – SP
        </Office>
      </li>
      <li>
        <Office name="Passos (MG)" invert={invert}>
          R. Noruega, 274
          <br />
          Novo Mundo, Passos – MG
        </Office>
      </li>
    </ul>
  )
}
