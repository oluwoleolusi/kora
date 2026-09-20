import type { Product } from '../types'

const apparelSizes: Product['sizes'] = ['XS', 'S', 'M', 'L', 'XL']
const oneSize: Product['sizes'] = ['One Size']

export const products: Product[] = [
  {
    id: 'p01',
    slug: 'sena-structured-jacket',
    name: 'Sena Structured Jacket',
    price: 285,
    category: 'Outerwear',
    colour: 'Stone',
    material: 'Cotton / linen blend',
    description:
      'A clean-lined structured jacket built around a relaxed contemporary silhouette. Cut for layering, with a fall that holds its shape through the day.',
    details: [
      'Cotton / linen blend, mid-weight',
      'Structured shoulder, relaxed body',
      'Dry clean recommended',
      'Designed in-house, made in Portugal',
    ],
    sizes: apparelSizes,
    images: [`${import.meta.env.BASE_URL}images/product-01.jpg`, `${import.meta.env.BASE_URL}images/product-01-alt.jpg`],
    isNew: true,
  },
  {
    id: 'p02',
    slug: 'kessie-wool-overcoat',
    name: 'Kessie Wool Overcoat',
    price: 420,
    category: 'Outerwear',
    colour: 'Charcoal',
    material: 'Virgin wool',
    description:
      'A full-length overcoat in heavyweight virgin wool. Considered proportions, a single closure, and enough room to layer a knit beneath.',
    details: [
      '100% virgin wool',
      'Single-button closure, notched lapel',
      'Interior pocket',
      'Dry clean only',
    ],
    sizes: apparelSizes,
    images: [`${import.meta.env.BASE_URL}images/product-02.jpg`, `${import.meta.env.BASE_URL}images/product-02-alt.jpg`],
    isNew: false,
  },
  {
    id: 'p03',
    slug: 'zuri-wool-blend-blazer',
    name: 'Zuri Wool-Blend Blazer',
    price: 340,
    category: 'Outerwear',
    colour: 'Bone',
    material: 'Wool blend',
    description:
      'A softly tailored blazer that trades stiffness for movement. Works equally over a shirt or alone as outerwear on warmer days.',
    details: [
      'Wool blend with a soft hand-feel',
      'Single vent, welt pockets',
      'Half-lined for warmer-weather wear',
      'Dry clean recommended',
    ],
    sizes: apparelSizes,
    images: [`${import.meta.env.BASE_URL}images/product-03.jpg`, `${import.meta.env.BASE_URL}images/product-03-alt.jpg`],
    isNew: false,
  },
  {
    id: 'p04',
    slug: 'amara-wide-leg-trouser',
    name: 'Amara Wide-Leg Trouser',
    price: 195,
    category: 'Ready-to-Wear',
    colour: 'Stone',
    material: 'Cotton twill',
    description:
      'A high-rise, wide-leg trouser in heavyweight cotton twill. Sits cleanly at the waist and falls straight through the leg.',
    details: [
      'Heavyweight cotton twill',
      'High-rise, straight through the leg',
      'Concealed side zip',
      'Machine washable, cold',
    ],
    sizes: apparelSizes,
    images: [`${import.meta.env.BASE_URL}images/product-04.jpg`, `${import.meta.env.BASE_URL}images/product-04-alt.jpg`],
    isNew: false,
  },
  {
    id: 'p05',
    slug: 'tolu-silk-slip-dress',
    name: 'Tolu Silk Slip Dress',
    price: 260,
    category: 'Ready-to-Wear',
    colour: 'Bone',
    material: '100% silk',
    description:
      'A bias-cut slip dress in weighted silk, designed to move with the body rather than cling to it. Wears equally well alone or layered.',
    details: [
      '100% silk, bias cut',
      'Adjustable straps',
      'Dry clean only',
      'Made in limited quantity',
    ],
    sizes: apparelSizes,
    images: [`${import.meta.env.BASE_URL}images/product-05.jpg`, `${import.meta.env.BASE_URL}images/product-05-alt.jpg`],
    isNew: true,
  },
  {
    id: 'p06',
    slug: 'dara-pleated-midi-skirt',
    name: 'Dara Pleated Midi Skirt',
    price: 175,
    category: 'Ready-to-Wear',
    colour: 'Charcoal',
    material: 'Crepe',
    description:
      'A permanently pleated midi skirt in fluid crepe. Holds its structure in motion and packs flat for travel.',
    details: [
      'Crepe, permanent pleat',
      'Elasticated waistband',
      'Machine washable, cold, gentle cycle',
    ],
    sizes: apparelSizes,
    images: [`${import.meta.env.BASE_URL}images/product-06.jpg`, `${import.meta.env.BASE_URL}images/product-06-alt.jpg`],
    isNew: false,
  },
  {
    id: 'p07',
    slug: 'ilo-cotton-poplin-shirt',
    name: 'Ilo Cotton Poplin Shirt',
    price: 145,
    category: 'Ready-to-Wear',
    colour: 'Bone',
    material: 'Cotton poplin',
    description:
      'An oversized poplin shirt with a dropped shoulder and a slightly extended hem. Built to be worn open, tucked, or on its own.',
    details: [
      '100% cotton poplin',
      'Dropped shoulder, extended hem',
      'Mother-of-pearl buttons',
      'Machine washable, cold',
    ],
    sizes: apparelSizes,
    images: [`${import.meta.env.BASE_URL}images/product-07.jpg`, `${import.meta.env.BASE_URL}images/product-07-alt.jpg`],
    isNew: false,
  },
  {
    id: 'p08',
    slug: 'obi-merino-turtleneck',
    name: 'Obi Merino Turtleneck',
    price: 165,
    category: 'Knitwear',
    colour: 'Stone',
    material: 'Merino wool',
    description:
      'A fine-gauge merino turtleneck, cut close without restricting movement. A foundation piece built to layer under or wear alone.',
    details: [
      '100% merino wool, fine gauge',
      'Ribbed collar, cuff and hem',
      'Hand wash cold',
    ],
    sizes: apparelSizes,
    images: [`${import.meta.env.BASE_URL}images/product-08.jpg`, `${import.meta.env.BASE_URL}images/product-08-alt.jpg`],
    isNew: true,
  },
  {
    id: 'p09',
    slug: 'ayo-cable-knit-sweater',
    name: 'Ayo Cable-Knit Sweater',
    price: 210,
    category: 'Knitwear',
    colour: 'Bone',
    material: 'Wool blend',
    description:
      'A hand-finished cable-knit sweater in a relaxed fit. Substantial without feeling heavy, with a crew neck and dropped shoulder seam.',
    details: [
      'Wool blend, hand-finished cabling',
      'Relaxed fit, dropped shoulder',
      'Hand wash cold, dry flat',
    ],
    sizes: apparelSizes,
    images: [`${import.meta.env.BASE_URL}images/product-09.jpg`, `${import.meta.env.BASE_URL}images/product-09-alt.jpg`],
    isNew: false,
  },
  {
    id: 'p10',
    slug: 'femi-leather-belt',
    name: 'Femi Leather Belt',
    price: 95,
    category: 'Accessories',
    colour: 'Black',
    material: 'Full-grain leather',
    description:
      'A full-grain leather belt with a matte brass buckle. Cut slightly wider than standard, meant to be seen rather than hidden under a shirt hem.',
    details: [
      'Full-grain leather, 3.5cm width',
      'Matte brass buckle',
      'Made to be resoled and re-buckled over time',
    ],
    sizes: oneSize,
    images: [`${import.meta.env.BASE_URL}images/product-10.jpg`, `${import.meta.env.BASE_URL}images/product-10-alt.jpg`],
    isNew: false,
  },
  {
    id: 'p11',
    slug: 'nia-structured-tote',
    name: 'Nia Structured Tote',
    price: 230,
    category: 'Accessories',
    colour: 'Black',
    material: 'Leather',
    description:
      'A structured leather tote sized for daily use, with a flat base that holds its shape whether full or empty.',
    details: [
      'Full-grain leather, cotton twill lining',
      'Interior zip and slip pockets',
      'Flat base, reinforced handles',
    ],
    sizes: oneSize,
    images: [`${import.meta.env.BASE_URL}images/product-11.jpg`, `${import.meta.env.BASE_URL}images/product-11-alt.jpg`],
    isNew: true,
  },
  {
    id: 'p12',
    slug: 'kofi-ribbed-beanie',
    name: 'Kofi Ribbed Beanie',
    price: 65,
    category: 'Accessories',
    colour: 'Charcoal',
    material: 'Wool',
    description:
      'A close-fit ribbed beanie in pure wool, finished with a folded brim and a woven label at the seam.',
    details: ['100% wool', 'Folded brim', 'Hand wash cold, dry flat'],
    sizes: oneSize,
    images: [`${import.meta.env.BASE_URL}images/product-12.jpg`, `${import.meta.env.BASE_URL}images/product-12-alt.jpg`],
    isNew: false,
  },
]

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export const categories: Product['category'][] = [
  'Ready-to-Wear',
  'Outerwear',
  'Knitwear',
  'Accessories',
]
