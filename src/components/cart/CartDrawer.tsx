import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../data/products'
import QuantityStepper from '../ui/QuantityStepper'

export default function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, removeItem, setQuantity } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ease-atelier ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone-soft shadow-2xl transition-transform duration-300 ease-atelier ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <p className="eyebrow">Your bag — {lines.reduce((n, l) => n + l.quantity, 0)}</p>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="text-sm uppercase tracking-wideish text-ink-soft hover:text-ink"
          >
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-ink-soft">Your bag is empty.</p>
            <Link to="/shop" onClick={closeCart} className="btn-secondary">
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-line">
                {lines.map((line) => (
                  <li key={`${line.productId}-${line.size}`} className="flex gap-4 py-6">
                    <img
                      src={line.product.images[0]}
                      alt={line.product.name}
                      className="h-28 w-20 shrink-0 object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to={`/shop/${line.product.slug}`}
                            onClick={closeCart}
                            className="text-sm text-ink hover:underline"
                          >
                            {line.product.name}
                          </Link>
                          <p className="mt-1 text-xs text-ink-soft">
                            Size {line.size} — {line.product.colour}
                          </p>
                        </div>
                        <p className="text-sm text-ink">
                          {formatPrice(line.product.price * line.quantity)}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <QuantityStepper
                          value={line.quantity}
                          onChange={(q) => setQuantity(line.productId, line.size, q)}
                          size="sm"
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
            </div>

            <div className="border-t border-line px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Subtotal</span>
                <span className="text-ink">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                to="/cart"
                onClick={closeCart}
                className="btn-primary mt-5 w-full"
              >
                View bag
              </Link>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn-secondary mt-3 w-full"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
