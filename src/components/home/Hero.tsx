import { Link } from 'react-router-dom'
import { brand } from '../../data/site'

export default function Hero() {
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}images/hero.jpg`}
        alt="Kora, autumn/winter 2026 campaign"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-editorial flex flex-col items-start gap-5 pb-14">
          <p className="font-display text-5xl tracking-wider2 text-bone-soft sm:text-6xl">
            {brand.name.toUpperCase()}
          </p>
          <p className="text-[0.8rem] uppercase tracking-wider2 text-bone-soft/85">
            {brand.season}
          </p>
          <Link to="/shop" className="btn-ghost-light mt-2">
            Shop the collection
          </Link>
        </div>
      </div>
    </section>
  )
}
