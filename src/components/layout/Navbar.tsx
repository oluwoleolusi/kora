import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { navLinks } from '../../data/site'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { lineCount, openCart } = useCart()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[0.8rem] uppercase tracking-wideish transition-colors duration-200 hover:text-ink ${
      isActive ? 'text-ink' : 'text-ink-soft'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bone-soft/95 backdrop-blur">
      <a
        href="#main"
        className="absolute left-4 top-2 -translate-y-16 bg-ink px-4 py-2 text-bone-soft transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <nav className="container-editorial flex h-20 items-center justify-between">
        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? 'translate-y-[3.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? '-translate-y-[3.5px] -rotate-45' : ''
            }`}
          />
        </button>

        <Link
          to="/"
          className="font-display text-2xl tracking-wider2 text-ink"
          onClick={() => setOpen(false)}
        >
          KORA
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={openCart}
          className="text-[0.8rem] uppercase tracking-wideish text-ink-soft transition-colors hover:text-ink"
          aria-label={`Open cart, ${lineCount} ${lineCount === 1 ? 'item' : 'items'}`}
        >
          Cart {lineCount > 0 && <span className="text-ink">({lineCount})</span>}
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={`absolute left-0 right-0 top-full z-40 min-h-[calc(100dvh-5rem)] bg-[#F8F6F2] transition-opacity duration-300 ease-atelier md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="container-editorial flex flex-col items-start gap-6 pt-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="font-display text-4xl leading-tight text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}
