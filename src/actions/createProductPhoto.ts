'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../lib/db'
import { revalidatePath } from 'next/cache'

type CreateProductPhotoParams = {
  url: string
}

type IdProp = {
  id: number
}

export async function createProductPhoto(product: CreateProductPhotoParams, productId: IdProp) {
  const db = createDB()

  const newProductPhoto = await db
    .insertInto('productsPhotos')
    .values([
      {
        productId: productId.id,
        url: product.url,
      },
    ])
    .returningAll()
    .executeTakeFirstOrThrow()

  // redirect(`/product/${newProductReview.productId}`)
  revalidatePath(`/product/${newProductPhoto.productId}`)
}
