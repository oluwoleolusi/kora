import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import type { Size } from '../types'
import { getProductBySlug, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductGallery from '../components/product/ProductGallery'
import SizeSelector from '../components/product/SizeSelector'
import QuantityStepper from '../components/ui/QuantityStepper'
import Accordion from '../components/ui/Accordion'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState<string | undefined>()
  const [added, setAdded] = useState(false)

  if (!product) {
    return <Navigate to="/shop" replace />
  }

  const requiresSize = product.sizes.length > 1

  function handleAddToCart() {
    if (!product) return
    if (requiresSize && !selectedSize) {
      setSizeError('Select a size to continue.')
      return
    }
    setSizeError(undefined)
    addItem(product.id, selectedSize ?? product.sizes[0], quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <section className="section-pad">
      <div className="container-editorial">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-ink-soft">
          <Link to="/shop" className="hover:text-ink">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-3 text-3xl leading-[1.15] sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-lg text-ink">{formatPrice(product.price)}</p>

            <p className="mt-6 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-soft">
              {product.description}
            </p>

            <div className="mt-8 space-y-8">
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onSelect={(size) => {
                  setSelectedSize(size)
                  setSizeError(undefined)
                }}
                error={sizeError}
              />

              <div>
                <p className="field-label">Quantity</p>
                <div className="mt-3">
                  <QuantityStepper value={quantity} onChange={setQuantity} />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary w-full sm:w-auto sm:min-w-[260px]"
              >
                {added ? 'Added to bag' : 'Add to bag'}
              </button>
            </div>

            <div className="mt-12">
              <Accordion
                defaultOpen={null}
                items={[
                  {
                    title: 'Details & care',
                    content: (
                      <div>
                        <p>{product.material}</p>
                        <ul className="mt-3 space-y-1.5">
                          {product.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                  },
                  {
                    title: 'Shipping & returns',
                    content: (
                      <p>
                        Free standard shipping on orders over $250. Returns are
                        accepted within 30 days of delivery, provided the item is
                        unworn and tags are attached.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
