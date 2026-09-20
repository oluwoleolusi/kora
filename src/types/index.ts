export type ProductCategory = 'Ready-to-Wear' | 'Outerwear' | 'Knitwear' | 'Accessories'

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'One Size'

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  category: ProductCategory
  colour: string
  material: string
  description: string
  details: string[]
  sizes: Size[]
  images: [string, string]
  isNew: boolean
}

export interface CartLine {
  productId: string
  size: Size
  quantity: number
}

export interface CartLineDetailed extends CartLine {
  product: Product
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc'

export interface LookbookStory {
  slug: string
  title: string
  season: string
  image: string
  excerpt: string
  body: string[]
}

export interface NewsletterFormData {
  email: string
}

export interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  postcode: string
  country: string
  cardName: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
}
