'use client'

import { useState } from 'react'
import { ProductReview } from './ProductReview'
import { UpdateProductFormReview } from './UpdateProductFormReview'
import { MyButton } from '../app/component_templates/MyButton'

type FormData = {
  rating: number
  content: string | null
  username: string | null
  id: number
}
export function EditOrShowReview(props: FormData) {
  const [openEdit, setOpenEdit] = useState(false)

  if (!openEdit) {
    return (
      <div>
        <ProductReview
          key={props.id}
          rating={props.rating}
          content={props.content}
          username={props.username}
          id={props.id}
        />
        <MyButton onClick={() => setOpenEdit(!openEdit)}> {openEdit ? 'Cancel' : 'Edit'}</MyButton>
      </div>
    )
  } else {
    return (
      <div>
        <UpdateProductFormReview
          key={props.id}
          rating={props.rating}
          content={props.content}
          username={props.username}
          id={props.id}
          onSubmit={() => {
            setOpenEdit(false)
          }}
        />
        <MyButton onClick={() => setOpenEdit(!openEdit)}> {openEdit ? 'Cancel' : 'Edit'}</MyButton>
      </div>
    )
  }
}
