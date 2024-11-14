import { getCover } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    cover: Cover
}

const OptionImage = ({ cover }: Props) => {
  return (
    <Image src={getCover('micro', cover.image_id)} alt={`${cover.id} cover`} className='rounded-[4px]'/>
  )
}

export default OptionImage