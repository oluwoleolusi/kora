import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import ProductCard from '../product/ProductCard'

const featuredSlugs = [
  'sena-structured-jacket',
  'obi-merino-turtleneck',
  'tolu-silk-slip-dress',
  'nia-structured-tote',
]

export default function FeaturedProducts() {
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[number] => Boolean(p))

  return (
    <section className="section-pad border-b border-line">
      <div className="container-editorial">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Shop</p>
            <h2 className="mt-3 text-3xl leading-[1.15] sm:text-4xl">Recently added</h2>
          </div>
          <Link to="/shop" className="btn-text">
            View the collection
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
