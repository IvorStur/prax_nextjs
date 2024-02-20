import Link from 'next/link'
import { createDB } from '../lib/db'
import Image from 'next/image'
import { CreateProductFormReview } from '../components/CreateProductFormReview'
import { ProductReview } from './ProductReview'
import { EditOrShowReview } from './EditOrShowReview'

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('products').selectAll().where('id', '=', id).executeTakeFirstOrThrow()

  return product
}

async function getProductReviews(id: number) {
  const db = createDB()

  const reviews = await db.selectFrom('productsReviews').selectAll().where('productId', '=', id).execute()

  return reviews
}
async function getProductPhotos(id: number) {
  const db = createDB()

  const photos = await db.selectFrom('productsPhotos').selectAll().where('productId', '=', id).execute()

  return photos
}

type ProductDetailProps = {
  id: number
}

export async function ProductDetail({ id }: ProductDetailProps) {
  const product = await getProductDetail(id)
  const reviews = await getProductReviews(id)
  const photos = await getProductPhotos(id)

  return (
    <div>
      <div>{product.name}</div>
      <div>Description: {product.description}</div>
      <div>Price: {product.price} penazi</div>
      <div>
        {reviews.map((pr) => (
          <>
            <div key={pr.id}>
              <EditOrShowReview key={pr.id} rating={pr.rating} content={pr.content} username={pr.username} id={pr.id} />
              <br />
            </div>
          </>
        ))}
        {/* <div>
          <Link href={`/product_review_new/${product.id}`}>Add Review</Link>
        </div> */}
        <div>
          <CreateProductFormReview productId={product.id} />
        </div>
        {photos.map((pr) => (
          <div key={pr.id}>
            <img src={pr.url} width={300} height={300} alt="Picture" /> <br />
          </div>
        ))}
      </div>
    </div>
  )
}
