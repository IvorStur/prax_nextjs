import { redirect } from 'next/dist/server/api-utils'
import { createDB } from '../../lib/db'
import { MyButton } from '../component_templates/MyButton'
import Link from 'next/link'

async function getOrders() {
  const db = createDB()

  const orders = await db.selectFrom('orders').selectAll().execute()

  return orders
}

export default async function Home() {
  const orders = await getOrders()
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <td>Order Id</td>
              <td>Count</td>
              <td>Total Price</td>
              <td>asdas</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.count}</td>
                <td>{order.totalPrice}</td>
                <td>
                  <Link href={`order/${order.id}`}>View Order</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
