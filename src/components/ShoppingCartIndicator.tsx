'use client'

import { useContext } from 'react'
import { ShoppingCartContext } from './ShoppingCartContext'
import Link from 'next/link'

export function ShoppingCartIndicator() {
  const { items } = useContext(ShoppingCartContext)

  return (
    <Link href={`/shopping_cart`}>
      <div>Items: {items.length}</div>
    </Link>
  )
}
