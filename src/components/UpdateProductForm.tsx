'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { upadateProduct } from '../actions/updateProduct'

type FormData = {
  name: string
  description: string
  price: number
}

type props = {
  product: {
    id: number
    name: string
    description: string
    price: number
  }
}

export async function UpdateProductForm(product: props) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: product.product })
  const onSubmit = handleSubmit(async (data) => {
    console.log(data.name)
    await upadateProduct(data, { id: product.product.id })
  })

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          {...register('name')}
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <input
          {...register('description')}
          name="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
          Price:
        </label>
        <input
          {...register('price')}
          name="price"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <div className="flex flex-col items-center justify-center">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            value="Update"
          />
        </div>
      </form>
    </div>
  )
}
