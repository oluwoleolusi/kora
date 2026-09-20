import { useState } from 'react'
import type { FormEvent } from 'react'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || !emailPattern.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    setError(undefined)
    setStatus('submitting')
    window.setTimeout(() => setStatus('success'), 800)
  }

  return (
    <section className="section-pad border-b border-line">
      <div className="container-editorial max-w-xl">
        <p className="eyebrow">Stay in touch</p>
        <h2 className="mt-3 text-3xl leading-[1.15] sm:text-4xl">
          First to know, before it sells out.
        </h2>
        <p className="mt-4 max-w-[42ch] text-[1.05rem] leading-relaxed text-ink-soft">
          Occasional notes on new arrivals and restocks. Nothing else.
        </p>

        {status === 'success' ? (
          <p className="mt-6 text-sm text-ink">
            You’re on the list — thank you.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(error)}
                className={`field-input ${error ? 'border-signal' : ''}`}
              />
              {error && <p className="mt-1.5 text-xs text-signal">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary shrink-0 disabled:cursor-wait"
            >
              {status === 'submitting' ? 'Sending' : 'Sign up'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
