'use client'

import { useContext } from 'react'
import { MyButton } from '../app/component_templates/MyButton'
import { ShoppingCartContext } from './ShoppingCartContext'

type Props = {
  id: number
}
export function AddToCartButton(props: Props) {
  const { addItem } = useContext(ShoppingCartContext)

  return (
    <MyButton
      className="btn btn-outline btn-xs"
      onClick={() => {
        // console.log('Add to cart:', props.id)
        addItem(props.id)
      }}
    >
      Add to Cart
    </MyButton>
  )
}
