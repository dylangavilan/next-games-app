import { getCover } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    cover: Cover
}

const OptionImage = ({ cover }: Props) => {
  return (
    <div className='relative w-10 h-10'>
      <Image src={getCover('micro', cover.image_id)} alt={`${cover.id} cover`} className='rounded-[4px]' fill />
    </div>
  )
}

export default OptionImage