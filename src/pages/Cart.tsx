import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import QuantityStepper from '../components/ui/QuantityStepper'
import { brand } from '../data/site'

export default function Cart() {
  const { lines, subtotal, shippingCost, freeShippingRemaining, total, removeItem, setQuantity } =
    useCart()

  if (lines.length === 0) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <p className="eyebrow">Your bag</p>
        <h1 className="mt-4 text-3xl leading-[1.15] sm:text-4xl">Your bag is empty.</h1>
        <p className="mt-4 max-w-[42ch] text-[1.05rem] leading-relaxed text-ink-soft">
          Explore the current collection and find something worth carrying home.
        </p>
        <Link to="/shop" className="btn-primary mt-8">
          Shop the collection
        </Link>
      </section>
    )
  }

  return (
    <section className="section-pad">
      <div className="container-editorial">
        <p className="eyebrow">Your bag</p>
        <h1 className="mt-3 text-3xl leading-[1.15] sm:text-4xl">
          {lines.reduce((n, l) => n + l.quantity, 0)} {lines.length === 1 ? 'item' : 'items'}
        </h1>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.size}`} className="flex gap-5 py-8 sm:gap-8">
                <Link to={`/shop/${line.product.slug}`} className="shrink-0">
                  <img
                    src={line.product.images[0]}
                    alt={line.product.name}
                    className="h-40 w-28 object-cover sm:h-48 sm:w-36"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link to={`/shop/${line.product.slug}`} className="text-base text-ink hover:underline">
                        {line.product.name}
                      </Link>
                      <p className="mt-1 text-sm text-ink-soft">
                        Size {line.size} — {line.product.colour}
                      </p>
                      <p className="mt-1 text-sm text-ink-soft">{formatPrice(line.product.price)}</p>
                    </div>
                    <p className="whitespace-nowrap text-sm text-ink">
                      {formatPrice(line.product.price * line.quantity)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <QuantityStepper
                      value={line.quantity}
                      onChange={(q) => setQuantity(line.productId, line.size, q)}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(line.productId, line.size)}
                      className="text-xs uppercase tracking-wideish text-ink-soft underline decoration-ink/20 underline-offset-4 hover:text-ink hover:decoration-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <div className="border border-line p-6">
              <p className="eyebrow">Order summary</p>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Subtotal</dt>
                  <dd className="text-ink">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Shipping</dt>
                  <dd className="text-ink">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</dd>
                </div>
              </dl>

              {freeShippingRemaining > 0 && (
                <p className="mt-4 text-xs text-ink-soft">
                  Add {formatPrice(freeShippingRemaining)} more for free shipping.
                </p>
              )}

              <div className="mt-5 flex justify-between border-t border-line pt-5 text-sm">
                <span className="text-ink">Total</span>
                <span className="text-ink">{formatPrice(total)}</span>
              </div>

              <Link to="/checkout" className="btn-primary mt-6 w-full">
                Checkout
              </Link>
              <Link to="/shop" className="btn-text mt-5 w-full justify-center">
                Continue shopping
              </Link>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-ink-soft">
              Free standard shipping on orders over ${brand.shipping.freeThreshold}. Taxes
              calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
