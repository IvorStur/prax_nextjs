import Link from 'next/link'
import { ShoppingCartIndicator } from './ShoppingCartIndicator'

export function NavBar() {
  return (
    <div>
      <nav className="nav font-semibold text-lg">
        <ul className="flex items-center">
          <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
            <Link href={`/`}>Home</Link>
          </li>
          <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link href={`/product_new`}>Create new</Link>
          </li>
          <li>
            <ShoppingCartIndicator />
          </li>
        </ul>
      </nav>
    </div>
  )
}
