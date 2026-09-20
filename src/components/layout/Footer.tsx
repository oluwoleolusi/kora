import { Link } from 'react-router-dom'
import { brand, footerColumns } from '../../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="container-editorial grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl tracking-wider2">{brand.name}</p>
          <p className="mt-4 max-w-[30ch] text-sm text-ink-soft">
            Considered silhouettes and premium materials, from an independent
            studio.
          </p>
          <div className="mt-6 flex gap-4 text-sm">
            {brand.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="field-label">Shop</p>
          <ul className="mt-4 space-y-3 text-sm">
            {footerColumns.shop.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-ink-soft hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="field-label">Studio</p>
          <ul className="mt-4 space-y-3 text-sm">
            {footerColumns.brand.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-ink-soft hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${brand.email}`} className="text-ink-soft hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="field-label">Shipping &amp; returns</p>
          <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-ink-soft">
            Free standard shipping on orders over ${brand.shipping.freeThreshold}.
            Returns accepted within 30 days, unworn and with tags attached.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-editorial flex flex-col gap-2 py-6 text-xs text-ink-soft sm:flex-row sm:justify-between">
          <p>&copy; {year} {brand.name}. All rights reserved.</p>
          <p>Design &amp; development portfolio concept.</p>
        </div>
      </div>
    </footer>
  )
}
