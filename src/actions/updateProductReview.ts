'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../lib/db'
import { revalidatePath } from 'next/cache'

type UpdateProductReviewParams = {
  rating: number
  content: string | null
  username: string | null
  id: number
}

export async function updateProductReview(review: UpdateProductReviewParams) {
  const db = createDB()

  const updateProduct = await db
    .updateTable('productsReviews')
    .set({
      rating: review.rating,
      content: review.content,
      username: review.username,
    })
    .where('id', '=', review.id)
    .execute()

  // const newProduct = await db
  //   .insertInto('products')
  //   .values({
  //     name: product.name,
  //     description: product.description,
  //     price: product.price,
  //   })
  //   .returningAll()
  //   .executeTakeFirstOrThrow()
  revalidatePath(`/product/${review.id}`)
  revalidatePath(`/`)
  // redirect(`/product/${review.id}`)

  // const newProductReview = await db
  //   .insertInto('productsReviews')
  //   .values([
  //     {
  //       productId: product.productId,
  //       rating: product.rating,
  //       content: product.content,
  //       username: product.username,
  //     },
  //   ])
  //   .returningAll()
  //   .executeTakeFirstOrThrow()

  // // redirect(`/product/${newProductReview.productId}`)
  // revalidatePath(`/product/${newProductReview.productId}`)
}
