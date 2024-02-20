import { createDB } from '../lib/db'
import Link from 'next/link'
import { AddToCartButton } from './AddToCartButton'

async function getProducts(page: number) {
  const db = createDB()

  const products = await db
    .selectFrom('products')
    .leftJoin('productsPhotos', 'products.id', 'productsPhotos.productId')
    .groupBy(['products.id', 'products.name', 'products.price'])
    .select(['products.id', 'products.name', 'products.price', 'productsPhotos.url'])
    .limit(9)
    .offset(9 * page)
    .execute()

  return products
}

type ProductProps = {
  id: number
  name: string
  url: string | null
}

type Props = {
  page: number
}

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('products').selectAll().where('id', '=', id).executeTakeFirstOrThrow()

  return product
}

// function Product({ name, description }: { name: string; description: string }) {
function Product(props: ProductProps) {
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
      <Link href={`/product_edit/${props.id}`}>Edit</Link>
      <br />
      <AddToCartButton id={props.id} />
    </div>
  )
}

export async function ProductList({ page }: Props) {
  const products = await getProducts(page)

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <Product key={p.id} id={p.id} name={p.name} url={p.url} />
      ))}
    </div>
  )
}
