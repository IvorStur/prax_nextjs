'use client'
import { createContext } from 'react'

export type ShoppingCart = {
  items: { id: number; count: number }[]
  addItem: (item: number) => void
  removeItem: (item: number) => void
  deleteItem: (item: number) => void
}

export const ShoppingCartContext = createContext<ShoppingCart>({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
  deleteItem: (item) => {},
})
