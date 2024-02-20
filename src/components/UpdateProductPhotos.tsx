'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { upadateProduct } from '../actions/updateProduct'
import { createDB } from '../lib/db'
import ReactStars from 'react-stars'
import { createProductPhoto } from '../actions/createProductPhoto'
import { deleteProductPhoto } from '../actions/deleteProductPhoto'
import { MyButton } from '../app/component_templates/MyButton'

type FormData = {
  url: string
}

type ProductId = {
  productId: number
}

type Props = {
  productId: number
  photos: {
    id: number
    url: string
    productId: number
  }[]
}

// async function getProductPhotos(id: number) {
//   const db = createDB()

//   const photos = await db.selectFrom('productsPhotos').selectAll().where('productId', '=', id).execute()

//   return photos
// }

export function UpdateProductPhotos(props: Props) {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({})
  const onSubmit = handleSubmit(async (data) => {
    console.log(data.url)
    await createProductPhoto(data, { id: props.productId })
    reset({ url: '' })
  })

  return (
    <div className="w-full max-w-xs">
      {props.photos.map((pr) => (
        <div key={pr.id}>
          <img src={pr.url} width={300} height={300} alt="Picture" /> <br />
          <MyButton onClick={() => deleteProductPhoto({ id: pr.id, productId: pr.productId })}>Delete</MyButton>
        </div>
      ))}
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">
          Url:
        </label>
        <input
          {...register('url')}
          name="url"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <div className="flex flex-col items-center justify-center">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            value="Add"
          />
        </div>
      </form>
    </div>
  )
}
