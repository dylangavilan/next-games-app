import { getImage } from '@/app/constants'
import React from 'react'

type Props = {
    cover: Cover
}

const OptionImage = ({ cover }: Props) => {
  return (
    <img src={getImage('micro', cover.image_id)} alt={`${cover.id} cover`} className='rounded-[4px]'/>
  )
}

export default OptionImage