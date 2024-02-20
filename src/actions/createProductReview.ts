'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../lib/db'
import { revalidatePath } from 'next/cache'

type CreateProductReviewParams = {
  productId: number
  rating: number
  content: string
  username: string
}

export async function createProductReview(product: CreateProductReviewParams) {
  const db = createDB()

  const newProductReview = await db
    .insertInto('productsReviews')
    .values([
      {
        productId: product.productId,
        rating: product.rating,
        content: product.content,
        username: product.username,
      },
    ])
    .returningAll()
    .executeTakeFirstOrThrow()

  // redirect(`/product/${newProductReview.productId}`)
  revalidatePath(`/product/${newProductReview.productId}`)
}
