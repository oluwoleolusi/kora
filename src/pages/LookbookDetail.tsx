import { Link, Navigate, useParams } from 'react-router-dom'
import { getStoryBySlug, lookbookStories } from '../data/lookbook'

export default function LookbookDetail() {
  const { slug } = useParams<{ slug: string }>()
  const story = slug ? getStoryBySlug(slug) : undefined

  if (!story) {
    return <Navigate to="/lookbook" replace />
  }

  const currentIndex = lookbookStories.findIndex((s) => s.slug === story.slug)
  const next = lookbookStories[(currentIndex + 1) % lookbookStories.length]

  return (
    <article>
      <section className="relative">
        <img
          src={story.image}
          alt={story.title}
          className="h-[60vh] w-full object-cover sm:h-[70vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
        <div className="container-editorial absolute inset-0 flex flex-col justify-end pb-10">
          <p className="eyebrow text-bone-soft">{story.season}</p>
          <h1 className="mt-3 max-w-[18ch] text-4xl text-bone-soft sm:text-5xl">
            {story.title}
          </h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-editorial max-w-2xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-ink-soft">
            <Link to="/lookbook" className="hover:text-ink">
              Lookbook
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{story.title}</span>
          </nav>

          <div className="space-y-6">
            {story.body.map((paragraph, index) => (
              <p key={index} className="text-[1.05rem] leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-line pt-8">
            <Link to="/shop" className="btn-text">
              Shop the collection
            </Link>
            <Link to={`/lookbook/${next.slug}`} className="btn-text">
              Next story
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
