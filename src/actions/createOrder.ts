'use server'

import { redirect } from 'next/navigation'
import { createDB } from '../lib/db'
import { revalidatePath } from 'next/cache'

type CreateOrderParams = {
  count: number
  totalPrice: number
}

export async function createOrder(order: CreateOrderParams) {
  const db = createDB()

  const newOrder = await db
    .insertInto('orders')
    .values([
      {
        count: order.count,
        totalPrice: order.totalPrice,
      },
    ])
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidatePath(`/orders`)
  redirect(`/orders`)
}
