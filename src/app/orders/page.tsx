import { createDB } from '../../lib/db'

async function getOrders() {
  const db = createDB()

  const orders = await db.selectFrom('orders').selectAll().execute()

  return orders
}

export default async function Home() {
  const orders = await getOrders()
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <table>
        <tr>
          <th>Order Id</th>
          <th>Count</th>
          <th>Total Price</th>
        </tr>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.count}</td>
            <td>{order.totalPrice}</td>
          </tr>
        ))}
      </table>
    </main>
  )
}
