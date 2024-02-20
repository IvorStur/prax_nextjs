import { UpdateProductForm } from '../../../components/UpdateProductForm'
import { UpdateProductPhotos } from '../../../components/UpdateProductPhotos'
import { createDB } from '../../../lib/db'

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('products').selectAll().where('id', '=', id).executeTakeFirstOrThrow()

  return product
}

async function getProductPhotos(id: number) {
  const db = createDB()

  const photos = await db.selectFrom('productsPhotos').selectAll().where('productId', '=', id).execute()

  return photos
}

type FormProps = {
  params: {
    id: string
  }
}

export default async function Home(props: FormProps) {
  const product = await getProductDetail(parseInt(props.params.id))
  const photos = await getProductPhotos(parseInt(props.params.id))
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <UpdateProductForm product={product} />
      <UpdateProductPhotos photos={photos} productId={parseInt(props.params.id)}></UpdateProductPhotos>
    </main>
  )
}
