'use server'

import { createDB } from '../lib/db'
import { revalidatePath } from 'next/cache'

type CreateProductPhotoParams = {
  url: string
}

type IdProp = {
  id: number
  productId: number
}

export async function deleteProductPhoto(photo: IdProp) {
  const db = createDB()

  await db.deleteFrom('productsPhotos').where('id', '=', photo.id).execute()

  // redirect(`/product/${newProductReview.productId}`)
  revalidatePath(`/product/${photo.productId}`)
}
