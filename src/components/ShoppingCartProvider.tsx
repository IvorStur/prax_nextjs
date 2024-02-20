'use client'

import { useState } from 'react'
import { ShoppingCartContext, ShoppingCart } from './ShoppingCartContext'

type Props = {
  children: any
}

export function ShoppingCartProvider({ children }: Props) {
  const [items, setItems] = useState<ShoppingCart['items']>([])
  const addItem = (item: number) => {
    for (const i in items) {
      if (items[i].id == item) {
        items[i].count += 1
        setItems([...items])
        return
      }
    }
    setItems([...items, { id: item, count: 1 }])
  }

  return <ShoppingCartContext.Provider value={{ items, addItem }}>{children}</ShoppingCartContext.Provider>
}
