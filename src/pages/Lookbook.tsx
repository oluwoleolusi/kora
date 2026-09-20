import { Link } from 'react-router-dom'
import { lookbookStories } from '../data/lookbook'

export default function Lookbook() {
  return (
    <section className="section-pad">
      <div className="container-editorial">
        <div className="max-w-xl">
          <p className="eyebrow">Lookbook</p>
          <h1 className="mt-3 text-4xl leading-[1.1] sm:text-5xl">Journal</h1>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
            Editorial notes from the current collection — the ideas behind
            the silhouettes, not just the silhouettes themselves.
          </p>
        </div>

        <img
          src={`${import.meta.env.BASE_URL}images/campaign-03.jpg`}
          alt="Kora, studio detail"
          className="mt-12 aspect-[16/9] w-full object-cover"
          loading="lazy"
        />

        <div className="mt-16 space-y-20">
          {lookbookStories.map((story, index) => {
            const reversed = index % 2 === 1
            return (
              <Link
                key={story.slug}
                to={`/lookbook/${story.slug}`}
                className="group grid gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div className={reversed ? 'lg:order-2' : ''}>
                  <img
                    src={story.image}
                    alt={story.title}
                    className="aspect-[4/5] w-full object-cover transition-opacity duration-500 ease-atelier group-hover:opacity-90"
                    loading="lazy"
                  />
                </div>
                <div className={`flex flex-col justify-center ${reversed ? 'lg:order-1' : ''}`}>
                  <p className="eyebrow">{story.season}</p>
                  <h2 className="mt-4 max-w-[16ch] text-3xl leading-[1.15] sm:text-4xl">
                    {story.title}
                  </h2>
                  <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft">
                    {story.excerpt}
                  </p>
                  <span className="btn-text mt-6 w-fit">Read the story</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
