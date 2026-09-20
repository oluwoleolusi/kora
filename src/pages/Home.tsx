import Hero from '../components/home/Hero'
import FeaturedCollection from '../components/home/FeaturedCollection'
import EditorialSection from '../components/home/EditorialSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BrandStatement from '../components/home/BrandStatement'
import Newsletter from '../components/home/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <EditorialSection />
      <FeaturedProducts />
      <BrandStatement />
      <Newsletter />
    </>
  )
}
