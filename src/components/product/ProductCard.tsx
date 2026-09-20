import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product, Size } from '../../types'
import { formatPrice } from '../../data/products'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [mode, setMode] = useState<'idle' | 'picking' | 'added'>('idle')

  function handleQuickAdd() {
    if (product.sizes.length === 1) {
      addItem(product.id, product.sizes[0], 1)
      confirmAdded()
      return
    }
    setMode('picking')
  }

  function pickSize(size: Size) {
    addItem(product.id, size, 1)
    confirmAdded()
  }

  function confirmAdded() {
    setMode('added')
    window.setTimeout(() => setMode('idle'), 1600)
  }

  return (
    <div className="group">
      <Link to={`/shop/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-stone/50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-opacity duration-500 ease-atelier group-hover:opacity-0"
          loading="lazy"
        />
        <img
          src={product.images[1]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-atelier group-hover:opacity-100"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-bone-soft/95 px-2 py-1 text-[0.65rem] uppercase tracking-wideish text-ink">
            New
          </span>
        )}
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <Link to={`/shop/${product.slug}`} className="text-[0.95rem] text-ink hover:underline">
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-ink-soft">
            {product.category} — {product.colour}
          </p>
        </div>
        <p className="whitespace-nowrap text-sm text-ink">{formatPrice(product.price)}</p>
      </div>

      <div className="mt-2 min-h-[1.5rem]">
        {mode === 'idle' && (
          <button
            type="button"
            onClick={handleQuickAdd}
            className="text-xs uppercase tracking-wideish text-ink-soft underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Quick add
          </button>
        )}
        {mode === 'picking' && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label={`Select size for ${product.name}`}>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => pickSize(size)}
                className="border border-line px-2 py-0.5 text-xs text-ink transition-colors hover:border-ink"
              >
                {size}
              </button>
            ))}
          </div>
        )}
        {mode === 'added' && <p className="text-xs uppercase tracking-wideish text-ink">Added to bag</p>}
      </div>
    </div>
  )
}
