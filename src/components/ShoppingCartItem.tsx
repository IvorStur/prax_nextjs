type Props = {
  id: number
  count: number
}
export function ShoppingCartItem(props: Props) {
  return (
    <div>
      <h2>Id: {props.id}</h2>

      <p>Count: {props.count}</p>
    </div>
  )
}
