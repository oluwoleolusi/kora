import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { CartLine, CartLineDetailed, Size } from '../types'
import { products } from '../data/products'
import { brand } from '../data/site'

const STORAGE_KEY = 'kora-cart-v1'

type Action =
  | { type: 'ADD'; productId: string; size: Size; quantity: number }
  | { type: 'REMOVE'; productId: string; size: Size }
  | { type: 'SET_QUANTITY'; productId: string; size: Size; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; lines: CartLine[] }

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'HYDRATE':
      return action.lines
    case 'ADD': {
      const existing = state.find(
        (l) => l.productId === action.productId && l.size === action.size,
      )
      if (existing) {
        return state.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + action.quantity } : l,
        )
      }
      return [...state, { productId: action.productId, size: action.size, quantity: action.quantity }]
    }
    case 'REMOVE':
      return state.filter((l) => !(l.productId === action.productId && l.size === action.size))
    case 'SET_QUANTITY':
      return state
        .map((l) =>
          l.productId === action.productId && l.size === action.size
            ? { ...l, quantity: action.quantity }
            : l,
        )
        .filter((l) => l.quantity > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

interface CartContextValue {
  lines: CartLineDetailed[]
  lineCount: number
  subtotal: number
  shippingCost: number
  freeShippingRemaining: number
  total: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (productId: string, size: Size, quantity?: number) => void
  removeItem: (productId: string, size: Size) => void
  setQuantity: (productId: string, size: Size, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

// Looked up by catalogue id whenever the cart needs full product details.
function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, [])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[]
        dispatch({ type: 'HYDRATE', lines: parsed })
      }
    } catch {
      // ignore malformed storage
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // storage may be unavailable — cart still works for the session
    }
  }, [lines, hydrated])

  const detailedLines = useMemo<CartLineDetailed[]>(() => {
    return lines
      .map((line) => {
        const product = getProductById(line.productId)
        return product ? { ...line, product } : null
      })
      .filter((l): l is CartLineDetailed => l !== null)
  }, [lines])

  const lineCount = useMemo(
    () => detailedLines.reduce((sum, l) => sum + l.quantity, 0),
    [detailedLines],
  )

  const subtotal = useMemo(
    () => detailedLines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [detailedLines],
  )

  const shippingCost = subtotal === 0 || subtotal >= brand.shipping.freeThreshold
    ? 0
    : brand.shipping.standardCost

  const freeShippingRemaining = Math.max(0, brand.shipping.freeThreshold - subtotal)

  const total = subtotal + shippingCost

  const addItem = useCallback((productId: string, size: Size, quantity = 1) => {
    dispatch({ type: 'ADD', productId, size, quantity })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string, size: Size) => {
    dispatch({ type: 'REMOVE', productId, size })
  }, [])

  const setQuantity = useCallback((productId: string, size: Size, quantity: number) => {
    dispatch({ type: 'SET_QUANTITY', productId, size, quantity })
  }, [])

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const value: CartContextValue = {
    lines: detailedLines,
    lineCount,
    subtotal,
    shippingCost,
    freeShippingRemaining,
    total,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
