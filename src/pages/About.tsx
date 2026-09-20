export default function About() {
  return (
    <>
      <section className="section-pad border-b border-line">
        <div className="container-editorial grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 max-w-[16ch] text-4xl leading-[1.1] sm:text-5xl">
              Clothes built to outlast the season they were made for.
            </h1>
          </div>
          <div className="max-w-[52ch] self-end">
            <p className="text-[1.05rem] leading-relaxed text-ink-soft">
              Kora is an independent studio working in small runs. We design
              first, source second, and only put a piece into production once
              both hold up under actual wear — not just under studio light.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="grid lg:grid-cols-2">
          <img
            src={`${import.meta.env.BASE_URL}images/about-01.jpg`}
            alt="Materials and fabric detail at the Kora studio"
            className="h-[42vh] w-full object-cover lg:h-full lg:min-h-[480px]"
            loading="lazy"
          />
          <div className="flex flex-col justify-center px-6 py-14 sm:px-8 lg:px-14">
            <p className="eyebrow">Materials</p>
            <p className="mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft">
              We work with a short list of fabrics we trust — virgin wool,
              cotton twill, silk, full-grain leather — and stay with them
              season over season rather than chasing what’s new. Every fabric
              is tested against the specific garment it’s built for before it
              is approved.
            </p>
            <p className="mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Runs are kept deliberately small. We would rather sell out of a
              piece than overproduce it.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-line bg-bone">
        <div className="container-editorial grid gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 className="max-w-[18ch] text-3xl leading-[1.15] sm:text-4xl">
            Modern by instinct, not by explanation.
          </h2>
          <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-ink-soft">
            The studio’s reference points sit somewhere between West African
            tailoring and the pared-back construction we admired in European
            ready-to-wear. We don’t treat those as separate ideas to balance —
            they show up in the same silhouette, the same seam, the same
            fabric choice. Nothing here is labelled as a cultural reference.
            It’s simply how the studio designs.
          </p>
        </div>
      </section>

      <section className="section-pad border-b border-line">
        <div className="container-editorial grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <img
            src={`${import.meta.env.BASE_URL}images/about-02.jpg`}
            alt="Atelier detail at the Kora studio"
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Production</p>
            <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl">
              Made in small batches, on purpose.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Every collection is produced with a small group of workshops we
              return to season after season, at volumes we set in advance
              rather than scale up mid-season. It costs more to work this way.
              We think it’s the only way to stand behind what we make.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-editorial max-w-2xl">
          <p className="eyebrow">In short</p>
          <p className="mt-4 text-2xl leading-[1.5] text-ink sm:text-[1.7rem]">
            Fewer pieces, considered longer, worn more. That’s the whole idea
            behind Kora — everything else is detail.
          </p>
        </div>
      </section>
    </>
  )
}
