'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../lib/db'
import { revalidatePath } from 'next/cache'

type CreateOrderMnParams = {
  order_id: number
  product_id: number
  count: number
  totalPrice: number
}
type CreateOrderParams = {
  product_id: number
  count: number
  totalPrice: number
}

export async function createOrder(order: CreateOrderParams[]) {
  const db = createDB()

  const newOrder = await db
    .insertInto('orders')
    .values([
      {
        count: 0,
        totalPrice: 0,
      },
    ])
    .returningAll()
    .executeTakeFirstOrThrow()

  const orderValues = order.map((ord) => {
    return {
      orderId: newOrder.id,
      productId: ord.product_id,
      count: ord.count,
      totalPrice: ord.totalPrice,
    }
  })

  await db.insertInto('ordersProducts').values(orderValues).execute()

  revalidatePath(`/orders`)
  redirect(`/orders`)
}
