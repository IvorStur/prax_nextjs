import { createDB } from '../../../lib/db'

async function getOrders(id: number) {
  const db = createDB()

  const orders = await db.selectFrom('ordersProducts').selectAll().where('orderId', '=', id).execute()

  return orders
}

type Props = {
  params: {
    id: number
  }
}

export default async function Home(props: Props) {
  const orders = await getOrders(props.params.id)
  const price = orders.reduce((acc, i) => acc + i.totalPrice, 0)
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <td>Product Id</td>
              <td>Count</td>
              <td>Total Price</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.productId}</td>
                <td>{order.count}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Grand total: {price} penazi.</span>
        </div>
      </div>
    </main>
  )
}
