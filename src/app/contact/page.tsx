'use client'

import { useId } from 'react'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { RootLayout } from '@/components/RootLayout'
import { contactContent } from '@/content/contact'

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

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-hidden checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

function ContactForm() {
  return (
    <FadeIn className="lg:order-last">
      <form>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Solicitações de projeto
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            label={contactContent.form.fields.name.label}
            name="name"
            autoComplete="name"
            required={contactContent.form.fields.name.required}
          />
          <TextInput
            label={contactContent.form.fields.email.label}
            type="email"
            name="email"
            autoComplete="email"
            required={contactContent.form.fields.email.required}
          />
          <TextInput
            label={contactContent.form.fields.company.label}
            name="company"
            autoComplete="organization"
            required={contactContent.form.fields.company.required}
          />
          <TextInput
            label={contactContent.form.fields.phone.label}
            type="tel"
            name="phone"
            autoComplete="tel"
            required={contactContent.form.fields.phone.required}
          />
          <SelectInput
            label={contactContent.form.fields.subject.label}
            name="subject"
            options={contactContent.form.fields.subject.options}
            required={contactContent.form.fields.subject.required}
          />
          <TextAreaInput
            label={contactContent.form.fields.message.label}
            name="message"
            required={contactContent.form.fields.message.required}
          />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">
                {contactContent.form.fields.deadline.label}
              </legend>
              <div className="mt-6 grid grid-cols-1 gap-4">
                {contactContent.form.fields.deadline.options.map((option) => (
                  <RadioInput
                    key={option}
                    label={option}
                    name="deadline"
                    value={option}
                  />
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        <Button type="submit" className="mt-10">
          {contactContent.form.cta}
        </Button>
        <p className="mt-4 text-sm text-neutral-600">
          {contactContent.form.lgpd}
        </p>
      </form>
    </FadeIn>
  )
}

function ContactChannels() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Canais de contato
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4">
        {contactContent.channels.map((channel) => (
          <div
            key={channel.title}
            className="rounded-lg border border-neutral-200 p-4"
          >
            <h3 className="font-semibold text-neutral-950">{channel.title}</h3>
            {channel.textHtml && (
              <p
                className="mt-2 text-sm text-neutral-600"
                dangerouslySetInnerHTML={{ __html: channel.textHtml }}
              />
            )}
            {channel.email && (
              <a
                href={`mailto:${channel.email}`}
                className="mt-2 inline-block text-sm text-neutral-600 hover:text-neutral-950"
              >
                {channel.email}
              </a>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-neutral-600">
        {contactContent.channelsNote}
      </p>
    </FadeIn>
  )
}

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        {contactContent.offices.title}
      </h2>
      <div className="mt-6 space-y-4">
        {contactContent.offices.items.map((office) => (
          <div key={office.name}>
            <h3 className="font-semibold text-neutral-950">{office.name}</h3>
            <p className="text-sm text-neutral-600">{office.address}</p>
          </div>
        ))}
      </div>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Redes sociais
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export default function Contact() {
  return (
    <RootLayout>
      <PageIntro title="Vamos Conversar">
        <p>{contactContent.hero.subtitle}</p>
        <div
          className="mt-4 text-sm text-neutral-600"
          dangerouslySetInnerHTML={{ __html: contactContent.hero.noteHtml }}
        />
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <div className="space-y-16">
            <ContactChannels />
            <ContactDetails />
          </div>
        </div>
      </Container>
    </RootLayout>
  )
}
