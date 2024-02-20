'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../lib/db'
import { revalidatePath } from 'next/cache'

type UpdateProductParams = {
  name: string
  description: string
  price: number
}

type IdProp = {
  id: number
}

type CreateProductReviewParams = {
  productId: string
  rating: string
  content: string
  username: string
}

export async function upadateProduct(product: UpdateProductParams, id: IdProp) {
  const db = createDB()

  const updateProduct = await db
    .updateTable('products')
    .set({
      name: product.name,
      description: product.description,
      price: product.price,
    })
    .where('id', '=', id.id)
    .executeTakeFirst()

  // const newProduct = await db
  //   .insertInto('products')
  //   .values({
  //     name: product.name,
  //     description: product.description,
  //     price: product.price,
  //   })
  //   .returningAll()
  //   .executeTakeFirstOrThrow()
  revalidatePath(`/product/${id.id}`)
  revalidatePath(`/`)
  redirect(`/product/${id.id}`)
}
// export async function createProductReview(product: CreateProductParams) {
//   const db = createDB()

//   const newProductReview = await db
//     .insertInto('products')
//     .values({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//     })
//     .returningAll()
//     .executeTakeFirstOrThrow()

//   redirect(`/product/${newProductReview.id}`)
// }
