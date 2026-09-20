export default function EditorialSection() {
  return (
    <section className="border-b border-line">
      <div className="grid lg:grid-cols-[1.4fr_0.9fr]">
        <img
          src={`${import.meta.env.BASE_URL}images/editorial.jpg`}
          alt="Kora studio, editorial detail"
          className="h-[52vh] w-full object-cover lg:h-full lg:min-h-[520px]"
          loading="lazy"
        />
        <div className="flex flex-col justify-center px-6 py-14 sm:px-8 lg:px-14">
          <p className="eyebrow">The world of Kora</p>
          <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl">
            Considered from the pattern up.
          </h2>
          <p className="mt-6 max-w-[42ch] text-[1.05rem] leading-relaxed text-ink-soft">
            Every piece starts as a pattern before it becomes a photograph.
            Silhouette is decided first, fabric second, and nothing is added
            that doesn’t earn its place on the body.
          </p>
        </div>
      </div>
    </section>
  )
}
