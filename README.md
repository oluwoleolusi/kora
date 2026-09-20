# Kora

A portfolio concept e-commerce site for a fictional independent contemporary
fashion label. Frontend-only — no backend, payment processor, or database.
Cart state is real (persisted to `localStorage`); checkout is a validated
demo flow that doesn't process a real payment.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- React Context + `useReducer` for cart state (no external state library)

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`).

## Building for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploying

Static site, pre-configured for **Netlify**:

1. Push to a Git repository.
2. Netlify → "Add new site" → import the repo.
3. Build command `npm run build`, publish directory `dist` (already set in
   `netlify.toml`).
4. Deploy.

`public/_redirects` + `netlify.toml` both handle the SPA fallback
(`/*` → `/index.html`) that client-side routes like `/shop/:slug` need so a
direct link or page refresh doesn't 404. For other static hosts, replicate
that same rewrite rule.

## Project structure

```
src/
  components/
    layout/        Navbar, Footer, ScrollToTop
    home/           Homepage sections (Hero, FeaturedCollection, etc.)
    shop/           Category tabs, sort control
    product/        ProductCard, ProductGallery, SizeSelector
    cart/           CartDrawer (slide-in bag)
    ui/             Shared bits (Accordion, QuantityStepper)
  context/
    CartContext.tsx  Cart state, derived totals, localStorage sync
  data/
    products.ts      Full product catalogue + price formatter
    site.ts          Nav links, footer content, shipping threshold
    lookbook.ts       Editorial story content
  pages/             One file per route
  types/              Shared TypeScript types
public/
  images/             Placeholder photography (see below)
  _redirects          Netlify SPA fallback
```

## Replacing the placeholder images

Every image is a generated placeholder in Kora's own palette, watermarked
"Placeholder — replace." Drop in real photography using the **same
filenames** and nothing else needs to change:

| File(s)                              | Used for                              |
| -------------------------------------- | --------------------------------------- |
| `hero.jpg`                             | Homepage hero (full-bleed campaign)     |
| `campaign-01.jpg`, `campaign-02.jpg`, `campaign-04.jpg` | Homepage "New arrivals" section |
| `campaign-03.jpg`                      | Lookbook page banner                    |
| `editorial.jpg`                        | Homepage "world of Kora" section        |
| `about-01.jpg`, `about-02.jpg`         | About page                              |
| `lookbook-01.jpg` … `lookbook-03.jpg`  | Lookbook cover + detail images          |
| `product-01.jpg` … `product-12.jpg`    | Product main image (one per product, in catalogue order — see `src/data/products.ts`) |
| `product-01-alt.jpg` … `product-12-alt.jpg` | Product secondary image (gallery thumbnail + card hover-swap) |

Aspect ratios are locked via CSS (`object-cover`), so a same-named
replacement drops in without touching any component.

## Content that's easy to find and edit

- **Products, prices, materials, sizes** → `src/data/products.ts`
- **Shipping threshold, nav links, footer, social links** → `src/data/site.ts`
- **Lookbook stories** → `src/data/lookbook.ts`
- **About page copy** → `src/pages/About.tsx`

## How the demo interactions work

- **Cart**: fully functional frontend state — add, remove, change quantity,
  subtotal/shipping/total math, persisted to `localStorage` so it survives a
  refresh. There is no server; nothing is synced anywhere else.
- **Quick add** (on product cards): adds directly if the product has a
  single size, otherwise reveals an inline size picker.
- **Product detail**: requires a size selection before "Add to bag" succeeds
  for multi-size items; shows an inline validation message otherwise.
- **Checkout**: validates all fields (email format, card number length,
  MM/YY expiry, CVC), shows a loading state, then a confirmation screen that
  says plainly no real payment was processed. The cart is cleared on
  confirmation, matching a real checkout's behaviour.
- **Newsletter**: validates the email and shows a success message. Nothing
  is sent anywhere.

Wiring any of this to a real backend would mean replacing `CartContext`'s
`localStorage` calls with API calls, and replacing the `setTimeout` calls in
`Checkout.tsx` / `Newsletter.tsx` with real request handling — the
surrounding form/validation/UI logic is already structured to support that.
