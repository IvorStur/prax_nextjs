'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { createProductReview } from '../actions/createProductReview'
import ReactStars from 'react-stars'
import { updateProductReview } from '../actions/updateProductReview'
import { useState } from 'react'

type FormData = {
  rating: number
  content: string | null
  username: string | null
  id: number
}

export function ProductReview(props: FormData) {
  return (
    <div>
      <b>Content:</b> {props.content} <br /> <b>Author:</b> {props.username} <br /> <b>Rating:</b> {props.rating} <br />{' '}
    </div>
  )
}
