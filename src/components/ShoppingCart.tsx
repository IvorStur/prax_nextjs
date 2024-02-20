'use client'
import { useContext } from 'react'
import { ShoppingCartContext } from './ShoppingCartContext'
import { ShoppingCartItem } from './ShoppingCartItem'

export function ShoppingCart() {
  const { items } = useContext(ShoppingCartContext)

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <ShoppingCartItem id={item.id} count={item.count} />
      ))}
    </div>
  )
}
