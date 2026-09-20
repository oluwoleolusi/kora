import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SortOption } from '../types'
import { products } from '../data/products'
import CategoryTabs from '../components/shop/CategoryTabs'
import type { ShopCategory } from '../components/shop/CategoryTabs'
import SortSelect from '../components/shop/SortSelect'
import ProductCard from '../components/product/ProductCard'

function isShopCategory(value: string | null): value is ShopCategory {
  return (
    value === 'All' ||
    value === 'New Arrivals' ||
    value === 'Ready-to-Wear' ||
    value === 'Outerwear' ||
    value === 'Knitwear' ||
    value === 'Accessories'
  )
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const activeCategory: ShopCategory = isShopCategory(categoryParam) ? categoryParam : 'All'
  const [sort, setSort] = useState<SortOption>('featured')

  function handleCategoryChange(category: ShopCategory) {
    if (category === 'All') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', category)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = products
    if (activeCategory === 'New Arrivals') {
      list = list.filter((p) => p.isNew)
    } else if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory)
    }

    const sorted = [...list]
    switch (sort) {
      case 'newest':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
        break
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }
    return sorted
  }, [activeCategory, sort])

  return (
    <section className="section-pad">
      <div className="container-editorial">
        <div className="max-w-xl">
          <p className="eyebrow">Shop</p>
          <h1 className="mt-3 text-4xl leading-[1.1] sm:text-5xl">The Collection</h1>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />
          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <p className="text-xs text-ink-soft">
              {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            </p>
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-ink-soft">No products in this category yet.</p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
