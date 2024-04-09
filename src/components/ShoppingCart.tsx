'use client'
import { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from './ShoppingCartContext'
import { ShoppingCartItem } from './ShoppingCartItem'
import { getProducts } from '../actions/getProductDetails'
import Link from 'next/link'
import { AddToCartButton } from './AddToCartButton'
import { count } from 'console'
import { MyButton } from '../app/component_templates/MyButton'
// import { Product } from './ProductList'

type productdetails = {
  id: number
  name: string
  price: number
  url: string | null
}[]

type ProductProps = {
  id: number
  name: string
  url: string | null
  count: number | undefined
}

function Product(props: ProductProps) {
  const { addItem } = useContext(ShoppingCartContext)
  const { removeItem } = useContext(ShoppingCartContext)
  const { deleteItem } = useContext(ShoppingCartContext)
  // const { name, description } = props
  const name = props.name
  const url = props.url

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="text-lg font-semibold">{name}</div>
      {/* <div>{description}</div> */}
      <div>
        <img src={url ? url : '#'} alt="" />
      </div>
      <Link href={`/product/${props.id}`}>Details</Link>
      <br />
      <div>Count: {props.count}</div>
      <br />
      <MyButton
        onClick={() => {
          // console.log('Add to cart:', props.id)
          addItem(props.id)
        }}
      >
        +
      </MyButton>
      <MyButton
        onClick={() => {
          removeItem(props.id)
        }}
      >
        -
      </MyButton>
      <MyButton
        onClick={() => {
          deleteItem(props.id)
        }}
      >
        Delete
      </MyButton>
    </div>
  )
}

export function ShoppingCart() {
  const { items } = useContext(ShoppingCartContext)
  const [products, setProducts] = useState<productdetails>([])

  useEffect(() => {
    async function fetchData() {
      // let ids: number[] = []
      const productIds = items.map((item) => {
        return item.id
      })
      setProducts(await getProducts(productIds))
    }
    fetchData()
  }, [items])

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((item) => (
        // eslint-disable-next-line react/jsx-key
        // <ShoppingCartItem id={item.id} count={item.count} />
        <Product
          key={item.id}
          id={item.id}
          name={item.name}
          url={item.url}
          count={items.find((i) => i.id == item.id)?.count}
        />
      ))}
      {/* <div>{ids}</div> */}
    </div>
  )
}
