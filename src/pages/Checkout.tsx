import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import type { CheckoutFormData } from '../types'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

type Errors = Partial<Record<keyof CheckoutFormData, string>>

const emptyForm: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postcode: '',
  country: 'United States',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/

function validate(data: CheckoutFormData): Errors {
  const errors: Errors = {}
  if (!data.email.trim()) errors.email = 'Required.'
  else if (!emailPattern.test(data.email.trim())) errors.email = 'Enter a valid email.'

  if (!data.firstName.trim()) errors.firstName = 'Required.'
  if (!data.lastName.trim()) errors.lastName = 'Required.'
  if (!data.address.trim()) errors.address = 'Required.'
  if (!data.city.trim()) errors.city = 'Required.'
  if (!data.postcode.trim()) errors.postcode = 'Required.'

  if (!data.cardName.trim()) errors.cardName = 'Required.'

  const digits = data.cardNumber.replace(/\s/g, '')
  if (!digits) errors.cardNumber = 'Required.'
  else if (!/^\d{13,19}$/.test(digits)) errors.cardNumber = 'Enter a valid card number.'

  if (!data.cardExpiry.trim()) errors.cardExpiry = 'Required.'
  else if (!expiryPattern.test(data.cardExpiry.trim())) errors.cardExpiry = 'Use MM/YY.'

  if (!data.cardCvc.trim()) errors.cardCvc = 'Required.'
  else if (!/^\d{3,4}$/.test(data.cardCvc.trim())) errors.cardCvc = 'Enter a valid CVC.'

  return errors
}

export default function Checkout() {
  const { lines, subtotal, shippingCost, total, clearCart } = useCart()
  const [form, setForm] = useState<CheckoutFormData>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const orderNumber = useRef(`KORA-${Math.floor(100000 + Math.random() * 900000)}`)

  function update<K extends keyof CheckoutFormData>(key: K, value: CheckoutFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validation = validate(form)
    setErrors(validation)

    if (Object.keys(validation).length > 0) {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('success')
      clearCart()
    }, 1300)
  }

  if (lines.length === 0 && status !== 'success') {
    return <Navigate to="/cart" replace />
  }

  if (status === 'success') {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
        <p className="eyebrow">Order confirmed</p>
        <h1 className="mt-4 max-w-[24ch] text-3xl leading-[1.15] sm:text-4xl">
          Thank you, {form.firstName}.
        </h1>
        <p className="mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft">
          Order {orderNumber.current} has been placed. A confirmation would
          normally be sent to {form.email}.
        </p>
        <div className="mt-6 border border-line bg-bone px-5 py-4">
          <p className="max-w-[46ch] text-sm leading-relaxed text-ink-soft">
            This is a portfolio demonstration — no payment was processed and no
            order has actually been placed.
          </p>
        </div>
        <Link to="/shop" className="btn-primary mt-8">
          Continue shopping
        </Link>
      </section>
    )
  }

  const fieldClass = (hasError: boolean) =>
    `field-input ${hasError ? 'border-signal' : ''}`

  return (
    <section className="section-pad">
      <div className="container-editorial">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-3 text-3xl leading-[1.15] sm:text-4xl">Complete your order</h1>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-10">
            <div>
              <p className="field-label">Contact</p>
              <div className="mt-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass(Boolean(errors.email))}
                />
                {errors.email && <p className="mt-1.5 text-xs text-signal">{errors.email}</p>}
              </div>
            </div>

            <div>
              <p className="field-label">Shipping address</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    aria-invalid={Boolean(errors.firstName)}
                    className={fieldClass(Boolean(errors.firstName))}
                  />
                  {errors.firstName && <p className="mt-1.5 text-xs text-signal">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    aria-invalid={Boolean(errors.lastName)}
                    className={fieldClass(Boolean(errors.lastName))}
                  />
                  {errors.lastName && <p className="mt-1.5 text-xs text-signal">{errors.lastName}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="sr-only">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    aria-invalid={Boolean(errors.address)}
                    className={fieldClass(Boolean(errors.address))}
                  />
                  {errors.address && <p className="mt-1.5 text-xs text-signal">{errors.address}</p>}
                </div>
                <div>
                  <label htmlFor="city" className="sr-only">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    aria-invalid={Boolean(errors.city)}
                    className={fieldClass(Boolean(errors.city))}
                  />
                  {errors.city && <p className="mt-1.5 text-xs text-signal">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="postcode" className="sr-only">
                    Postal code
                  </label>
                  <input
                    id="postcode"
                    type="text"
                    placeholder="Postal code"
                    autoComplete="postal-code"
                    value={form.postcode}
                    onChange={(e) => update('postcode', e.target.value)}
                    aria-invalid={Boolean(errors.postcode)}
                    className={fieldClass(Boolean(errors.postcode))}
                  />
                  {errors.postcode && <p className="mt-1.5 text-xs text-signal">{errors.postcode}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="country" className="field-label">
                    Country
                  </label>
                  <select
                    id="country"
                    value={form.country}
                    onChange={(e) => update('country', e.target.value)}
                    className="field-input mt-2"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Nigeria</option>
                    <option>Canada</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <p className="field-label">Payment</p>
              <div className="mt-4 grid gap-4">
                <div>
                  <label htmlFor="cardName" className="sr-only">
                    Name on card
                  </label>
                  <input
                    id="cardName"
                    type="text"
                    placeholder="Name on card"
                    autoComplete="cc-name"
                    value={form.cardName}
                    onChange={(e) => update('cardName', e.target.value)}
                    aria-invalid={Boolean(errors.cardName)}
                    className={fieldClass(Boolean(errors.cardName))}
                  />
                  {errors.cardName && <p className="mt-1.5 text-xs text-signal">{errors.cardName}</p>}
                </div>
                <div>
                  <label htmlFor="cardNumber" className="sr-only">
                    Card number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    inputMode="numeric"
                    placeholder="Card number"
                    autoComplete="cc-number"
                    value={form.cardNumber}
                    onChange={(e) => update('cardNumber', e.target.value)}
                    aria-invalid={Boolean(errors.cardNumber)}
                    className={fieldClass(Boolean(errors.cardNumber))}
                  />
                  {errors.cardNumber && <p className="mt-1.5 text-xs text-signal">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="sr-only">
                      Expiry
                    </label>
                    <input
                      id="cardExpiry"
                      type="text"
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      value={form.cardExpiry}
                      onChange={(e) => update('cardExpiry', e.target.value)}
                      aria-invalid={Boolean(errors.cardExpiry)}
                      className={fieldClass(Boolean(errors.cardExpiry))}
                    />
                    {errors.cardExpiry && <p className="mt-1.5 text-xs text-signal">{errors.cardExpiry}</p>}
                  </div>
                  <div>
                    <label htmlFor="cardCvc" className="sr-only">
                      CVC
                    </label>
                    <input
                      id="cardCvc"
                      type="text"
                      inputMode="numeric"
                      placeholder="CVC"
                      autoComplete="cc-csc"
                      value={form.cardCvc}
                      onChange={(e) => update('cardCvc', e.target.value)}
                      aria-invalid={Boolean(errors.cardCvc)}
                      className={fieldClass(Boolean(errors.cardCvc))}
                    />
                    {errors.cardCvc && <p className="mt-1.5 text-xs text-signal">{errors.cardCvc}</p>}
                  </div>
                </div>
                <p className="text-xs text-ink-soft">
                  This is a demonstration checkout. No payment is processed.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary w-full disabled:cursor-wait"
            >
              {status === 'submitting' ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-bone-soft/40 border-t-bone-soft"
                  />
                  Placing order
                </>
              ) : (
                `Place order — ${formatPrice(total)}`
              )}
            </button>
          </form>

          <div className="border border-line p-6">
            <p className="eyebrow">Order summary</p>
            <ul className="mt-5 space-y-4">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.size}`} className="flex gap-4">
                  <img
                    src={line.product.images[0]}
                    alt={line.product.name}
                    className="h-20 w-14 object-cover"
                  />
                  <div className="flex flex-1 justify-between text-sm">
                    <div>
                      <p className="text-ink">{line.product.name}</p>
                      <p className="mt-1 text-ink-soft">
                        Size {line.size} — Qty {line.quantity}
                      </p>
                    </div>
                    <p className="text-ink">{formatPrice(line.product.price * line.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd className="text-ink">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <dt className="text-ink">Total</dt>
                <dd className="text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
