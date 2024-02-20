'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-stars'
import { updateProductReview } from '../actions/updateProductReview'

type FormData = {
  rating: number
  content: string | null
  username: string | null
  id: number
  onSubmit: () => void
}

export function UpdateProductFormReview(props: FormData) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      rating: props.rating,
      content: props.content,
      username: props.username,
    },
  })

  const ratingChanged = (event: number) => {
    setValue('rating', event)
  }

  const onSubmit = handleSubmit(async (data) => {
    data.id = props.id
    await updateProductReview(data)
    props.onSubmit()
  })

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">
          Rating:
        </label>
        <div>
          <ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} />
        </div>
        {/* <input
          {...register('rating')}
          name="rating"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        /> */}
        <br />
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
          Content:
        </label>
        <input
          {...register('content')}
          name="content"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username:
        </label>
        <input
          {...register('username')}
          name="username"
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
