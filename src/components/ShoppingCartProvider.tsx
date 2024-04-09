'use client'

import { useState, useEffect } from 'react'
import { ShoppingCartContext, ShoppingCart } from './ShoppingCartContext'

type Props = {
  children: any
}

export function ShoppingCartProvider({ children }: Props) {
  const [items, setItems] = useState<ShoppingCart['items']>(() => {
    // getting stored value
    const saved = localStorage.getItem('items')
    const initialValue = JSON.parse(saved || '[]')
    return initialValue || []
  })

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

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
  const removeItem = (item: number) => {
    for (const i in items) {
      if (items[i].id == item) {
        items[i].count -= 1
        if (items[i].count <= 0) {
          deleteItem(item)
          return
        }
        setItems([...items])
        return
      }
    }
    setItems([...items, { id: item, count: 1 }])
  }
  const deleteItem = (item: number) => {
    for (const i in items) {
      if (items[i].id == item) {
        items.splice(parseInt(i), 1)
        setItems([...items])
        return
      }
    }
    setItems([...items, { id: item, count: 1 }])
  }

  return (
    <ShoppingCartContext.Provider value={{ items, addItem, removeItem, deleteItem }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
