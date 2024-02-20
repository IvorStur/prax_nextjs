import { CreateProductFormReview } from '../../../components/CreateProductFormReview'

type FormProps = {
  params: {
    id: string
  }
}

export default function Home(props: FormProps) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <CreateProductFormReview productId={parseInt(props.params.id)} />
    </main>
  )
}
