import Image from 'next/image'
import { ProductList } from '../components/ProductList'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: { page?: string }
}

export default function Home({ searchParams }: Props) {
  const page = parseInt(searchParams.page ? searchParams.page : '1')
  if (isNaN(page)) {
    redirect('/')
  }
  if (page < 1) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Products List:</div>
      <ProductList page={page} />
      {page > 1 ? <Link href={`/?page=${page - 1}`}>Previous</Link> : null}

      <Link href={`/?page=${page + 1}`}>Next</Link>
    </main>
  )
}
