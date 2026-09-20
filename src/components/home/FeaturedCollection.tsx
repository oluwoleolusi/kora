import { Link } from 'react-router-dom'

export default function FeaturedCollection() {
  return (
    <section className="section-pad border-b border-line">
      <div className="container-editorial">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">New arrivals</p>
            <h2 className="mt-3 max-w-[18ch] text-3xl leading-[1.15] sm:text-4xl">
              The season’s opening pieces
            </h2>
          </div>
          <Link to="/shop?category=New+Arrivals" className="btn-text">
            View all
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <img
            src={`${import.meta.env.BASE_URL}images/campaign-01.jpg`}
            alt="Kora campaign, new arrivals"
            className="aspect-[4/5] w-full object-cover lg:col-span-7 lg:aspect-auto lg:h-full"
          />
          <div className="grid gap-4 lg:col-span-5">
            <img
              src={`${import.meta.env.BASE_URL}images/campaign-02.jpg`}
              alt="Kora campaign detail"
              className="aspect-[5/4] w-full object-cover"
            />
            <img
              src={`${import.meta.env.BASE_URL}images/campaign-04.jpg`}
              alt="Kora campaign detail"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
