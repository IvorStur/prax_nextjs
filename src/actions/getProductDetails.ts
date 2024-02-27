'use server'

import { createDB } from '../lib/db'

export async function getProducts(ids: number[]) {
  const db = createDB()

  const products = await db
    .selectFrom('products')
    .leftJoin('productsPhotos', 'products.id', 'productsPhotos.productId')
    .groupBy(['products.id', 'products.name', 'products.price'])
    .select(['products.id', 'products.name', 'products.price', 'productsPhotos.url'])
    .where('products.id', 'in', ids)
    .execute()

  return products
}
