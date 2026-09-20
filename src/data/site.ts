export const brand = {
  name: 'Kora',
  season: 'Autumn / Winter 2026',
  email: 'hello@kora-studio.com',
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
  ],
  shipping: {
    freeThreshold: 250,
    standardCost: 12,
  },
}

export const navLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/about', label: 'About' },
]

export const footerColumns = {
  shop: [
    { to: '/shop', label: 'All products' },
    { to: '/shop?category=New+Arrivals', label: 'New arrivals' },
    { to: '/shop?category=Outerwear', label: 'Outerwear' },
    { to: '/shop?category=Accessories', label: 'Accessories' },
  ],
  brand: [
    { to: '/about', label: 'About' },
    { to: '/lookbook', label: 'Lookbook' },
  ],
}
